import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Video, VideoType } from '../video.entity';
import { Casting } from '../interfaces/casting.interface';
import { Director } from '../interfaces/director.interface';
import { VideoProvider } from '../interfaces/provider.interface';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { SerieDetails } from '../interfaces/serie-details.interface';
import { ProductionCompany } from '../interfaces/production-company.interface';
import { Season } from '../interfaces/season.interface';
import { PageQuery } from 'src/pagination/page-query';

@Injectable()
export class TmdbRepositoryRepository {
  constructor(private readonly httpService: HttpService) {}

  private readonly apiKey = process.env.TMDB_API_KEY;

  private mapFromVideoTypeToType(type: VideoType): string {
    switch (type) {
      case VideoType.Movie:
        return VideoType.Movie;
      case VideoType.Serie:
        return 'tv';
      default:
        throw new Error('Invalid video type');
    }
  }

  async getCasting(id: number, type: VideoType): Promise<Casting[]> {
    const url = `https://api.themoviedb.org/3/${this.mapFromVideoTypeToType(type)}/${id}/credits?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(this.httpService.get(url));
    return this.mapFromTmdbCastingsResponseToCastings(response.data.cast);
  }

  async getDirector(id: number, type: VideoType): Promise<Director> {
    if (type === VideoType.Serie) {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=fr-FR`;
      const response = await firstValueFrom(this.httpService.get(url));
      const creator = response.data.created_by?.[0];
      return this.mapFromTmdbCreatorResponseToDirector(creator);
    } else {
      const url = `https://api.themoviedb.org/3/${this.mapFromVideoTypeToType(type)}/${id}/credits?api_key=${this.apiKey}&language=fr-FR`;
      const response = await firstValueFrom(this.httpService.get(url));
      const crew = response.data.crew;
      const director = crew.find((member) => member.job === 'Director');
      return this.mapFromTmdbDirectorResponseToDirector(director);
    }
  }

  async getProviders(id: number, type: VideoType): Promise<VideoProvider[]> {
    const url = `https://api.themoviedb.org/3/${this.mapFromVideoTypeToType(type)}/${id}/watch/providers?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data.results.FR?.flatrate
      ? this.mapFromTmdbProviderResponseToVideoProviders(
          response.data.results.FR?.flatrate.filter(
            (provider) => provider.display_priority <= 20,
          ),
        )
      : [];
  }

  async getSimilar(id: number, type: VideoType): Promise<Video[]> {
    // 1. Récupère le film original pour extraire ses genres
    const movie = await firstValueFrom(
      this.httpService.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=fr-FR`,
      ),
    );
    const genreIds = movie.data.genres.map((g: any) => g.id).join(',');

    // 2. Charger plusieurs pages Discover
    const pagesToFetch = [1, 2, 3]; // => 100 résultats
    const requests = pagesToFetch.map((page) =>
      this.httpService.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=fr-FR&with_genres=${genreIds}&sort_by=popularity.desc&primary_release_date.gte=2000-01-01&page=${page}`,
      ),
    );

    const [responses, genres] = await Promise.all([
      Promise.all(requests.map((r) => firstValueFrom(r))),
      this.getGenres(true),
    ]);

    // 3. Fusionner toutes les pages
    let results = responses.flatMap((res) => res.data.results);

    // 4. Supprimer les doublons (même id)
    results = results.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id),
    );

    return this.mapFromTmdbResponseToVideo(results, genres, type);
  }

  async getMovies(
    pageQuery: PageQuery | null = null,
    search: string | null = null,
  ): Promise<Video[]> {
    const genres = await this.getGenres(true);
    let movies: TmdbDataResultResponse[];
    if (!search || search === '') {
      const safePageQuery =
        pageQuery ??
        PageQuery.of(PageQuery.DEFAULT_PAGE, PageQuery.DEFAULT_LIMIT);
      movies = await this.getMoviesNowPlaying(safePageQuery);
    } else {
      movies = await this.getMoviesWithSearch(search);
    }
    movies = movies.sort((a, b) => b.popularity - a.popularity);
    return this.mapFromTmdbResponseToVideo(movies, genres, VideoType.Movie);
  }

  async getMovie(id: number): Promise<Video> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=fr-FR`;

    const response = await firstValueFrom(this.httpService.get(url));
    return this.mapFromTmdbMovieDetailsResponseToVideo(
      response.data,
      VideoType.Movie,
    );
  }

  async getTrailer(id: number, type: VideoType): Promise<string | null> {
    const typeString = this.mapFromVideoTypeToType(type);
    const url = `https://api.themoviedb.org/3/${typeString}/${id}/videos?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(
      this.httpService.get<TmdbVideosResponse>(url),
    );
    const trailer = response.data.results.find(
      (item) => item.type === 'Trailer' && item.site === 'YouTube',
    );
    return trailer?.key ? `https://www.youtube.com/embed/${trailer.key}` : null;
  }

  async getSeasons(id: number): Promise<Season[]> {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(this.httpService.get(url));

    // Récupérer les détails de chaque saison avec les épisodes (en excluant la saison 0)
    const seasonsWithEpisodes = await Promise.all(
      response.data.seasons
        .filter((season: any) => season.season_number !== 0)
        .map(async (season: any) => {
          const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${this.apiKey}&language=fr-FR`;
          const seasonResponse = await firstValueFrom(
            this.httpService.get(seasonUrl),
          );
          return this.mapFromTmdbSeasonDetailsResponseToSeason(
            seasonResponse.data,
          );
        }),
    );
    return seasonsWithEpisodes.filter((season) => season !== null);
  }

  private async getMoviesNowPlaying(
    pageQuery: PageQuery,
  ): Promise<TmdbDataResultResponse[]> {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=fr-FR&page=${pageQuery.page}`;
    const response = await firstValueFrom(
      this.httpService.get<TmdbDataResponse>(url),
    );
    return response.data.results;
  }

  private async getMoviesWithSearch(
    search: string,
  ): Promise<TmdbDataResultResponse[]> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`;

    const response = await firstValueFrom(
      this.httpService.get<TmdbDataResponse>(url),
    );

    return response.data.results.sort((a, b) => b.popularity - a.popularity);
  }

  async getSeries(
    pageQuery: PageQuery | null = null,
    search: string | null = null,
  ): Promise<Video[]> {
    const genres = await this.getGenres(false);
    let series: TmdbDataResultResponse[];
    if (!search || search === '') {
      const safePageQuery =
        pageQuery ??
        PageQuery.of(PageQuery.DEFAULT_PAGE, PageQuery.DEFAULT_LIMIT);
      series = await this.getSeriesNowPlaying(safePageQuery);
    } else {
      series = await this.getSeriesWithSearch(search);
    }
    series = series.sort((a, b) => b.popularity - a.popularity);
    return this.mapFromTmdbResponseToVideo(series, genres, VideoType.Serie);
  }

  async getSerie(id: number): Promise<Video> {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=fr-FR`;

    const response = await firstValueFrom(this.httpService.get(url));
    return this.mapFromTmdbSerieDetailsResponseToVideo(
      response.data,
      VideoType.Serie,
    );
  }

  private async getSeriesNowPlaying(pageQuery: PageQuery) {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.apiKey}&language=fr-FR&page=${pageQuery.page}`;
    const response = await firstValueFrom(
      this.httpService.get<TmdbDataResponse>(url),
    );
    return response.data.results;
  }

  private async getSeriesWithSearch(search: string) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`;
    const response = await firstValueFrom(
      this.httpService.get<TmdbDataResponse>(url),
    );
    return response.data.results;
  }

  private mapFromTmdbDataResultResponseToVideo(
    tmdbDataResponse: TmdbDataResultResponse,
    genres: TmdbGenre[],
    type: VideoType,
  ): Video {
    return new Video({
      externalId: tmdbDataResponse.id.toString(),
      title:
        type === VideoType.Movie
          ? tmdbDataResponse.title
          : tmdbDataResponse.name,
      releaseDate:
        type === VideoType.Movie
          ? new Date(tmdbDataResponse.release_date)
          : new Date(tmdbDataResponse.first_air_date),
      description: tmdbDataResponse.overview,
      fileUrl: tmdbDataResponse.poster_path
        ? `https://image.tmdb.org/t/p/w400${tmdbDataResponse.poster_path}`
        : undefined,
      backdropUrl: tmdbDataResponse.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${tmdbDataResponse.backdrop_path}`
        : undefined,
      globalRating: tmdbDataResponse.vote_average,
      type: type,
      genres: this.getGenreName(tmdbDataResponse.genre_ids, genres)
        ? this.getGenreName(tmdbDataResponse.genre_ids, genres)!
        : [],
    });
  }

  private mapFromTmdbResponseToVideo(
    tmdbResponse: TmdbDataResultResponse[],
    tmdbGenre: TmdbGenre[],
    type: VideoType,
  ): Video[] {
    return tmdbResponse.map((tmdbDataResponse) =>
      this.mapFromTmdbDataResultResponseToVideo(
        tmdbDataResponse,
        tmdbGenre,
        type,
      ),
    );
  }

  private mapFromTmdbCastingsResponseToCastings(
    castings: TmdbCastingResponse[],
  ): Casting[] {
    return castings.map((casting) => {
      return {
        id: casting.id,
        name: casting.name,
        popularity: casting.popularity,
        character: casting.character,
        order: casting.order,
        fileUrl: casting.profile_path
          ? `https://image.tmdb.org/t/p/w300${casting.profile_path}`
          : null,
      };
    });
  }

  private async getGenres(isMovie: boolean): Promise<TmdbGenre[]> {
    const type = isMovie ? VideoType.Movie : 'tv';
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(
      this.httpService.get<TmdbGenreResponse>(url),
    );
    return response.data.genres;
  }

  private getGenreName(ids: number[], tmdbGenre: TmdbGenre[]): string[] | null {
    if (!ids || ids.length === 0) return [];
    const genre = tmdbGenre.find((g) => ids.includes(g.id));
    return genre ? [genre.name] : [];
  }

  private mapFromTmdbMovieDetailsResponseToVideo(
    tmdbMovieDetailsResponse: TmdbMovieDetailsResponse,
    type: VideoType,
  ): Video {
    return new Video({
      externalId: tmdbMovieDetailsResponse.id.toString(),
      title: tmdbMovieDetailsResponse.title,
      releaseDate: new Date(tmdbMovieDetailsResponse.release_date),
      description: tmdbMovieDetailsResponse.overview,
      fileUrl: tmdbMovieDetailsResponse.poster_path
        ? `https://image.tmdb.org/t/p/w300${tmdbMovieDetailsResponse.poster_path}`
        : undefined,
      backdropUrl: tmdbMovieDetailsResponse.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${tmdbMovieDetailsResponse.backdrop_path}`
        : undefined,
      type: type,
      genres: tmdbMovieDetailsResponse.genres.map((g) => g.name),
      globalRating: tmdbMovieDetailsResponse.vote_average,
      productionCompanies:
        this.mapFromTmdbProductionCompanyResponseToProductionCompanies(
          tmdbMovieDetailsResponse.production_companies,
        ),
      movieDetails:
        type === VideoType.Movie
          ? this.mapFromTmdbMovieDetailsResponseToMovieDetails(
              tmdbMovieDetailsResponse,
            )
          : null,
    });
  }

  private mapFromTmdbSerieDetailsResponseToVideo(
    tmdbSerieDetailsResponse: TmdbSerieDetailsResponse,
    type: VideoType,
  ): Video {
    return new Video({
      externalId: tmdbSerieDetailsResponse.id.toString(),
      title: tmdbSerieDetailsResponse.name,
      releaseDate: new Date(tmdbSerieDetailsResponse.first_air_date),
      description: tmdbSerieDetailsResponse.overview,
      fileUrl: tmdbSerieDetailsResponse.poster_path
        ? `https://image.tmdb.org/t/p/w300${tmdbSerieDetailsResponse.poster_path}`
        : undefined,
      type: type,
      globalRating: tmdbSerieDetailsResponse.vote_average,
      genres: tmdbSerieDetailsResponse.genres.map((g) => g.name),
      productionCompanies:
        this.mapFromTmdbProductionCompanyResponseToProductionCompanies(
          tmdbSerieDetailsResponse.production_companies,
        ),
      serieDetails:
        type === VideoType.Serie
          ? this.mapFromTmdbMovieDetailsResponseToSerieDetails(
              tmdbSerieDetailsResponse,
            )
          : null,
    });
  }

  private mapFromTmdbMovieDetailsResponseToMovieDetails(
    tmdbMovieDetailsResponse: TmdbMovieDetailsResponse,
  ): MovieDetails {
    return {
      duration: tmdbMovieDetailsResponse.runtime,
      originalTitle: tmdbMovieDetailsResponse.original_title,
      tagline: tmdbMovieDetailsResponse.tagline,
      budget: tmdbMovieDetailsResponse.budget,
      revenue: tmdbMovieDetailsResponse.revenue,
      originalLanguage: tmdbMovieDetailsResponse.original_language,
    };
  }

  private mapFromTmdbMovieDetailsResponseToSerieDetails(
    tmdbSerieDetailsResponse: TmdbSerieDetailsResponse,
  ): SerieDetails {
    return {
      numberOfSeasons: tmdbSerieDetailsResponse.number_of_seasons,
      numberOfEpisodes: tmdbSerieDetailsResponse.number_of_episodes,
      originalLanguage: tmdbSerieDetailsResponse.original_language,
      tagline: tmdbSerieDetailsResponse.tagline,
      seasons: tmdbSerieDetailsResponse.seasons.map((season) => ({
        seasonNumber: season.season_number,
        episodes: [],
        airDate: new Date(season.air_date),
        overview: season.overview,
        fileUrl: season.poster_path
          ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
          : null,
      })),
    };
  }

  private mapFromTmdbDirectorResponseToDirector(
    tmdbDirectorResponse: TmdbDirectorResponse,
  ): Director {
    if (!tmdbDirectorResponse) {
      return {
        id: 0,
        name: 'Unknown',
        fileUrl: null,
      };
    }
    return {
      id: tmdbDirectorResponse.id,
      name: tmdbDirectorResponse.name,
      fileUrl: tmdbDirectorResponse.profile_path
        ? `https://image.tmdb.org/t/p/w300${tmdbDirectorResponse.profile_path}`
        : null,
    };
  }

  private mapFromTmdbCreatorResponseToDirector(tmdbCreatorResponse: {
    id: number;
    name: string;
    profile_path: string | null;
  }): Director {
    if (!tmdbCreatorResponse) {
      return {
        id: 0,
        name: 'Unknown',
        fileUrl: null,
      };
    }
    return {
      id: tmdbCreatorResponse.id,
      name: tmdbCreatorResponse.name,
      fileUrl: tmdbCreatorResponse.profile_path
        ? `https://image.tmdb.org/t/p/w300${tmdbCreatorResponse.profile_path}`
        : null,
    };
  }

  private mapFromTmdbProviderResponseToVideoProvider(
    tmdbProviderResponse: TmdbProviderResponse,
  ): VideoProvider {
    return {
      id: tmdbProviderResponse.provider_id,
      fileUrl: tmdbProviderResponse.logo_path
        ? `https://image.tmdb.org/t/p/w300${tmdbProviderResponse.logo_path}`
        : null,
      name: tmdbProviderResponse.provider_name,
    };
  }

  private mapFromTmdbProviderResponseToVideoProviders(
    tmdbProviderResponse: TmdbProviderResponse[],
  ): VideoProvider[] {
    return tmdbProviderResponse.map((provider) =>
      this.mapFromTmdbProviderResponseToVideoProvider(provider),
    );
  }

  private mapFromTmdbProductionCompanyResponseToProductionCompanies(
    tmdbProductionCompanyResponse: TmdbProductionCompanyResponse[],
  ): ProductionCompany[] {
    return tmdbProductionCompanyResponse.map((company) => ({
      id: company.id,
      fileUrl: company.logo_path
        ? `https://image.tmdb.org/t/p/w300${company.logo_path}`
        : null,
      name: company.name,
      originCountry: company.origin_country,
    }));
  }

  private mapFromTmdbSeasonDetailsResponseToSeason(
    tmdbSeasonDetailsResponse: TmdbSeasonDetailsResponse,
  ): Season {
    return {
      seasonNumber: tmdbSeasonDetailsResponse.season_number,
      airDate: tmdbSeasonDetailsResponse.air_date
        ? new Date(tmdbSeasonDetailsResponse.air_date)
        : null,
      overview: tmdbSeasonDetailsResponse.overview,
      episodes: tmdbSeasonDetailsResponse.episodes.map((episode) => ({
        id: episode.id,
        number: episode.episode_number,
        name: episode.name,
        overview: episode.overview,
        release: new Date(episode.air_date),
        duration: episode.runtime,
        seasonNumber: episode.season_number,
        path: episode.still_path
          ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
          : null,
        globalRating: episode.vote_average,
      })),
    };
  }
}

export interface TmdbDataResponse {
  dates: { maximum: string; minimum: string };
  page: number;
  results: TmdbDataResultResponse[];
  total_pages: number;
  total_results: number;
}

export interface TmdbDataResultResponse {
  name: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

export interface TmdbGenreResponse {
  genres: TmdbGenre[];
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbCastingResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TmdbDirectorResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface TmdbProviderResponse {
  logo_path: string;
  provider_id: 8;
  provider_name: string;
  display_priority: number;
}

export interface TmdbEpisodeResponse {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TmdbMovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TmdbSerieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TmdbProductionCompanyResponse {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TmdbVideosResponse {
  id: number;
  results: TmdbTrailerResponse[];
}

export interface TmdbTrailerResponse {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface TmdbSeasonDetailsResponse {
  _id: string;
  air_date: string;
  episodes: [
    {
      air_date: string;
      episode_number: number;
      episode_type: string;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string | null;
      vote_average: number;
      vote_count: number;
      crew: any[];
      guest_stars: any[];
    },
  ];
  name: string;
  networks: [
    {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    },
  ];
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

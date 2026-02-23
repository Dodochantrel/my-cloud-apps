export const navigationItems: NavigationItem[] = [
  {
    name: 'Films',
    icon: 'tv_displays',
    path: null,
    isOpen: false,
    subNavigationItems: [
      {
        name: 'Films',
        icon: 'tv_gen',
        path: 'movies/list',
      },
      {
        name: 'Series',
        icon: 'playlist_play',
        path: 'series/list',
      }
    ],
  },
];

export interface NavigationItem {
  name: string;
  icon: string;
  path: string | null;
  isOpen?: boolean;
  subNavigationItems?: SubNavigationItem[];
}

interface SubNavigationItem {
  name: string;
  icon: string;
  path: string;
}

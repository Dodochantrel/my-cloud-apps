export const navigationItems: NavigationItem[] = [
  {
    name: 'Films',
    icon: 'tv',
    path: null,
    isOpen: false,
    subNavigationItems: [
      {
        name: 'Films',
        icon: 'movie',
        path: 'videos/movies',
      },
      {
        name: 'Series',
        icon: 'burst_mode',
        path: 'videos/series',
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

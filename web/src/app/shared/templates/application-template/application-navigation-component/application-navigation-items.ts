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
        path: 'videos/list?type=movie',
      },
      {
        name: 'Series',
        icon: 'playlist_play',
        path: 'videos/list?type=serie',
      }
    ],
  },
  {
    name: 'Événements',
    icon: 'event',
    path: 'events/list',
    isOpen: false,
    subNavigationItems: undefined,
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

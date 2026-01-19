export const navigationItems: NavigationItem[] = [
  {
    name: 'Films',
    icon: 'tv',
    path: null,
    isOpen: false,
    subNavigationItems: [
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

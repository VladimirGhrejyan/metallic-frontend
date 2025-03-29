import { INavItem } from './nav-items.type';

export const navItems: INavItem[] = [
    // {
    //     name: 'Home',
    //     to: '/',
    //     icon: null,
    // }, // Temporary solution to restrict access to **HOME (/) ** page
    {
        name: 'Products',
        to: '/admin/products',
        icon: null,
    },
    {
        name: 'Products Category',
        to: '/admin/products-category',
        icon: null,
    },
];

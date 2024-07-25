import type { AppRoute } from '@genesislcap/foundation-shell/app';

/**
 * Main route
 * @public
 */
export const main: AppRoute = {
    title: '{{appName}}',
    path: '{{appName}}',
    name: '{{appName}}',
    element: async () => (await import('@genesislcap/pbc-{{appName}}-ui')).Main,
    // @ts-ignore
    elementTag: 'foundation-{{appName}}',
    settings: { autoAuth: true, maxRows: 500 },
    navItems: [
        {
            navId: 'header',
            title: '{{appName}}',
            placementIndex: 35,
        },
    ],
};

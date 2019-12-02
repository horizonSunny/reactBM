const route = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/businessAdm/enterprise',
          },
          {
            path: '/businessAdm',
            name: '企业管理',
            icon: 'dashboard',
            routes: [
              {
                path: '/businessAdm/enterprise',
                name: '入驻企业',
                component: './Welcome',
              },
              {
                path: '/businessAdm/enterprise/123',
                name: '企业管理231',
                component: './WelcomeTwo',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  {
    component: './404',
  },
];
export default route;

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
            redirect: '/businessAdm/enter',
          },
          {
            path: '/businessAdm',
            name: '供应商管理',
            icon: 'home',
            routes: [
              {
                path: '/businessAdm/enter',
                name: '商户管理',
                component: './businessAdm/businessEnter',
              },
              {
                path: '/businessAdm/enter/particulars',
                name: '查看详情',
                component: './businessAdm/particulars',
                hideInMenu: true,
              },
              {
                path: '/businessAdm/enter/edit',
                name: '编辑资料',
                component: './businessAdm/businessEdit',
                hideInMenu: true,
              },
              // 2.0 医生模块和医疗机构模块
              {
                path: '/businessAdm/doctor',
                name: '医生管理',
                component: './businessAdm/doctorAdm',
              },
              {
                path: '/businessAdm/doctor/particulars',
                name: '医生资料详情',
                component: './businessAdm/doctorDetails',
                hideInMenu: true,
              },
              {
                path: '/businessAdm/organization',
                name: '医疗机构管理',
                component: './businessAdm/hospitalAdm',
              },
              {
                path: '/businessAdm/organization/particulars',
                name: '详情',
                component: './businessAdm/hospitalDetails',
                hideInMenu: true,
              },
              {
                path: '/businessAdm/organization/edit',
                name: '编辑资料',
                component: './businessAdm/hospitalEdit',
                hideInMenu: true,
              },
              // {
              //   path: 'examine',
              //   name: '入驻审核',
              //   component: './commodity/commodityAdm/CommodityAdm.tsx',
              // },
            ],
          },
          {
            path: '/commodityAdm',
            name: '商品管理',
            icon: 'shop',
            routes: [
              {
                path: '/commodityAdm/management',
                name: '商品列表',
                component: './commodity/commodityAdm/CommodityAdm.tsx',
              },
              {
                path: '/commodityAdm/classification',
                name: '商品分类',
                component: './commodity/commodityClassify/commodityCas.tsx',
              },
              {
                path: 'management/particulars',
                name: '查看详情',
                component: './commodity/commodityAdm/CommodityDet.tsx',
                hideInMenu: true,
              },
              {
                path: '/commodityAdm/management/edit',
                name: '新建产品',
                component: './commodity/commodityAdm/CommodityEdit.tsx',
                hideInMenu: true,
              },
            ],
          },
          // 运营工具模块
          {
            path: '/operTool',
            name: '运营工具',
            icon: 'tool',
            routes: [
              {
                path: '/operTool/findCommodity',
                name: '快速找药',
                component: './operTool/findCommodity/findList.tsx',
              },
              {
                path: '/operTool/contentEdit',
                name: '内容编辑',
                component: './operTool/contentEdit/index.tsx',
              },
              {
                path: '/operTool/findCommodity/newCategory',
                name: '添加分类',
                component: './operTool/findCommodity/findItem.tsx',
                hideInMenu: true,
              },
            ],
          },
          // 订单管理模块
          {
            path: '/orderMagt',
            name: '订单管理',
            icon: 'tool',
            routes: [
              {
                path: '/orderMagt/inquiry',
                name: '问诊单管理',
                component: './orderMagt/inquiry/inquiryAdm.tsx',
              },
              {
                path: '/orderMagt/inquiry/inquiryDetail',
                name: '问诊单详情',
                component: './orderMagt/inquiry/inquiryDetail.tsx',
                hideInMenu: true,
              },
            ],
          },
          // 用户
          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          // },
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

import React from 'react'
import Loadable from 'react-loadable'
import Loader from 'components/LayoutComponents/Loader'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

export const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
    layout: 'login'
  },
  {
    path: '/user/register',
    component: loadable(() => import('pages/user/register')),
    exact: true,
    layout: 'login'
  },
  {
    path: '/user/confirm',
    component: loadable(() => import('pages/user/confirm')),
    exact: true,
    layout: 'login'
  },
  {
    path: '/user/password/forgot',
    component: loadable(() => import('pages/user/password/forgot')),
    exact: true,
    layout: 'login'
  },
  {
    path: '/user/password/reset',
    component: loadable(() => import('pages/user/password/reset')),
    exact: true,
    layout: 'login'
  },

  // article
  {
    path: '/article/edit',
    component: loadable(() => import('pages/article/editor')),
    exact: true,
    layout: 'public'
  },

  // home
  {
    path: '/home',
    component: loadable(() => import('pages/home/default')),
    exact: true,
    layout: 'main'
  },

  // author
  {
    path: '/author/profile',
    component: loadable(() => import('pages/author/profile')),
    exact: true,
    layout: 'main'
  },

  // Dashboards
  {
    path: '/dashboard/alpha',
    component: loadable(() => import('pages/dashboard/alpha')),
  },
  {
    path: '/dashboard/beta',
    component: loadable(() => import('pages/dashboard/beta')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    component: loadable(() => import('pages/dashboard/crypto')),
    exact: true,
  },
  {
    path: '/dashboard/gamma',
    component: loadable(() => import('pages/dashboard/gamma')),
    exact: true,
  },
  {
    path: '/dashboard/docs',
    component: loadable(() => import('pages/dashboard/docs')),
    exact: true,
  },

  // Main Pages
  {
    path: '/pages/login-alpha',
    component: loadable(() => import('pages/pages/login-alpha')),
    exact: true,
  },
  {
    path: '/pages/login-beta',
    component: loadable(() => import('pages/pages/login-beta')),
    exact: true,
  },
  {
    path: '/pages/register',
    component: loadable(() => import('pages/pages/register')),
    exact: true,
  },
  {
    path: '/pages/lockscreen',
    component: loadable(() => import('pages/pages/lockscreen')),
    exact: true,
  },
  {
    path: '/pages/pricing-table',
    component: loadable(() => import('pages/pages/pricing-table')),
    exact: true,
  },
  {
    path: '/pages/invoice',
    component: loadable(() => import('pages/pages/invoice')),
    exact: true,
  },

  // Apps
  {
    path: '/apps/messaging',
    component: loadable(() => import('pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/mail',
    component: loadable(() => import('pages/apps/mail')),
    exact: true,
  },
  {
    path: '/apps/profile',
    component: loadable(() => import('pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    component: loadable(() => import('pages/apps/gallery')),
    exact: true,
  },

  // Ecommerce
  {
    path: '/ecommerce/dashboard',
    component: loadable(() => import('pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/products-catalog',
    component: loadable(() => import('pages/ecommerce/products-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    component: loadable(() => import('pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/product-edit',
    component: loadable(() => import('pages/ecommerce/product-edit')),
    exact: true,
  },
  {
    path: '/ecommerce/products-list',
    component: loadable(() => import('pages/ecommerce/products-list')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    component: loadable(() => import('pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    component: loadable(() => import('pages/ecommerce/cart')),
    exact: true,
  },

  // Layout
  {
    path: '/layout/bootstrap',
    component: loadable(() => import('pages/layout/bootstrap')),
    exact: true,
  },
  {
    path: '/layout/card',
    component: loadable(() => import('pages/layout/card')),
    exact: true,
  },
  {
    path: '/layout/utilities',
    component: loadable(() => import('pages/layout/utilities')),
    exact: true,
  },
  {
    path: '/layout/typography',
    component: loadable(() => import('pages/layout/typography')),
    exact: true,
  },
  {
    path: '/layout/mail-templates',
    component: loadable(() => import('pages/layout/mail-templates')),
    exact: true,
  },

  // Icons
  {
    path: '/icons/fontawesome',
    component: loadable(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linear',
    component: loadable(() => import('pages/icons/linear')),
    exact: true,
  },
  {
    path: '/icons/icomoon',
    component: loadable(() => import('pages/icons/icomoon')),
    exact: true,
  },

  // Charts
  {
    path: '/charts/chartist',
    component: loadable(() => import('pages/charts/chartist')),
    exact: true,
  },
  {
    path: '/charts/chart',
    component: loadable(() => import('pages/charts/chart')),
    exact: true,
  },
  {
    path: '/charts/peity',
    component: loadable(() => import('pages/charts/peity')),
    exact: true,
  },
  {
    path: '/charts/c3',
    component: loadable(() => import('pages/charts/c3')),
    exact: true,
  },

  // Blog
  {
    path: '/blog/feed',
    component: loadable(() => import('pages/blog/feed')),
    exact: true,
  },
  {
    path: '/blog/post',
    component: loadable(() => import('pages/blog/post')),
    exact: true,
  },
  {
    path: '/blog/add-blog-post',
    component: loadable(() => import('pages/blog/add-blog-post')),
    exact: true,
  },

  // YouTube
  {
    path: '/youtube/feed',
    component: loadable(() => import('pages/youtube/feed')),
    exact: true,
  },
  {
    path: '/youtube/view',
    component: loadable(() => import('pages/youtube/view')),
    exact: true,
  },

  // GitHub
  {
    path: '/github/explore',
    component: loadable(() => import('pages/github/explore')),
    exact: true,
  },
  {
    path: '/github/discuss',
    component: loadable(() => import('pages/github/discuss')),
    exact: true,
  },

  // AntDesign
  {
    path: '/antd',
    component: loadable(() => import('pages/antd')),
    exact: true,
  },
]

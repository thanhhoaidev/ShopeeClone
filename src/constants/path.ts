const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  logout: '/logout',
  register: '/register',
  productDetail: ':nameId',
  cart: '/cart',
  notFound: '*'
} as const

export default path

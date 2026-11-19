import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.path !== from.path) return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue')
    },
    {
      path: '/tour/:slug',
      name: 'tour',
      component: () => import('@/views/TourView.vue')
    },
    {
      path: '/booking/:departureId',
      name: 'booking',
      component: () => import('@/views/BookingView.vue')
    },
    {
      path: '/payment/:bookingId',
      name: 'payment',
      component: () => import('@/views/PaymentView.vue')
    },
    {
      path: '/payment/:id/success',
      name: 'payment-success',
      component: () => import('@/views/PaymentSuccessView.vue')
    },
    {
      path: '/trips',
      name: 'trips',
      component: () => import('@/views/TripsView.vue')
    },
    {
      path: '/trips/:id/memo',
      name: 'memo',
      component: () => import('@/views/MemoView.vue')
    },
    {
      path: '/trips/:id/album',
      name: 'album',
      component: () => import('@/views/AlbumView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/CalendarView.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/views/WishlistView.vue')
    },
    {
      path: '/organizer/:id',
      name: 'organizer',
      component: () => import('@/views/OrganizerView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/DemoView.vue')
    }
  ]
})

export default router
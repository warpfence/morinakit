export interface CustomRouteMeta {
  title?: string
  description?: string
  category?: 'text' | 'date' | 'image' | 'youtube' | 'random'
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
} 
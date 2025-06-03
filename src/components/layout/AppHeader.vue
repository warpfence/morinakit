<template>
  <header class="bg-white shadow-sm border-b border-gray-200 safe-area-top relative z-50">
    <div class="container-responsive">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- 로고 -->
        <RouterLink to="/" class="flex items-center space-x-2 touch-friendly">
          <div class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs sm:text-sm">M</span>
          </div>
          <span class="text-lg sm:text-xl font-bold text-gray-900">MorinaKit</span>
        </RouterLink>

        <!-- 모바일 햄버거 메뉴 (도구 페이지에서만 표시) -->
        <button 
          v-if="shouldShowMobileMenu"
          @click="toggleSidebar"
          class="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 touch-friendly"
          aria-label="메뉴 열기/닫기"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              :d="isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" 
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { isSidebarOpen, toggleSidebar } = useSidebar()

// 도구 페이지에서만 햄버거 메뉴 표시
const shouldShowMobileMenu = computed(() => {
  return route.meta?.layout === 'tool'
})
</script>

<style scoped>
/* 터치 피드백 개선 */
.touch-friendly:active {
  transform: scale(0.98);
  transition: transform 0.1s ease-in-out;
}

/* 안전 영역 대응 */
@supports (padding-top: env(safe-area-inset-top)) {
  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }
}
</style> 
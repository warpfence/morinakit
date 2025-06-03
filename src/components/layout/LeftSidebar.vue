<template>
  <!-- 좌측 패널 -->
  <aside 
    class="w-[15%] min-h-screen bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 z-40 overflow-y-auto transition-all duration-300 ease-in-out"
    :class="{
      'md:block': true,
      'hidden md:block': !isSidebarOpen,
      'block md:block': isSidebarOpen,
      'w-80 md:w-[15%]': true
    }"
  >
    <!-- 모바일 닫기 버튼 -->
    <div class="flex justify-between items-center p-4 md:hidden border-b border-gray-100 bg-white sticky top-0 z-50">
      <h2 class="font-bold text-gray-800 text-lg">도구 메뉴</h2>
      <button 
        @click="closeSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="메뉴 닫기"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 패널 헤더 (데스크톱) -->
    <div class="hidden md:block p-6 border-b border-gray-100 bg-white sticky top-0 z-50">
      <h2 class="font-bold text-gray-800 text-lg mb-1">도구 메뉴</h2>
      <p class="text-sm text-gray-500">원하는 도구를 선택하세요</p>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="p-4 space-y-8">
      <!-- 미디어 도구 -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
          <span class="text-xl">🛠</span>
          <h3 class="text-sm font-bold text-blue-800 uppercase tracking-wider">미디어 도구</h3>
        </div>
        <div class="space-y-1 pl-2">
          <RouterLink 
            to="/image/qr-generator"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200"
            :class="{ 'text-blue-700 bg-blue-100 border-blue-300 font-medium shadow-sm': $route.name === 'qr-generator' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">🔗</span>
            <span class="text-sm font-medium">QR 코드 생성기</span>
          </RouterLink>
          <RouterLink 
            to="/youtube/thumbnail"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200"
            :class="{ 'text-blue-700 bg-blue-100 border-blue-300 font-medium shadow-sm': $route.name === 'youtube-thumbnail' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📹</span>
            <span class="text-sm font-medium">유튜브 썸네일 추출기</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- 날짜/시간 도구 -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
          <span class="text-xl">📅</span>
          <h3 class="text-sm font-bold text-green-800 uppercase tracking-wider">날짜/시간 도구</h3>
        </div>
        <div class="space-y-1 pl-2">
          <RouterLink 
            to="/date/calculator"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-200"
            :class="{ 'text-green-700 bg-green-100 border-green-300 font-medium shadow-sm': $route.name === 'date-calculator' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">🕒</span>
            <span class="text-sm font-medium">날짜 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/dday"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-200"
            :class="{ 'text-green-700 bg-green-100 border-green-300 font-medium shadow-sm': $route.name === 'dday-calculator' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">⏰</span>
            <span class="text-sm font-medium">D-Day 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/weekday"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-200"
            :class="{ 'text-green-700 bg-green-100 border-green-300 font-medium shadow-sm': $route.name === 'weekday-calculator' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📅</span>
            <span class="text-sm font-medium">요일 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/age"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-200"
            :class="{ 'text-green-700 bg-green-100 border-green-300 font-medium shadow-sm': $route.name === 'age-calculator' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">🎂</span>
            <span class="text-sm font-medium">만 나이 계산기</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- 텍스트 도구 -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-100">
          <span class="text-xl">📝</span>
          <h3 class="text-sm font-bold text-purple-800 uppercase tracking-wider">텍스트 도구</h3>
        </div>
        <div class="space-y-1 pl-2">
          <RouterLink 
            to="/text/case-converter"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group border border-transparent hover:border-purple-200"
            :class="{ 'text-purple-700 bg-purple-100 border-purple-300 font-medium shadow-sm': $route.name === 'case-converter' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📄</span>
            <span class="text-sm font-medium">대소문자 변환기</span>
          </RouterLink>
          <RouterLink 
            to="/text/word-counter"
            @click="handleMenuClick"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group border border-transparent hover:border-purple-200"
            :class="{ 'text-purple-700 bg-purple-100 border-purple-300 font-medium shadow-sm': $route.name === 'word-counter' }"
          >
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📊</span>
            <span class="text-sm font-medium">단어/문자 수 세기</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- 패널 하단 정보 -->
    <div class="p-4 mt-auto border-t border-gray-100 bg-gray-50">
      <p class="text-xs text-gray-500 text-center">
        💡 필요한 도구를 빠르게 찾아보세요
      </p>
    </div>
  </aside>

  <!-- 모바일 오버레이 -->
  <div 
    v-if="isSidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
  ></div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { isSidebarOpen, closeSidebar } = useSidebar()

// 메뉴 클릭 시 모바일에서 사이드바 닫기
const handleMenuClick = () => {
  if (window.innerWidth < 768) {
    closeSidebar()
  }
}

// 라우트 변경 시 사이드바 닫기 (모바일에서)
watch(() => route.path, () => {
  if (window.innerWidth < 768) {
    closeSidebar()
  }
})
</script>

<style scoped>
/* 스크롤바 스타일링 */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 부드러운 애니메이션 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 포커스 상태 개선 */
.focus\:ring-2:focus {
  outline: none;
  ring-width: 2px;
  ring-color: rgb(59 130 246 / 0.5);
}
</style> 
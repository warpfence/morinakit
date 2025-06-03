<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out"
         :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
    <!-- 헤더 -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">도구 목록</h2>
      <button @click="$emit('close')" class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- 네비게이션 메뉴 -->
    <nav class="p-4 space-y-6 overflow-y-auto h-full pb-20">
      <!-- 미디어 도구 -->
      <div>
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">🎬 미디어 도구</h3>
        <div class="space-y-1">
          <RouterLink 
            to="/youtube/thumbnail"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'youtube-thumbnail' }"
          >
            <span class="text-lg">📹</span>
            <span class="text-sm">유튜브 썸네일 추출기</span>
          </RouterLink>
          <RouterLink 
            to="/image/qr-generator"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'qr-generator' }"
          >
            <span class="text-lg">🔗</span>
            <span class="text-sm">QR 코드 생성기</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- 날짜/시간 도구 -->
      <div>
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">📅 날짜/시간 도구</h3>
        <div class="space-y-1">
          <RouterLink 
            to="/date/calculator"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'date-calculator' }"
          >
            <span class="text-lg">🕒</span>
            <span class="text-sm">날짜 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/dday"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'dday-calculator' }"
          >
            <span class="text-lg">⏰</span>
            <span class="text-sm">D-Day 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/weekday"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'weekday-calculator' }"
          >
            <span class="text-lg">📅</span>
            <span class="text-sm">요일 계산기</span>
          </RouterLink>
          <RouterLink 
            to="/date/age"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'age-calculator' }"
          >
            <span class="text-lg">🎂</span>
            <span class="text-sm">만 나이 계산기</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- 텍스트 도구 -->
      <div>
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">📝 텍스트 도구</h3>
        <div class="space-y-1">
          <RouterLink 
            to="/text/word-counter"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'word-counter' }"
          >
            <span class="text-lg">📊</span>
            <span class="text-sm">단어/문자 수 세기</span>
          </RouterLink>
          <RouterLink 
            to="/text/case-converter"
            @click="$emit('close')"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50 font-medium': $route.name === 'case-converter' }"
          >
            <span class="text-lg">📄</span>
            <span class="text-sm">대소문자 변환기</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
  
  <!-- 오버레이 -->
  <div v-if="isOpen" @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
/* 스크롤바 스타일링 */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style> 
<template>
  <div class="home">
    <!-- 히어로 섹션 -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center py-12 sm:py-16 lg:py-20 px-4 -mx-4 -mt-8 mb-6 sm:mb-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in">MorinaKit</h1>
        <p class="text-lg sm:text-xl opacity-90 animate-fade-in animation-delay-200 mb-6 sm:mb-8 px-4">일상생활에 필요한 유틸리티 도구들</p>
        
        <!-- 검색 입력창 -->
        <div class="max-w-md mx-auto px-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="도구 검색..."
              class="w-full px-4 py-3 pl-12 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 input-mobile no-touch-zoom"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 메인 컨텐츠 -->
    <div class="container-responsive">
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">유용한 도구들</h2>
        <p class="text-base sm:text-lg text-gray-600 px-4">필요한 도구를 선택해서 사용해보세요!</p>
        
        <!-- 검색 결과 표시 -->
        <div v-if="searchQuery" class="mt-3 sm:mt-4 text-sm text-gray-600 px-4">
          <span v-if="filteredTools.length > 0">
            "{{ searchQuery }}"에 대한 검색 결과: {{ filteredTools.length }}개
          </span>
          <span v-else class="text-orange-600">
            "{{ searchQuery }}"에 대한 검색 결과가 없습니다.
          </span>
        </div>
      </div>
      
      <!-- 검색 결과 -->
      <div v-if="searchQuery">
        <div v-if="filteredTools.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <RouterLink 
            v-for="tool in filteredTools"
            :key="tool.path"
            :to="tool.path"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 text-left border border-gray-200 hover:border-blue-300 touch-friendly animate-slide-up"
          >
            <div class="text-2xl sm:text-3xl mb-2 sm:mb-3">{{ tool.icon }}</div>
            <h3 class="font-semibold text-gray-800 mb-1 sm:mb-2 text-base sm:text-lg">{{ tool.title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ tool.description }}</p>
          </RouterLink>
        </div>
      </div>
      
      <!-- 카테고리별 도구 표시 (검색하지 않을 때) -->
      <div v-else class="space-y-8 sm:space-y-12">
        <!-- 미디어 도구 -->
        <div class="animate-slide-up">
          <div class="flex items-center mb-4 sm:mb-6">
            <span class="text-2xl mr-3">🛠</span>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800">미디어 도구</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <RouterLink 
              v-for="tool in mediaTools"
              :key="tool.path"
              :to="tool.path"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 text-left border border-gray-200 hover:border-blue-300 touch-friendly"
            >
              <div class="text-2xl sm:text-3xl mb-2 sm:mb-3">{{ tool.icon }}</div>
              <h4 class="font-semibold text-gray-800 mb-1 sm:mb-2 text-base sm:text-lg">{{ tool.title }}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ tool.description }}</p>
            </RouterLink>
          </div>
        </div>
        
        <!-- 날짜/시간 도구 -->
        <div class="animate-slide-up animation-delay-200">
          <div class="flex items-center mb-4 sm:mb-6">
            <span class="text-2xl mr-3">📅</span>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800">날짜/시간 도구</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <RouterLink 
              v-for="tool in dateTools"
              :key="tool.path"
              :to="tool.path"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 text-left border border-gray-200 hover:border-blue-300 touch-friendly"
            >
              <div class="text-2xl sm:text-3xl mb-2 sm:mb-3">{{ tool.icon }}</div>
              <h4 class="font-semibold text-gray-800 mb-1 sm:mb-2 text-base sm:text-lg">{{ tool.title }}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ tool.description }}</p>
            </RouterLink>
          </div>
        </div>
        
        <!-- 텍스트 도구 -->
        <div class="animate-slide-up animation-delay-400">
          <div class="flex items-center mb-4 sm:mb-6">
            <span class="text-2xl mr-3">📝</span>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800">텍스트 도구</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <RouterLink 
              v-for="tool in textTools"
              :key="tool.path"
              :to="tool.path"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 text-left border border-gray-200 hover:border-blue-300 touch-friendly"
            >
              <div class="text-2xl sm:text-3xl mb-2 sm:mb-3">{{ tool.icon }}</div>
              <h4 class="font-semibold text-gray-800 mb-1 sm:mb-2 text-base sm:text-lg">{{ tool.title }}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ tool.description }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- 검색 결과가 없을 때 -->
      <div v-if="searchQuery && filteredTools.length === 0" class="text-center py-8 sm:py-12 px-4">
        <div class="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">검색 결과가 없습니다</h3>
        <p class="text-gray-600 mb-4 text-sm sm:text-base">다른 키워드로 검색해보세요.</p>
        <button 
          @click="searchQuery = ''"
          class="btn-mobile bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 touch-friendly"
        >
          전체 도구 보기
        </button>
      </div>
      
      <!-- 사용법 안내 (모바일에서는 간소화) -->
      <div class="mt-8 sm:mt-12 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 animate-slide-up animation-delay-600">
        <h3 class="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4 text-center">💡 사용 팁</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-blue-700">
          <div class="flex items-start space-x-2">
            <span class="text-blue-500 mt-0.5">•</span>
            <span class="text-sm sm:text-base">검색으로 원하는 도구를 빠르게 찾으세요</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-blue-500 mt-0.5">•</span>
            <span class="text-sm sm:text-base">모든 도구는 모바일에서도 완벽하게 작동합니다</span>
          </div>
          <div class="flex items-start space-x-2 sm:col-span-2">
            <span class="text-blue-500 mt-0.5">•</span>
            <span class="text-sm sm:text-base">북마크에 추가하여 언제든지 쉽게 접근하세요</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const searchQuery = ref('')

// 카테고리별 도구 데이터 정의
const textTools = [
  {
    path: '/text/case-converter',
    icon: '📄',
    title: '대소문자 변환기',
    description: '텍스트의 대소문자를 다양한 방식으로 변환',
    keywords: ['텍스트', 'text', '대소문자', '변환']
  },
  {
    path: '/text/word-counter',
    icon: '📊',
    title: '단어/문자 수 세기',
    description: '입력된 텍스트의 단어 수, 문자 수를 실시간으로 계산',
    keywords: ['글자수', '문자수', '단어수', '세기', '계산', '카운터']
  }
]

const dateTools = [
  {
    path: '/date/calculator',
    icon: '🕒',
    title: '날짜 계산기',
    description: '특정 날짜로부터 며칠 뒤 또는 며칠 전의 날짜를 계산',
    keywords: ['날짜', '계산기', '디데이', 'dday', '요일', '만나이', '나이']
  },
  {
    path: '/date/dday',
    icon: '⏰',
    title: 'D-Day 계산기',
    description: '중요한 일정까지의 남은 시간을 실시간으로 카운트다운',
    keywords: ['디데이', 'dday', '계산기', '날짜', '카운트다운']
  },
  {
    path: '/date/weekday',
    icon: '📅',
    title: '요일 계산기',
    description: '과거나 미래의 특정 날짜가 무슨 요일인지 계산',
    keywords: ['요일', '계산기', '날짜', '월화수목금토일']
  },
  {
    path: '/date/age',
    icon: '🎂',
    title: '만 나이 계산기',
    description: '생년월일을 입력하면 정확한 만 나이를 계산',
    keywords: ['만나이', '나이', '계산기', '생년월일', '연령']
  }
]

const mediaTools = [
  {
    path: '/image/qr-generator',
    icon: '🔗',
    title: 'QR 코드 생성기',
    description: '텍스트나 URL을 입력하면 QR 코드를 생성하고 다운로드 제공',
    keywords: ['qr', 'qr코드', '큐알', '생성기', '바코드']
  },
  {
    path: '/youtube/thumbnail',
    icon: '📹',
    title: '유튜브 썸네일 추출기',
    description: '유튜브 URL을 입력하면 다양한 해상도의 썸네일 이미지를 추출',
    keywords: ['유튜브', 'youtube', '썸네일', 'thumbnail', '추출', '이미지']
  }
]

// 모든 도구를 하나의 배열로 합치기 (검색용)
const allTools = computed(() => [...mediaTools, ...dateTools, ...textTools])

// 검색 필터링 로직
const filteredTools = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return allTools.value.filter(tool => 
    tool.title.toLowerCase().includes(query) ||
    tool.description.toLowerCase().includes(query) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
  )
})
</script>

<style scoped>
/* 추가 모바일 최적화 스타일 */
@media (max-width: 640px) {
  .home {
    /* 모바일에서 전체 여백 최적화 */
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* 터치 피드백 개선 */
.touch-friendly:active {
  transform: scale(0.98);
}

/* 애니메이션 성능 최적화 */
.animate-slide-up {
  will-change: transform, opacity;
}
</style> 
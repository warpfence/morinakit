<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">⏰ D-Day 계산기</h1>
      <p class="text-lg text-gray-600">중요한 일정까지의 남은 시간을 실시간으로 카운트다운</p>
    </div>
    
    <!-- D-Day 추가 영역 -->
    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">새 D-Day 추가</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">이벤트 이름</label>
          <input
            v-model="newEvent.title"
            type="text"
            placeholder="예: 생일, 시험, 여행"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">목표 날짜</label>
          <input
            v-model="newEvent.date"
            type="date"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div class="flex items-end">
          <button
            @click="addEvent"
            :disabled="!newEvent.title || !newEvent.date"
            class="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            ➕ D-Day 추가
          </button>
        </div>
      </div>
    </div>
    
    <!-- D-Day 목록 -->
    <div v-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
      >
        <!-- 이벤트 헤더 -->
        <div class="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div class="flex justify-between items-start">
            <h3 class="font-semibold text-lg truncate">{{ event.title }}</h3>
            <button
              @click="removeEvent(event.id)"
              class="text-white hover:text-red-200 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          <p class="text-sm opacity-90 mt-1">{{ formatDate(new Date(event.date)) }}</p>
        </div>
        
        <!-- 카운트다운 -->
        <div class="p-6">
          <div v-if="getTimeRemaining(event.date).isPast" class="text-center">
            <div class="text-4xl mb-2">🎉</div>
            <div class="text-lg font-semibold text-green-600 mb-1">완료!</div>
            <div class="text-sm text-gray-600">
              {{ Math.abs(getTimeRemaining(event.date).totalDays) }}일 전에 지났습니다
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <!-- D-Day 표시 -->
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-1">
                D-{{ getTimeRemaining(event.date).totalDays }}
              </div>
              <div class="text-sm text-gray-600">
                {{ getTimeRemaining(event.date).totalDays === 0 ? '오늘!' : `${getTimeRemaining(event.date).totalDays}일 남음` }}
              </div>
            </div>
            
            <!-- 시간 카운트다운 -->
            <div class="grid grid-cols-4 gap-2 text-center">
              <div class="bg-gray-50 rounded-lg p-2">
                <div class="text-lg font-bold text-gray-800">{{ getTimeRemaining(event.date).days }}</div>
                <div class="text-xs text-gray-600">일</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-2">
                <div class="text-lg font-bold text-gray-800">{{ getTimeRemaining(event.date).hours }}</div>
                <div class="text-xs text-gray-600">시간</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-2">
                <div class="text-lg font-bold text-gray-800">{{ getTimeRemaining(event.date).minutes }}</div>
                <div class="text-xs text-gray-600">분</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-2">
                <div class="text-lg font-bold text-gray-800">{{ getTimeRemaining(event.date).seconds }}</div>
                <div class="text-xs text-gray-600">초</div>
              </div>
            </div>
            
            <!-- 진행률 바 -->
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                :style="{ width: `${getProgressPercentage(event.date)}%` }"
              ></div>
            </div>
            <div class="text-center text-xs text-gray-600">
              {{ getProgressPercentage(event.date).toFixed(1) }}% 진행됨
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 빈 상태 -->
    <div v-else class="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
      <div class="text-6xl mb-4">📅</div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">아직 D-Day가 없습니다</h3>
      <p class="text-gray-600 mb-4">위에서 첫 번째 D-Day를 추가해보세요!</p>
    </div>
    
    <!-- 빠른 추가 템플릿 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">🚀 빠른 추가</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="template in quickTemplates"
          :key="template.title"
          @click="addQuickEvent(template)"
          class="p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-left"
        >
          <div class="text-lg mb-1">{{ template.icon }}</div>
          <div class="text-sm font-medium text-blue-800">{{ template.title }}</div>
          <div class="text-xs text-blue-600">{{ template.description }}</div>
        </button>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-green-800 mb-3">💡 사용법</h3>
      <ul class="text-green-700 space-y-2 text-sm">
        <li>• 이벤트 이름과 목표 날짜를 입력하여 D-Day를 추가하세요</li>
        <li>• 각 D-Day는 실시간으로 카운트다운됩니다</li>
        <li>• 일, 시간, 분, 초 단위로 정확한 시간을 확인할 수 있습니다</li>
        <li>• 진행률 바로 시간의 흐름을 시각적으로 확인하세요</li>
        <li>• 빠른 추가 템플릿을 사용하여 쉽게 D-Day를 설정할 수 있습니다</li>
        <li>• 브라우저에 자동으로 저장되어 다음에 방문해도 유지됩니다</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface DdayEvent {
  id: string
  title: string
  date: string
}

interface TimeRemaining {
  totalDays: number
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

const events = ref<DdayEvent[]>([])
const newEvent = ref({
  title: '',
  date: ''
})

let intervalId: number | null = null

// 빠른 추가 템플릿
const quickTemplates = [
  {
    icon: '🎂',
    title: '생일',
    description: '다음 생일까지',
    getDays: () => {
      const today = new Date()
      const birthday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      birthday.setFullYear(today.getFullYear() + 1)
      return birthday
    }
  },
  {
    icon: '🎄',
    title: '크리스마스',
    description: '올해 크리스마스',
    getDays: () => {
      const today = new Date()
      const christmas = new Date(today.getFullYear(), 11, 25) // 12월 25일
      if (christmas < today) {
        christmas.setFullYear(today.getFullYear() + 1)
      }
      return christmas
    }
  },
  {
    icon: '🎆',
    title: '신정',
    description: '다음 신정',
    getDays: () => {
      const today = new Date()
      const newYear = new Date(today.getFullYear() + 1, 0, 1) // 다음 해 1월 1일
      return newYear
    }
  },
  {
    icon: '💼',
    title: '주말',
    description: '이번 주 토요일',
    getDays: () => {
      const today = new Date()
      const saturday = new Date(today)
      saturday.setDate(today.getDate() + (6 - today.getDay()))
      return saturday
    }
  }
]

// 시간 계산
const getTimeRemaining = (targetDate: string): TimeRemaining => {
  const now = new Date().getTime()
  const target = new Date(targetDate).getTime()
  const difference = target - now
  
  const isPast = difference < 0
  const absDifference = Math.abs(difference)
  
  const totalDays = Math.ceil(absDifference / (1000 * 60 * 60 * 24))
  const days = Math.floor(absDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((absDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((absDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((absDifference % (1000 * 60)) / 1000)
  
  return {
    totalDays,
    days,
    hours,
    minutes,
    seconds,
    isPast
  }
}

// 진행률 계산 (1년 기준)
const getProgressPercentage = (targetDate: string): number => {
  const now = new Date()
  const target = new Date(targetDate)
  const oneYearAgo = new Date(target.getTime() - (365 * 24 * 60 * 60 * 1000))
  
  const totalTime = target.getTime() - oneYearAgo.getTime()
  const elapsedTime = now.getTime() - oneYearAgo.getTime()
  
  const percentage = (elapsedTime / totalTime) * 100
  return Math.max(0, Math.min(100, percentage))
}

// 날짜 포맷팅
const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 이벤트 추가
const addEvent = () => {
  if (!newEvent.value.title || !newEvent.value.date) return
  
  const event: DdayEvent = {
    id: Date.now().toString(),
    title: newEvent.value.title,
    date: newEvent.value.date
  }
  
  events.value.push(event)
  saveToLocalStorage()
  
  // 입력 필드 초기화
  newEvent.value.title = ''
  newEvent.value.date = ''
}

// 빠른 이벤트 추가
const addQuickEvent = (template: any) => {
  const targetDate = template.getDays()
  const event: DdayEvent = {
    id: Date.now().toString(),
    title: template.title,
    date: targetDate.toISOString().split('T')[0]
  }
  
  events.value.push(event)
  saveToLocalStorage()
}

// 이벤트 제거
const removeEvent = (id: string) => {
  events.value = events.value.filter(event => event.id !== id)
  saveToLocalStorage()
}

// 로컬 스토리지 저장
const saveToLocalStorage = () => {
  localStorage.setItem('ddayEvents', JSON.stringify(events.value))
}

// 로컬 스토리지 로드
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('ddayEvents')
  if (saved) {
    events.value = JSON.parse(saved)
  }
}

// 실시간 업데이트 시작
const startRealTimeUpdate = () => {
  intervalId = window.setInterval(() => {
    // 강제로 리렌더링을 위해 빈 업데이트
  }, 1000)
}

// 실시간 업데이트 중지
const stopRealTimeUpdate = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 컴포넌트 마운트 시
onMounted(() => {
  loadFromLocalStorage()
  startRealTimeUpdate()
})

// 컴포넌트 언마운트 시
onUnmounted(() => {
  stopRealTimeUpdate()
})
</script> 
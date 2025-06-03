<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">📅 요일 계산기</h1>
      <p class="text-lg text-gray-600">과거나 미래의 특정 날짜가 무슨 요일인지 계산하고 달력으로 확인</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 입력 및 결과 영역 -->
      <div class="space-y-6">
        <!-- 날짜 입력 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">날짜 선택</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">날짜 입력</label>
              <input
                v-model="selectedDate"
                type="date"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <!-- 빠른 선택 버튼들 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">빠른 선택</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="setToday"
                  class="p-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                >
                  📅 오늘
                </button>
                <button
                  @click="setTomorrow"
                  class="p-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
                >
                  ➡️ 내일
                </button>
                <button
                  @click="setYesterday"
                  class="p-2 text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors duration-200"
                >
                  ⬅️ 어제
                </button>
                <button
                  @click="setNewYear"
                  class="p-2 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200"
                >
                  🎆 신정
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 결과 표시 -->
        <div v-if="selectedDate" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">계산 결과</h2>
          
          <div class="space-y-4">
            <!-- 메인 결과 -->
            <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div class="text-2xl font-bold text-blue-600 mb-2">
                {{ formatDateKorean(new Date(selectedDate)) }}
              </div>
              <div class="text-4xl font-bold mb-2" :style="{ color: getWeekdayColor(getWeekday(selectedDate)) }">
                {{ getWeekday(selectedDate) }}
              </div>
              <div class="text-sm text-gray-600">
                {{ getDateDescription(selectedDate) }}
              </div>
            </div>
            
            <!-- 상세 정보 -->
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">선택한 날짜</span>
                <span class="font-medium">{{ formatDate(new Date(selectedDate)) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">요일</span>
                <span class="font-medium" :style="{ color: getWeekdayColor(getWeekday(selectedDate)) }">
                  {{ getWeekday(selectedDate) }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">오늘로부터</span>
                <span class="font-medium">{{ getDaysFromToday(selectedDate) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">주말 여부</span>
                <span class="font-medium">
                  {{ isWeekend(selectedDate) ? '🎉 주말' : '💼 평일' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">연도</span>
                <span class="font-medium">{{ new Date(selectedDate).getFullYear() }}년</span>
              </div>
            </div>
            
            <!-- 복사 버튼 -->
            <button
              @click="copyResult"
              class="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              📋 결과 복사하기
            </button>
          </div>
        </div>
        
        <!-- 역사적 날짜 정보 -->
        <div v-if="selectedDate && historicalInfo" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-3">📚 역사적 정보</h3>
          <p class="text-yellow-700 text-sm">{{ historicalInfo }}</p>
        </div>
      </div>
      
      <!-- 달력 표시 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">달력 보기</h2>
        
        <div v-if="selectedDate" class="space-y-4">
          <!-- 달력 헤더 -->
          <div class="flex items-center justify-between">
            <button
              @click="previousMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              ⬅️
            </button>
            <h3 class="text-lg font-semibold text-gray-800">
              {{ getMonthYear(calendarDate) }}
            </h3>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              ➡️
            </button>
          </div>
          
          <!-- 요일 헤더 -->
          <div class="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
            <div class="p-2 text-red-600">일</div>
            <div class="p-2">월</div>
            <div class="p-2">화</div>
            <div class="p-2">수</div>
            <div class="p-2">목</div>
            <div class="p-2">금</div>
            <div class="p-2 text-blue-600">토</div>
          </div>
          
          <!-- 달력 날짜들 -->
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="day in calendarDays"
              :key="day.key"
              :class="[
                'p-2 text-center text-sm rounded-lg transition-all duration-200',
                day.isCurrentMonth ? 'text-gray-800' : 'text-gray-300',
                day.isToday ? 'bg-green-100 border-2 border-green-500 font-bold' : '',
                day.isSelected ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100',
                day.isWeekend && day.isCurrentMonth ? (day.day % 7 === 0 ? 'text-red-600' : 'text-blue-600') : ''
              ]"
              @click="selectCalendarDate(day.date)"
            >
              {{ day.day }}
            </div>
          </div>
          
          <!-- 달력 범례 -->
          <div class="text-xs text-gray-600 space-y-1">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
              <span>오늘</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <span>선택된 날짜</span>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12 text-gray-500">
          <div class="text-4xl mb-4">📅</div>
          <p>날짜를 선택하면<br>달력이 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 날짜 입력 필드에서 원하는 날짜를 선택하세요</li>
        <li>• 빠른 선택 버튼으로 자주 사용하는 날짜를 쉽게 설정할 수 있습니다</li>
        <li>• 선택한 날짜의 요일과 상세 정보를 확인할 수 있습니다</li>
        <li>• 오른쪽 달력에서 해당 월의 전체 달력을 볼 수 있습니다</li>
        <li>• 달력에서 직접 날짜를 클릭하여 선택할 수도 있습니다</li>
        <li>• 결과 복사 버튼으로 정보를 클립보드에 복사할 수 있습니다</li>
      </ul>
    </div>
    
    <!-- 복사 성공 알림 -->
    <div
      v-if="showCopySuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    >
      ✅ 클립보드에 복사되었습니다!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const calendarDate = ref(new Date())
const showCopySuccess = ref(false)

// 선택된 날짜가 변경될 때 달력도 업데이트
watch(selectedDate, (newDate) => {
  if (newDate) {
    calendarDate.value = new Date(newDate)
  }
})

// 요일 계산
const getWeekday = (dateString: string): string => {
  const date = new Date(dateString)
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return weekdays[date.getDay()]
}

// 요일별 색상
const getWeekdayColor = (weekday: string): string => {
  const colors: { [key: string]: string } = {
    '일요일': '#dc2626', // red-600
    '월요일': '#374151', // gray-700
    '화요일': '#374151',
    '수요일': '#374151',
    '목요일': '#374151',
    '금요일': '#374151',
    '토요일': '#2563eb'  // blue-600
  }
  return colors[weekday] || '#374151'
}

// 주말 여부 확인
const isWeekend = (dateString: string): boolean => {
  const date = new Date(dateString)
  const day = date.getDay()
  return day === 0 || day === 6 // 일요일(0) 또는 토요일(6)
}

// 날짜 포맷팅
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const formatDateKorean = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 오늘로부터 며칠 후/전인지 계산
const getDaysFromToday = (dateString: string): string => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const targetDate = new Date(dateString)
  targetDate.setHours(0, 0, 0, 0)
  
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return '오늘'
  if (diffDays === 1) return '내일'
  if (diffDays === -1) return '어제'
  if (diffDays > 0) return `${diffDays}일 후`
  return `${Math.abs(diffDays)}일 전`
}

// 날짜 설명
const getDateDescription = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  
  if (date.toDateString() === today.toDateString()) {
    return '오늘입니다'
  }
  
  const year = date.getFullYear()
  const currentYear = today.getFullYear()
  
  if (year < currentYear) {
    return `${currentYear - year}년 전의 날짜입니다`
  } else if (year > currentYear) {
    return `${year - currentYear}년 후의 날짜입니다`
  } else {
    return '올해의 날짜입니다'
  }
}

// 역사적 정보 (간단한 예시)
const historicalInfo = computed(() => {
  if (!selectedDate.value) return null
  
  const date = new Date(selectedDate.value)
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const historicalEvents: { [key: string]: string } = {
    '1-1': '신정 - 새해의 첫날입니다.',
    '3-1': '삼일절 - 1919년 3.1 독립운동이 일어난 날입니다.',
    '5-5': '어린이날 - 어린이들을 위한 특별한 날입니다.',
    '6-6': '현충일 - 나라를 위해 희생하신 분들을 기리는 날입니다.',
    '8-15': '광복절 - 1945년 일제강점기에서 해방된 날입니다.',
    '10-3': '개천절 - 단군왕검이 고조선을 건국한 날입니다.',
    '10-9': '한글날 - 세종대왕이 한글을 반포한 날입니다.',
    '12-25': '크리스마스 - 예수 그리스도의 탄생을 기념하는 날입니다.'
  }
  
  const key = `${month}-${day}`
  return historicalEvents[key] || null
})

// 빠른 선택 함수들
const setToday = () => {
  selectedDate.value = new Date().toISOString().split('T')[0]
}

const setTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  selectedDate.value = tomorrow.toISOString().split('T')[0]
}

const setYesterday = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  selectedDate.value = yesterday.toISOString().split('T')[0]
}

const setNewYear = () => {
  const newYear = new Date()
  newYear.setMonth(0, 1) // 1월 1일
  selectedDate.value = newYear.toISOString().split('T')[0]
}

// 달력 관련 함수들
const getMonthYear = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long'
  })
}

const previousMonth = () => {
  const newDate = new Date(calendarDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  calendarDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(calendarDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  calendarDate.value = newDate
}

// 달력 날짜들 계산
const calendarDays = computed(() => {
  const year = calendarDate.value.getFullYear()
  const month = calendarDate.value.getMonth()
  
  // 이번 달 첫날과 마지막날
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // 달력 시작일 (이전 달의 마지막 주)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  // 달력 종료일 (다음 달의 첫 주)
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
  
  const days = []
  const currentDate = new Date(startDate)
  const today = new Date()
  const selected = selectedDate.value ? new Date(selectedDate.value) : null
  
  while (currentDate <= endDate) {
    const isCurrentMonth = currentDate.getMonth() === month
    const isToday = currentDate.toDateString() === today.toDateString()
    const isSelected = selected && currentDate.toDateString() === selected.toDateString()
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6
    
    days.push({
      day: currentDate.getDate(),
      date: new Date(currentDate),
      isCurrentMonth,
      isToday,
      isSelected,
      isWeekend,
      key: currentDate.toISOString()
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return days
})

// 달력에서 날짜 선택
const selectCalendarDate = (date: Date) => {
  selectedDate.value = date.toISOString().split('T')[0]
}

// 결과 복사
const copyResult = async () => {
  if (!selectedDate.value) return
  
  const date = new Date(selectedDate.value)
  const result = `요일 계산 결과
날짜: ${formatDate(date)}
요일: ${getWeekday(selectedDate.value)}
오늘로부터: ${getDaysFromToday(selectedDate.value)}
주말 여부: ${isWeekend(selectedDate.value) ? '주말' : '평일'}
연도: ${date.getFullYear()}년`
  
  try {
    await navigator.clipboard.writeText(result)
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('복사 실패:', err)
    // 폴백: 텍스트 선택 방식
    const textArea = document.createElement('textarea')
    textArea.value = result
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  }
}
</script> 
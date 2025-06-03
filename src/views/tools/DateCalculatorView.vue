<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">🕒 날짜 계산기</h1>
      <p class="text-lg text-gray-600">특정 날짜로부터 며칠 뒤 또는 며칠 전의 날짜를 계산</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 입력 영역 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">날짜 계산 설정</h2>
        
        <!-- 기준 날짜 선택 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">기준 날짜</label>
          <input
            v-model="baseDate"
            type="date"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <!-- 계산 방식 선택 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">계산 방식</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="operation = 'add'"
              :class="[
                'p-3 rounded-lg border-2 transition-all duration-200',
                operation === 'add' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              ]"
            >
              <div class="text-lg mb-1">➕</div>
              <div class="text-sm font-medium">날짜 더하기</div>
            </button>
            <button
              @click="operation = 'subtract'"
              :class="[
                'p-3 rounded-lg border-2 transition-all duration-200',
                operation === 'subtract' 
                  ? 'border-red-500 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              ]"
            >
              <div class="text-lg mb-1">➖</div>
              <div class="text-sm font-medium">날짜 빼기</div>
            </button>
          </div>
        </div>
        
        <!-- 일수 입력 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ operation === 'add' ? '더할 일수' : '뺄 일수' }}
          </label>
          <input
            v-model.number="days"
            type="number"
            min="0"
            placeholder="일수를 입력하세요"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <!-- 빠른 선택 버튼들 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">빠른 선택</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="quickDay in quickDays"
              :key="quickDay"
              @click="days = quickDay"
              class="p-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
            >
              {{ quickDay }}일
            </button>
          </div>
        </div>
        
        <!-- 오늘 날짜로 설정 버튼 -->
        <button
          @click="setToday"
          class="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
        >
          📅 오늘 날짜로 설정
        </button>
      </div>
      
      <!-- 결과 영역 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">계산 결과</h2>
        
        <div v-if="calculatedDate" class="space-y-6">
          <!-- 메인 결과 -->
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ formatDate(calculatedDate) }}
            </div>
            <div class="text-sm text-blue-700">
              {{ formatDateKorean(calculatedDate) }}
            </div>
          </div>
          
          <!-- 상세 정보 -->
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b border-gray-100">
              <span class="text-gray-600">기준 날짜</span>
              <span class="font-medium">{{ formatDate(new Date(baseDate)) }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-gray-100">
              <span class="text-gray-600">계산 방식</span>
              <span class="font-medium">
                {{ operation === 'add' ? `${days}일 더하기` : `${days}일 빼기` }}
              </span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-gray-100">
              <span class="text-gray-600">결과 날짜</span>
              <span class="font-medium">{{ formatDate(calculatedDate) }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-gray-100">
              <span class="text-gray-600">요일</span>
              <span class="font-medium">{{ getDayOfWeek(calculatedDate) }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-gray-600">오늘로부터</span>
              <span class="font-medium">{{ getDaysFromToday(calculatedDate) }}</span>
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
        
        <div v-else class="text-center py-12 text-gray-500">
          <div class="text-4xl mb-4">📅</div>
          <p>기준 날짜와 일수를 입력하면<br>계산 결과가 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 기준이 될 날짜를 선택하세요</li>
        <li>• 날짜를 더할지 뺄지 선택하세요</li>
        <li>• 계산할 일수를 입력하거나 빠른 선택 버튼을 사용하세요</li>
        <li>• 결과 날짜와 상세 정보를 확인할 수 있습니다</li>
        <li>• "결과 복사하기" 버튼으로 결과를 클립보드에 복사할 수 있습니다</li>
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
import { ref, computed } from 'vue'

const baseDate = ref(new Date().toISOString().split('T')[0])
const operation = ref<'add' | 'subtract'>('add')
const days = ref(0)
const showCopySuccess = ref(false)

const quickDays = [1, 7, 14, 30, 60, 90, 180, 365]

// 계산된 날짜
const calculatedDate = computed(() => {
  if (!baseDate.value || days.value === null || days.value === undefined) return null
  
  const base = new Date(baseDate.value)
  const result = new Date(base)
  
  if (operation.value === 'add') {
    result.setDate(base.getDate() + days.value)
  } else {
    result.setDate(base.getDate() - days.value)
  }
  
  return result
})

// 날짜 포맷팅
const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const formatDateKorean = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 요일 구하기
const getDayOfWeek = (date: Date) => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return days[date.getDay()]
}

// 오늘로부터 며칠 후/전인지 계산
const getDaysFromToday = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return '오늘'
  if (diffDays === 1) return '내일'
  if (diffDays === -1) return '어제'
  if (diffDays > 0) return `${diffDays}일 후`
  return `${Math.abs(diffDays)}일 전`
}

// 오늘 날짜로 설정
const setToday = () => {
  baseDate.value = new Date().toISOString().split('T')[0]
}

// 결과 복사
const copyResult = async () => {
  if (!calculatedDate.value) return
  
  const result = `날짜 계산 결과
기준 날짜: ${formatDate(new Date(baseDate.value))}
계산: ${operation.value === 'add' ? `${days.value}일 더하기` : `${days.value}일 빼기`}
결과: ${formatDate(calculatedDate.value)} (${getDayOfWeek(calculatedDate.value)})
오늘로부터: ${getDaysFromToday(calculatedDate.value)}`
  
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
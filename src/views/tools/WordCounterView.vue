<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">📊 단어/문자 수 세기</h1>
      <p class="text-lg text-gray-600">입력된 텍스트의 단어 수, 문자 수를 실시간으로 계산</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 입력 영역 -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">텍스트 입력</h2>
          <button
            @click="clearInput"
            class="text-red-600 hover:text-red-700 text-sm transition-colors duration-200"
          >
            전체 지우기
          </button>
        </div>
        
        <textarea
          v-model="inputText"
          placeholder="분석할 텍스트를 입력하세요..."
          class="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        ></textarea>
        
        <!-- 빠른 통계 -->
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="font-semibold text-blue-600">{{ wordCount }}</div>
            <div class="text-gray-600">단어</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="font-semibold text-green-600">{{ charCountWithSpaces }}</div>
            <div class="text-gray-600">문자(공백포함)</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="font-semibold text-purple-600">{{ charCountWithoutSpaces }}</div>
            <div class="text-gray-600">문자(공백제외)</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="font-semibold text-orange-600">{{ lineCount }}</div>
            <div class="text-gray-600">줄</div>
          </div>
        </div>
      </div>
      
      <!-- 통계 영역 -->
      <div class="space-y-6">
        <!-- 기본 통계 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">📈 기본 통계</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">단어 수</span>
              <span class="font-semibold text-blue-600">{{ wordCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">문자 수 (공백 포함)</span>
              <span class="font-semibold text-green-600">{{ charCountWithSpaces.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">문자 수 (공백 제외)</span>
              <span class="font-semibold text-purple-600">{{ charCountWithoutSpaces.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">줄 수</span>
              <span class="font-semibold text-orange-600">{{ lineCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">문단 수</span>
              <span class="font-semibold text-red-600">{{ paragraphCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">공백 수</span>
              <span class="font-semibold text-indigo-600">{{ spaceCount.toLocaleString() }}</span>
            </div>
          </div>
        </div>
        
        <!-- 고급 통계 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">🔍 고급 통계</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">평균 단어 길이</span>
              <span class="font-semibold text-blue-600">{{ averageWordLength }} 문자</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">가장 긴 단어</span>
              <span class="font-semibold text-green-600">{{ longestWord || '-' }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">가장 짧은 단어</span>
              <span class="font-semibold text-purple-600">{{ shortestWord || '-' }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">고유 단어 수</span>
              <span class="font-semibold text-orange-600">{{ uniqueWordCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">읽기 시간 (추정)</span>
              <span class="font-semibold text-red-600">{{ readingTime }}</span>
            </div>
          </div>
        </div>
        
        <!-- 문자 유형별 통계 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">🔤 문자 유형별</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">영문자</span>
              <span class="font-semibold text-blue-600">{{ letterCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">숫자</span>
              <span class="font-semibold text-green-600">{{ numberCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">한글</span>
              <span class="font-semibold text-purple-600">{{ koreanCount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">특수문자</span>
              <span class="font-semibold text-orange-600">{{ specialCharCount.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 왼쪽 텍스트 영역에 분석할 텍스트를 입력하세요</li>
        <li>• 입력과 동시에 실시간으로 다양한 통계가 계산됩니다</li>
        <li>• 기본 통계: 단어 수, 문자 수, 줄 수, 문단 수 등</li>
        <li>• 고급 통계: 평균 단어 길이, 가장 긴/짧은 단어, 읽기 시간 등</li>
        <li>• 문자 유형별: 영문자, 숫자, 한글, 특수문자 개수</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputText = ref('')

// 기본 통계
const wordCount = computed(() => {
  if (!inputText.value.trim()) return 0
  return inputText.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const charCountWithSpaces = computed(() => {
  return inputText.value.length
})

const charCountWithoutSpaces = computed(() => {
  return inputText.value.replace(/\s/g, '').length
})

const lineCount = computed(() => {
  if (!inputText.value) return 0
  return inputText.value.split('\n').length
})

const paragraphCount = computed(() => {
  if (!inputText.value.trim()) return 0
  return inputText.value.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length
})

const spaceCount = computed(() => {
  return (inputText.value.match(/\s/g) || []).length
})

// 고급 통계
const words = computed(() => {
  if (!inputText.value.trim()) return []
  return inputText.value.trim().split(/\s+/).filter(word => word.length > 0)
})

const averageWordLength = computed(() => {
  if (words.value.length === 0) return '0.0'
  const totalLength = words.value.reduce((sum, word) => sum + word.length, 0)
  return (totalLength / words.value.length).toFixed(1)
})

const longestWord = computed(() => {
  if (words.value.length === 0) return ''
  return words.value.reduce((longest, word) => 
    word.length > longest.length ? word : longest, ''
  )
})

const shortestWord = computed(() => {
  if (words.value.length === 0) return ''
  return words.value.reduce((shortest, word) => 
    word.length < shortest.length ? word : shortest, words.value[0] || ''
  )
})

const uniqueWordCount = computed(() => {
  if (words.value.length === 0) return 0
  const uniqueWords = new Set(words.value.map(word => word.toLowerCase()))
  return uniqueWords.size
})

const readingTime = computed(() => {
  const wordsPerMinute = 200 // 평균 읽기 속도
  const minutes = Math.ceil(wordCount.value / wordsPerMinute)
  if (minutes === 0) return '0분'
  if (minutes === 1) return '1분 미만'
  return `약 ${minutes}분`
})

// 문자 유형별 통계
const letterCount = computed(() => {
  return (inputText.value.match(/[a-zA-Z]/g) || []).length
})

const numberCount = computed(() => {
  return (inputText.value.match(/[0-9]/g) || []).length
})

const koreanCount = computed(() => {
  return (inputText.value.match(/[가-힣]/g) || []).length
})

const specialCharCount = computed(() => {
  return (inputText.value.match(/[^\w\s가-힣]/g) || []).length
})

// 입력 텍스트 지우기
const clearInput = () => {
  inputText.value = ''
}
</script> 
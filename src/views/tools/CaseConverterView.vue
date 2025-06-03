<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">📄 대소문자 변환기</h1>
      <p class="text-lg text-gray-600">텍스트의 대소문자를 다양한 방식으로 변환하는 도구</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 입력 영역 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">텍스트 입력</h2>
        <textarea
          v-model="inputText"
          placeholder="변환할 텍스트를 입력하세요..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        ></textarea>
        
        <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>문자 수: {{ inputText.length }}</span>
          <button
            @click="clearInput"
            class="text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            지우기
          </button>
        </div>
      </div>
      
      <!-- 변환 결과 영역 -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">변환 결과</h2>
        
        <div class="space-y-4">
          <!-- 대문자 변환 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">전체 대문자 (UPPERCASE)</h3>
              <button
                @click="copyToClipboard(upperCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ upperCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
          
          <!-- 소문자 변환 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">전체 소문자 (lowercase)</h3>
              <button
                @click="copyToClipboard(lowerCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ lowerCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
          
          <!-- 첫 글자만 대문자 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">첫 글자만 대문자 (Sentence case)</h3>
              <button
                @click="copyToClipboard(sentenceCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ sentenceCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
          
          <!-- 단어별 첫 글자 대문자 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">단어별 첫 글자 대문자 (Title Case)</h3>
              <button
                @click="copyToClipboard(titleCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ titleCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
          
          <!-- 교대로 대소문자 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">교대로 대소문자 (aLtErNaTiNg CaSe)</h3>
              <button
                @click="copyToClipboard(alternatingCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ alternatingCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
          
          <!-- 역순 대소문자 -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-700">역순 대소문자 (iNVERSE cASE)</h3>
              <button
                @click="copyToClipboard(inverseCase)"
                class="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
              >
                복사
              </button>
            </div>
            <div class="bg-gray-50 p-3 rounded border min-h-[60px] text-sm break-all">
              {{ inverseCase || '변환 결과가 여기에 표시됩니다' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 왼쪽 입력 영역에 변환할 텍스트를 입력하세요</li>
        <li>• 오른쪽에서 다양한 변환 결과를 실시간으로 확인할 수 있습니다</li>
        <li>• 각 변환 결과 옆의 "복사" 버튼을 클릭하여 클립보드에 복사할 수 있습니다</li>
        <li>• 한글, 영문, 숫자, 특수문자 모두 지원합니다</li>
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

const inputText = ref('')
const showCopySuccess = ref(false)

// 대문자 변환
const upperCase = computed(() => {
  return inputText.value.toUpperCase()
})

// 소문자 변환
const lowerCase = computed(() => {
  return inputText.value.toLowerCase()
})

// 첫 글자만 대문자 (Sentence case)
const sentenceCase = computed(() => {
  if (!inputText.value) return ''
  return inputText.value.charAt(0).toUpperCase() + inputText.value.slice(1).toLowerCase()
})

// 단어별 첫 글자 대문자 (Title Case)
const titleCase = computed(() => {
  if (!inputText.value) return ''
  return inputText.value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
})

// 교대로 대소문자 (aLtErNaTiNg CaSe)
const alternatingCase = computed(() => {
  if (!inputText.value) return ''
  return inputText.value
    .split('')
    .map((char, index) => {
      if (char.match(/[a-zA-Z]/)) {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      }
      return char
    })
    .join('')
})

// 역순 대소문자 (iNVERSE cASE)
const inverseCase = computed(() => {
  if (!inputText.value) return ''
  return inputText.value
    .split('')
    .map((char) => {
      if (char === char.toUpperCase() && char.match(/[a-zA-Z]/)) {
        return char.toLowerCase()
      } else if (char === char.toLowerCase() && char.match(/[a-zA-Z]/)) {
        return char.toUpperCase()
      }
      return char
    })
    .join('')
})

// 입력 텍스트 지우기
const clearInput = () => {
  inputText.value = ''
}

// 클립보드에 복사
const copyToClipboard = async (text: string) => {
  if (!text) return
  
  try {
    await navigator.clipboard.writeText(text)
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('복사 실패:', err)
    // 폴백: 텍스트 선택 방식
    const textArea = document.createElement('textarea')
    textArea.value = text
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
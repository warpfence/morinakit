<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">🖼 QR 코드 생성기</h1>
      <p class="text-lg text-gray-600">텍스트나 URL을 입력하면 QR 코드를 생성하고 다운로드할 수 있습니다</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 입력 및 설정 영역 -->
      <div class="space-y-6">
        <!-- 텍스트 입력 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">텍스트/URL 입력</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                v-model="inputText"
                placeholder="QR 코드로 변환할 텍스트나 URL을 입력하세요..."
                class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                @input="generateQRCode"
              ></textarea>
              <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>문자 수: {{ inputText.length }}</span>
                <button
                  @click="clearInput"
                  class="text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  지우기
                </button>
              </div>
            </div>
            
            <!-- 빠른 템플릿 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">빠른 템플릿</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="template in quickTemplates"
                  :key="template.name"
                  @click="useTemplate(template)"
                  class="p-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-left"
                >
                  <div class="font-medium">{{ template.name }}</div>
                  <div class="text-xs text-gray-500">{{ template.description }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- QR 코드 설정 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">QR 코드 설정</h2>
          
          <div class="space-y-4">
            <!-- 크기 설정 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                크기: {{ qrOptions.width }}px
              </label>
              <input
                v-model.number="qrOptions.width"
                type="range"
                min="128"
                max="512"
                step="32"
                class="w-full"
                @input="generateQRCode"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>
            
            <!-- 오류 수정 레벨 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">오류 수정 레벨</label>
              <select
                v-model="qrOptions.errorCorrectionLevel"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="generateQRCode"
              >
                <option value="L">낮음 (L) - 약 7%</option>
                <option value="M">보통 (M) - 약 15%</option>
                <option value="Q">높음 (Q) - 약 25%</option>
                <option value="H">최고 (H) - 약 30%</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">높을수록 손상에 강하지만 QR 코드가 복잡해집니다</p>
            </div>
            
            <!-- 색상 설정 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">전경색 (QR 코드)</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="qrOptions.color.dark"
                    type="color"
                    class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    @change="generateQRCode"
                  />
                  <input
                    v-model="qrOptions.color.dark"
                    type="text"
                    class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="generateQRCode"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">배경색</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="qrOptions.color.light"
                    type="color"
                    class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    @change="generateQRCode"
                  />
                  <input
                    v-model="qrOptions.color.light"
                    type="text"
                    class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="generateQRCode"
                  />
                </div>
              </div>
            </div>
            
            <!-- 여백 설정 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                여백: {{ qrOptions.margin }}
              </label>
              <input
                v-model.number="qrOptions.margin"
                type="range"
                min="0"
                max="10"
                step="1"
                class="w-full"
                @input="generateQRCode"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- QR 코드 미리보기 및 다운로드 -->
      <div class="space-y-6">
        <!-- QR 코드 미리보기 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">QR 코드 미리보기</h2>
          
          <div v-if="qrCodeDataURL" class="space-y-4">
            <!-- QR 코드 이미지 -->
            <div class="flex justify-center">
              <div class="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <img
                  :src="qrCodeDataURL"
                  :alt="inputText"
                  class="max-w-full h-auto"
                  :style="{ width: Math.min(qrOptions.width, 300) + 'px' }"
                />
              </div>
            </div>
            
            <!-- QR 코드 정보 -->
            <div class="space-y-2 text-sm">
              <div class="flex justify-between items-center py-1 border-b border-gray-100">
                <span class="text-gray-600">크기</span>
                <span class="font-medium">{{ qrOptions.width }} × {{ qrOptions.width }}px</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-100">
                <span class="text-gray-600">오류 수정</span>
                <span class="font-medium">{{ getErrorCorrectionLabel(qrOptions.errorCorrectionLevel) }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-100">
                <span class="text-gray-600">내용 길이</span>
                <span class="font-medium">{{ inputText.length }}자</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="text-gray-600">파일 형식</span>
                <span class="font-medium">PNG</span>
              </div>
            </div>
            
            <!-- 다운로드 버튼들 -->
            <div class="space-y-2">
              <button
                @click="downloadQRCode('png')"
                class="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                📥 PNG로 다운로드
              </button>
              <button
                @click="downloadQRCode('svg')"
                class="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                📥 SVG로 다운로드
              </button>
              <button
                @click="copyToClipboard"
                class="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
              >
                📋 이미지 복사
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">🖼</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">QR 코드 미리보기</h3>
            <p class="text-gray-600">텍스트를 입력하면 QR 코드가 생성됩니다</p>
          </div>
        </div>
        
        <!-- 사용 예시 -->
        <div v-if="inputText" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-3">📱 사용 방법</h3>
          <ul class="text-yellow-700 space-y-2 text-sm">
            <li>• 스마트폰 카메라나 QR 코드 스캐너 앱을 사용하세요</li>
            <li>• QR 코드를 화면에 맞춰 스캔하세요</li>
            <li v-if="isURL(inputText)">• 자동으로 웹사이트가 열립니다</li>
            <li v-else>• 입력한 텍스트가 표시됩니다</li>
            <li>• 인쇄해서 오프라인에서도 사용할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 텍스트나 URL을 입력하면 자동으로 QR 코드가 생성됩니다</li>
        <li>• 크기, 색상, 오류 수정 레벨 등을 자유롭게 조정할 수 있습니다</li>
        <li>• PNG 또는 SVG 형식으로 다운로드할 수 있습니다</li>
        <li>• 빠른 템플릿을 사용하여 자주 사용하는 형식을 쉽게 생성할 수 있습니다</li>
        <li>• 오류 수정 레벨이 높을수록 QR 코드가 손상되어도 읽을 수 있습니다</li>
        <li>• 생성된 QR 코드는 모든 QR 코드 스캐너에서 읽을 수 있습니다</li>
      </ul>
    </div>
    
    <!-- 복사/다운로드 성공 알림 -->
    <div
      v-if="showSuccessMessage"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    >
      ✅ {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import QRCode from 'qrcode'

const inputText = ref('')
const qrCodeDataURL = ref('')
const showSuccessMessage = ref(false)
const successMessage = ref('')

const qrOptions = reactive({
  width: 256,
  margin: 2,
  errorCorrectionLevel: 'M' as 'L' | 'M' | 'Q' | 'H',
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
})

// 빠른 템플릿
const quickTemplates = [
  {
    name: '웹사이트',
    description: 'https://example.com',
    content: 'https://example.com'
  },
  {
    name: '이메일',
    description: 'mailto:example@email.com',
    content: 'mailto:example@email.com'
  },
  {
    name: '전화번호',
    description: 'tel:010-1234-5678',
    content: 'tel:010-1234-5678'
  },
  {
    name: 'WiFi',
    description: 'WIFI:T:WPA;S:네트워크명;P:비밀번호;;',
    content: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;'
  },
  {
    name: 'SMS',
    description: 'sms:010-1234-5678',
    content: 'sms:010-1234-5678'
  },
  {
    name: '위치',
    description: 'geo:37.5665,126.9780',
    content: 'geo:37.5665,126.9780'
  }
]

// URL 여부 확인
const isURL = (text: string): boolean => {
  try {
    new URL(text)
    return true
  } catch {
    return text.startsWith('http://') || text.startsWith('https://')
  }
}

// 오류 수정 레벨 라벨
const getErrorCorrectionLabel = (level: string): string => {
  const labels = {
    'L': '낮음 (7%)',
    'M': '보통 (15%)',
    'Q': '높음 (25%)',
    'H': '최고 (30%)'
  }
  return labels[level as keyof typeof labels] || level
}

// QR 코드 생성
const generateQRCode = async () => {
  if (!inputText.value.trim()) {
    qrCodeDataURL.value = ''
    return
  }
  
  try {
    const options = {
      width: qrOptions.width,
      margin: qrOptions.margin,
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      color: {
        dark: qrOptions.color.dark,
        light: qrOptions.color.light
      }
    }
    
    const dataURL = await QRCode.toDataURL(inputText.value, options)
    qrCodeDataURL.value = dataURL
  } catch (error) {
    console.error('QR 코드 생성 실패:', error)
    qrCodeDataURL.value = ''
  }
}

// 템플릿 사용
const useTemplate = (template: any) => {
  inputText.value = template.content
  nextTick(() => {
    generateQRCode()
  })
}

// 입력 지우기
const clearInput = () => {
  inputText.value = ''
  qrCodeDataURL.value = ''
}

// QR 코드 다운로드
const downloadQRCode = async (format: 'png' | 'svg') => {
  if (!inputText.value.trim()) return
  
  try {
    const options = {
      width: qrOptions.width,
      margin: qrOptions.margin,
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      color: {
        dark: qrOptions.color.dark,
        light: qrOptions.color.light
      }
    }
    
    let data: string
    let mimeType: string
    let extension: string
    
    if (format === 'svg') {
      data = await QRCode.toString(inputText.value, { ...options, type: 'svg' })
      mimeType = 'image/svg+xml'
      extension = 'svg'
    } else {
      data = await QRCode.toDataURL(inputText.value, options)
      mimeType = 'image/png'
      extension = 'png'
    }
    
    // 파일 다운로드
    const link = document.createElement('a')
    if (format === 'svg') {
      const blob = new Blob([data], { type: mimeType })
      link.href = URL.createObjectURL(blob)
    } else {
      link.href = data
    }
    
    const fileName = `qrcode_${Date.now()}.${extension}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    if (format === 'svg') {
      URL.revokeObjectURL(link.href)
    }
    
    showSuccess(`${format.toUpperCase()} 파일이 다운로드되었습니다!`)
  } catch (error) {
    console.error('다운로드 실패:', error)
    showSuccess('다운로드에 실패했습니다.')
  }
}

// 클립보드에 복사
const copyToClipboard = async () => {
  if (!qrCodeDataURL.value) return
  
  try {
    // Data URL을 Blob으로 변환
    const response = await fetch(qrCodeDataURL.value)
    const blob = await response.blob()
    
    // 클립보드에 복사
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ])
    
    showSuccess('이미지가 클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('복사 실패:', error)
    // 폴백: Data URL을 텍스트로 복사
    try {
      await navigator.clipboard.writeText(qrCodeDataURL.value)
      showSuccess('이미지 데이터가 클립보드에 복사되었습니다!')
    } catch (fallbackError) {
      console.error('폴백 복사도 실패:', fallbackError)
      showSuccess('복사에 실패했습니다.')
    }
  }
}

// 성공 메시지 표시
const showSuccess = (message: string) => {
  successMessage.value = message
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}
</script> 
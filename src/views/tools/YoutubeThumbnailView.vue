<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">📹 유튜브 썸네일 추출기</h1>
      <p class="text-lg text-gray-600">유튜브 URL을 입력하면 다양한 해상도의 썸네일 이미지를 추출할 수 있습니다</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- URL 입력 영역 -->
      <div class="lg:col-span-1 space-y-6">
        <!-- URL 입력 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">유튜브 URL 입력</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">유튜브 URL</label>
              <input
                v-model="youtubeUrl"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                @input="extractVideoId"
              />
              <div class="mt-2 flex items-center justify-between text-sm">
                <span class="text-gray-500">
                  {{ youtubeUrl.length > 0 ? '✅ URL 입력됨' : '⏳ URL을 입력하세요' }}
                </span>
                <button
                  @click="clearUrl"
                  class="text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  지우기
                </button>
              </div>
            </div>
            
            <!-- 빠른 예시 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">빠른 예시</label>
              <div class="space-y-2">
                <button
                  v-for="example in exampleUrls"
                  :key="example.title"
                  @click="useExample(example.url)"
                  class="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div class="font-medium text-sm">{{ example.title }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ example.url }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 비디오 정보 -->
        <div v-if="videoId" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">비디오 정보</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">비디오 ID</span>
              <span class="font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">{{ videoId }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">URL 형식</span>
              <span class="font-medium text-green-600">✅ 유효함</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-600">썸네일 개수</span>
              <span class="font-medium">{{ thumbnailQualities.length }}개</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">최고 해상도</span>
              <span class="font-medium">1920×1080</span>
            </div>
          </div>
        </div>
        
        <!-- 사용법 안내 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
          <ul class="text-blue-700 space-y-2 text-sm">
            <li>• 유튜브 URL을 입력하면 자동으로 썸네일을 추출합니다</li>
            <li>• 다양한 해상도의 썸네일을 제공합니다</li>
            <li>• 원하는 해상도를 선택하여 다운로드할 수 있습니다</li>
            <li>• 모든 공개 유튜브 비디오에서 작동합니다</li>
          </ul>
        </div>
      </div>
      
      <!-- 썸네일 미리보기 영역 -->
      <div class="lg:col-span-2">
        <div v-if="videoId" class="space-y-6">
          <!-- 썸네일 그리드 -->
          <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-800">썸네일 미리보기</h2>
              <button
                @click="downloadAllThumbnails"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                📥 모두 다운로드
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="quality in thumbnailQualities"
                :key="quality.name"
                class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <!-- 썸네일 이미지 -->
                <div class="relative bg-gray-100">
                  <img
                    :src="getThumbnailUrl(quality.name)"
                    :alt="`${quality.label} 썸네일`"
                    class="w-full h-auto"
                    @load="onImageLoad(quality.name)"
                    @error="onImageError(quality.name)"
                  />
                  <div
                    v-if="imageLoadStates[quality.name] === 'loading'"
                    class="absolute inset-0 flex items-center justify-center bg-gray-200"
                  >
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                  <div
                    v-if="imageLoadStates[quality.name] === 'error'"
                    class="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500"
                  >
                    <div class="text-center">
                      <div class="text-2xl mb-2">❌</div>
                      <div class="text-sm">이미지 로드 실패</div>
                    </div>
                  </div>
                </div>
                
                <!-- 썸네일 정보 -->
                <div class="p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-gray-800">{{ quality.label }}</h3>
                    <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {{ quality.resolution }}
                    </span>
                  </div>
                  
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex justify-between">
                      <span>해상도</span>
                      <span>{{ quality.resolution }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>품질</span>
                      <span>{{ quality.description }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>상태</span>
                      <span
                        :class="{
                          'text-green-600': imageLoadStates[quality.name] === 'loaded',
                          'text-yellow-600': imageLoadStates[quality.name] === 'loading',
                          'text-red-600': imageLoadStates[quality.name] === 'error'
                        }"
                      >
                        {{
                          imageLoadStates[quality.name] === 'loaded' ? '✅ 사용 가능' :
                          imageLoadStates[quality.name] === 'loading' ? '⏳ 로딩 중' :
                          imageLoadStates[quality.name] === 'error' ? '❌ 사용 불가' : '⏳ 대기 중'
                        }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <button
                      @click="downloadThumbnail(quality.name, quality.label)"
                      :disabled="imageLoadStates[quality.name] !== 'loaded'"
                      class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
                    >
                      📥 다운로드
                    </button>
                    <button
                      @click="copyThumbnailUrl(quality.name)"
                      class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm"
                    >
                      📋 URL 복사
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 추가 정보 -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-yellow-800 mb-3">📋 썸네일 정보</h3>
            <div class="text-yellow-700 space-y-2 text-sm">
              <p>• <strong>기본 썸네일:</strong> 유튜브에서 자동 생성된 기본 썸네일입니다</p>
              <p>• <strong>고화질 썸네일:</strong> 더 선명하고 큰 해상도의 썸네일입니다</p>
              <p>• <strong>최대 해상도:</strong> 가장 높은 품질의 썸네일입니다 (업로더가 설정한 경우)</p>
              <p>• <strong>사용 권한:</strong> 썸네일 사용 시 저작권을 확인하시기 바랍니다</p>
            </div>
          </div>
        </div>
        
        <div v-else class="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
          <div class="text-6xl mb-4">📹</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">썸네일 미리보기</h3>
          <p class="text-gray-600">유튜브 URL을 입력하면 썸네일이 표시됩니다</p>
        </div>
      </div>
    </div>
    
    <!-- 성공 메시지 -->
    <div
      v-if="showSuccessMessage"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    >
      ✅ {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const youtubeUrl = ref('')
const videoId = ref('')
const showSuccessMessage = ref(false)
const successMessage = ref('')

// 이미지 로드 상태 관리
const imageLoadStates = reactive<Record<string, 'loading' | 'loaded' | 'error'>>({})

// 썸네일 품질 옵션
const thumbnailQualities = [
  {
    name: 'default',
    label: '기본 썸네일',
    resolution: '120×90',
    description: '기본 품질'
  },
  {
    name: 'mqdefault',
    label: '중간 품질',
    resolution: '320×180',
    description: '중간 품질'
  },
  {
    name: 'hqdefault',
    label: '고품질',
    resolution: '480×360',
    description: '고품질'
  },
  {
    name: 'sddefault',
    label: 'SD 품질',
    resolution: '640×480',
    description: '표준 화질'
  },
  {
    name: 'maxresdefault',
    label: '최고 품질',
    resolution: '1920×1080',
    description: '최고 화질'
  }
]

// 예시 URL
const exampleUrls = [
  {
    title: '인기 뮤직비디오',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    title: '교육 콘텐츠',
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
  },
  {
    title: '짧은 URL 형식',
    url: 'https://youtu.be/dQw4w9WgXcQ'
  }
]

// 유튜브 비디오 ID 추출
const extractVideoId = () => {
  const url = youtubeUrl.value.trim()
  if (!url) {
    videoId.value = ''
    return
  }
  
  // 다양한 유튜브 URL 형식 지원
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      videoId.value = match[1]
      // 모든 이미지 상태를 로딩으로 초기화
      thumbnailQualities.forEach(quality => {
        imageLoadStates[quality.name] = 'loading'
      })
      return
    }
  }
  
  videoId.value = ''
}

// 썸네일 URL 생성
const getThumbnailUrl = (quality: string): string => {
  if (!videoId.value) return ''
  return `https://img.youtube.com/vi/${videoId.value}/${quality}.jpg`
}

// 이미지 로드 성공
const onImageLoad = (quality: string) => {
  imageLoadStates[quality] = 'loaded'
}

// 이미지 로드 실패
const onImageError = (quality: string) => {
  imageLoadStates[quality] = 'error'
}

// 예시 URL 사용
const useExample = (url: string) => {
  youtubeUrl.value = url
  extractVideoId()
}

// URL 지우기
const clearUrl = () => {
  youtubeUrl.value = ''
  videoId.value = ''
  Object.keys(imageLoadStates).forEach(key => {
    delete imageLoadStates[key]
  })
}

// 썸네일 다운로드
const downloadThumbnail = async (quality: string, label: string) => {
  if (!videoId.value) return
  
  try {
    const url = getThumbnailUrl(quality)
    const response = await fetch(url)
    const blob = await response.blob()
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `youtube_thumbnail_${videoId.value}_${quality}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    
    showSuccess(`${label} 썸네일이 다운로드되었습니다!`)
  } catch (error) {
    console.error('다운로드 실패:', error)
    showSuccess('다운로드에 실패했습니다.')
  }
}

// 모든 썸네일 다운로드
const downloadAllThumbnails = async () => {
  if (!videoId.value) return
  
  let downloadCount = 0
  
  for (const quality of thumbnailQualities) {
    if (imageLoadStates[quality.name] === 'loaded') {
      try {
        const url = getThumbnailUrl(quality.name)
        const response = await fetch(url)
        const blob = await response.blob()
        
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `youtube_thumbnail_${videoId.value}_${quality.name}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
        
        downloadCount++
        
        // 다운로드 간 짧은 지연
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`${quality.label} 다운로드 실패:`, error)
      }
    }
  }
  
  if (downloadCount > 0) {
    showSuccess(`${downloadCount}개의 썸네일이 다운로드되었습니다!`)
  } else {
    showSuccess('다운로드할 수 있는 썸네일이 없습니다.')
  }
}

// 썸네일 URL 복사
const copyThumbnailUrl = async (quality: string) => {
  if (!videoId.value) return
  
  try {
    const url = getThumbnailUrl(quality)
    await navigator.clipboard.writeText(url)
    showSuccess('썸네일 URL이 클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('복사 실패:', error)
    showSuccess('URL 복사에 실패했습니다.')
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
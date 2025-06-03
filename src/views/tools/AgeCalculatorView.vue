<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">🎂 만 나이 계산기</h1>
      <p class="text-lg text-gray-600">생년월일을 입력하면 정확한 만 나이와 상세 정보를 계산</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 입력 영역 -->
      <div class="space-y-6">
        <!-- 생년월일 입력 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">생년월일 입력</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
              <input
                v-model="birthDate"
                type="date"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <!-- 기준 날짜 설정 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">기준 날짜 (선택사항)</label>
              <input
                v-model="referenceDate"
                type="date"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">기본값: 오늘 날짜</p>
            </div>
            
            <!-- 빠른 설정 버튼들 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">빠른 설정</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="setToday"
                  class="p-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                >
                  📅 오늘 기준
                </button>
                <button
                  @click="setBirthday"
                  class="p-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
                >
                  🎂 생일 기준
                </button>
                <button
                  @click="setNewYear"
                  class="p-2 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200"
                >
                  🎆 신정 기준
                </button>
                <button
                  @click="clearDates"
                  class="p-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  🗑️ 초기화
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 만 나이 결과 -->
        <div v-if="birthDate" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">만 나이 계산 결과</h2>
          
          <div class="space-y-4">
            <!-- 메인 결과 -->
            <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div class="text-sm text-gray-600 mb-2">
                {{ formatDate(new Date(birthDate)) }} 출생
              </div>
              <div class="text-5xl font-bold text-blue-600 mb-2">
                {{ ageInfo.years }}세
              </div>
              <div class="text-sm text-gray-600">
                {{ formatDate(new Date(referenceDate)) }} 기준
              </div>
            </div>
            
            <!-- 상세 나이 정보 -->
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">만 나이</span>
                <span class="font-medium text-blue-600">{{ ageInfo.years }}세</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">개월 수</span>
                <span class="font-medium">{{ ageInfo.totalMonths }}개월</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">일 수</span>
                <span class="font-medium">{{ ageInfo.totalDays.toLocaleString() }}일</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">시간 수</span>
                <span class="font-medium">{{ ageInfo.totalHours.toLocaleString() }}시간</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">분 수</span>
                <span class="font-medium">{{ ageInfo.totalMinutes.toLocaleString() }}분</span>
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
      </div>
      
      <!-- 추가 정보 영역 -->
      <div class="space-y-6">
        <!-- 생일 정보 -->
        <div v-if="birthDate" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">생일 정보</h2>
          
          <div class="space-y-4">
            <!-- 다음 생일까지 -->
            <div class="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div class="text-lg font-semibold text-green-700 mb-2">다음 생일까지</div>
              <div class="text-3xl font-bold text-green-600 mb-1">
                {{ birthdayInfo.daysUntilBirthday }}일
              </div>
              <div class="text-sm text-gray-600">
                {{ birthdayInfo.nextBirthdayDate }}
              </div>
            </div>
            
            <!-- 생일 상세 정보 -->
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">올해 생일</span>
                <span class="font-medium">{{ birthdayInfo.thisYearBirthday }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">생일 요일</span>
                <span class="font-medium">{{ birthdayInfo.birthdayWeekday }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">생일 지남 여부</span>
                <span class="font-medium">
                  {{ birthdayInfo.hasBirthdayPassed ? '🎉 지남' : '⏳ 아직' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">다음 생일 나이</span>
                <span class="font-medium">{{ birthdayInfo.nextAge }}세</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 생애 통계 -->
        <div v-if="birthDate" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">생애 통계</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-red-50 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{{ lifeStats.heartbeats.toLocaleString() }}</div>
              <div class="text-xs text-red-700">심장 박동 수</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ lifeStats.breaths.toLocaleString() }}</div>
              <div class="text-xs text-blue-700">호흡 횟수</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ lifeStats.sleepHours.toLocaleString() }}</div>
              <div class="text-xs text-green-700">수면 시간</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ lifeStats.meals.toLocaleString() }}</div>
              <div class="text-xs text-purple-700">식사 횟수</div>
            </div>
          </div>
        </div>
        
        <!-- 세대 정보 -->
        <div v-if="birthDate" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-3">🏷️ 세대 정보</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-yellow-700">출생 세대</span>
              <span class="font-medium text-yellow-800">{{ generationInfo.name }}</span>
            </div>
            <p class="text-yellow-700 text-sm">{{ generationInfo.description }}</p>
          </div>
        </div>
        
        <!-- 빈 상태 -->
        <div v-else class="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
          <div class="text-6xl mb-4">🎂</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">생년월일을 입력하세요</h3>
          <p class="text-gray-600">정확한 만 나이와 상세 정보를 확인할 수 있습니다</p>
        </div>
      </div>
    </div>
    
    <!-- 사용법 안내 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
      <ul class="text-blue-700 space-y-2 text-sm">
        <li>• 생년월일을 입력하면 현재 날짜 기준으로 만 나이를 계산합니다</li>
        <li>• 기준 날짜를 설정하여 특정 날짜 기준으로도 계산할 수 있습니다</li>
        <li>• 만 나이뿐만 아니라 개월 수, 일 수, 시간 수까지 상세하게 확인할 수 있습니다</li>
        <li>• 다음 생일까지 남은 일수와 생일 관련 정보를 제공합니다</li>
        <li>• 심장 박동 수, 호흡 횟수 등 재미있는 생애 통계를 확인할 수 있습니다</li>
        <li>• 출생 연도에 따른 세대 정보도 함께 제공됩니다</li>
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

const birthDate = ref('')
const referenceDate = ref(new Date().toISOString().split('T')[0])
const showCopySuccess = ref(false)

// 만 나이 계산
const ageInfo = computed(() => {
  if (!birthDate.value) return { years: 0, totalMonths: 0, totalDays: 0, totalHours: 0, totalMinutes: 0 }
  
  const birth = new Date(birthDate.value)
  const reference = new Date(referenceDate.value)
  
  // 만 나이 계산
  let years = reference.getFullYear() - birth.getFullYear()
  const monthDiff = reference.getMonth() - birth.getMonth()
  const dayDiff = reference.getDate() - birth.getDate()
  
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--
  }
  
  // 총 개월 수 계산
  const totalMonths = (reference.getFullYear() - birth.getFullYear()) * 12 + (reference.getMonth() - birth.getMonth())
  
  // 총 일 수 계산
  const timeDiff = reference.getTime() - birth.getTime()
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const totalHours = Math.floor(timeDiff / (1000 * 60 * 60))
  const totalMinutes = Math.floor(timeDiff / (1000 * 60))
  
  return {
    years: Math.max(0, years),
    totalMonths: Math.max(0, totalMonths),
    totalDays: Math.max(0, totalDays),
    totalHours: Math.max(0, totalHours),
    totalMinutes: Math.max(0, totalMinutes)
  }
})

// 생일 정보
const birthdayInfo = computed(() => {
  if (!birthDate.value) return {
    daysUntilBirthday: 0,
    nextBirthdayDate: '',
    thisYearBirthday: '',
    birthdayWeekday: '',
    hasBirthdayPassed: false,
    nextAge: 0
  }
  
  const birth = new Date(birthDate.value)
  const reference = new Date(referenceDate.value)
  
  // 올해 생일
  const thisYearBirthday = new Date(reference.getFullYear(), birth.getMonth(), birth.getDate())
  
  // 생일이 지났는지 확인
  const hasBirthdayPassed = reference >= thisYearBirthday
  
  // 다음 생일 계산
  const nextBirthday = hasBirthdayPassed 
    ? new Date(reference.getFullYear() + 1, birth.getMonth(), birth.getDate())
    : thisYearBirthday
  
  // 다음 생일까지 남은 일수
  const timeDiff = nextBirthday.getTime() - reference.getTime()
  const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  
  // 생일 요일
  const birthdayWeekday = getWeekday(birth)
  
  // 다음 생일 나이
  const nextAge = nextBirthday.getFullYear() - birth.getFullYear()
  
  return {
    daysUntilBirthday,
    nextBirthdayDate: formatDate(nextBirthday),
    thisYearBirthday: formatDate(thisYearBirthday),
    birthdayWeekday,
    hasBirthdayPassed,
    nextAge
  }
})

// 생애 통계 (재미있는 추정치)
const lifeStats = computed(() => {
  if (!birthDate.value) return { heartbeats: 0, breaths: 0, sleepHours: 0, meals: 0 }
  
  const days = ageInfo.value.totalDays
  
  return {
    heartbeats: Math.floor(days * 24 * 60 * 70), // 분당 70회
    breaths: Math.floor(days * 24 * 60 * 15), // 분당 15회
    sleepHours: Math.floor(days * 8), // 하루 8시간
    meals: Math.floor(days * 3) // 하루 3끼
  }
})

// 세대 정보
const generationInfo = computed(() => {
  if (!birthDate.value) return { name: '', description: '' }
  
  const birthYear = new Date(birthDate.value).getFullYear()
  
  if (birthYear >= 2010) {
    return { name: 'Z세대 (알파세대)', description: '디지털 네이티브, 모바일과 소셜미디어에 익숙한 세대' }
  } else if (birthYear >= 1997) {
    return { name: 'Z세대', description: '진정한 디지털 네이티브, 다양성과 개성을 중시하는 세대' }
  } else if (birthYear >= 1981) {
    return { name: '밀레니얼 세대', description: '인터넷과 함께 성장한 세대, 워라밸을 중시' }
  } else if (birthYear >= 1965) {
    return { name: 'X세대', description: '아날로그와 디지털을 모두 경험한 세대' }
  } else if (birthYear >= 1946) {
    return { name: '베이비붐 세대', description: '전후 경제성장을 이끈 세대' }
  } else {
    return { name: '침묵 세대', description: '전쟁과 어려움을 겪은 세대' }
  }
})

// 요일 계산
const getWeekday = (date: Date): string => {
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return weekdays[date.getDay()]
}

// 날짜 포맷팅
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 빠른 설정 함수들
const setToday = () => {
  referenceDate.value = new Date().toISOString().split('T')[0]
}

const setBirthday = () => {
  if (birthDate.value) {
    const birth = new Date(birthDate.value)
    const today = new Date()
    const thisYearBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    referenceDate.value = thisYearBirthday.toISOString().split('T')[0]
  }
}

const setNewYear = () => {
  const newYear = new Date()
  newYear.setMonth(0, 1) // 1월 1일
  referenceDate.value = newYear.toISOString().split('T')[0]
}

const clearDates = () => {
  birthDate.value = ''
  referenceDate.value = new Date().toISOString().split('T')[0]
}

// 결과 복사
const copyResult = async () => {
  if (!birthDate.value) return
  
  const result = `만 나이 계산 결과
생년월일: ${formatDate(new Date(birthDate.value))}
기준 날짜: ${formatDate(new Date(referenceDate.value))}
만 나이: ${ageInfo.value.years}세
총 개월 수: ${ageInfo.value.totalMonths}개월
총 일 수: ${ageInfo.value.totalDays.toLocaleString()}일
다음 생일까지: ${birthdayInfo.value.daysUntilBirthday}일
세대: ${generationInfo.value.name}`
  
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
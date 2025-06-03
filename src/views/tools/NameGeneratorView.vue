<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">🎲 랜덤 이름 생성기</h1>
      <p class="text-lg text-gray-600">다양한 카테고리의 랜덤 이름을 생성하고 원하는 조건으로 필터링할 수 있습니다</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 설정 영역 -->
      <div class="lg:col-span-1 space-y-6">
        <!-- 카테고리 선택 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">카테고리 선택</h2>
          
          <div class="space-y-3">
            <div
              v-for="category in categories"
              :key="category.id"
              class="flex items-center"
            >
              <input
                :id="category.id"
                v-model="selectedCategory"
                :value="category.id"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                @change="generateNames"
              />
              <label
                :for="category.id"
                class="ml-3 flex-1 cursor-pointer"
              >
                <div class="font-medium text-gray-800">{{ category.name }}</div>
                <div class="text-sm text-gray-500">{{ category.description }}</div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- 옵션 설정 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">생성 옵션</h2>
          
          <div class="space-y-4">
            <!-- 성별 선택 (한국어/영어 이름만) -->
            <div v-if="['korean', 'english'].includes(selectedCategory)">
              <label class="block text-sm font-medium text-gray-700 mb-2">성별</label>
              <div class="flex gap-2">
                <button
                  v-for="gender in genderOptions"
                  :key="gender.value"
                  @click="selectedGender = gender.value; generateNames()"
                  :class="[
                    'flex-1 px-3 py-2 rounded-lg text-sm transition-colors duration-200',
                    selectedGender === gender.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ gender.label }}
                </button>
              </div>
            </div>
            
            <!-- 생성 개수 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                생성 개수: {{ generateCount }}개
              </label>
              <input
                v-model.number="generateCount"
                type="range"
                min="1"
                max="20"
                step="1"
                class="w-full"
                @input="generateNames"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1개</span>
                <span>20개</span>
              </div>
            </div>
            
            <!-- 길이 설정 (닉네임/사용자명만) -->
            <div v-if="['nickname', 'username'].includes(selectedCategory)">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                길이: {{ nameLength.min }}-{{ nameLength.max }}자
              </label>
              <div class="space-y-2">
                <div>
                  <label class="text-xs text-gray-600">최소 길이: {{ nameLength.min }}</label>
                  <input
                    v-model.number="nameLength.min"
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    class="w-full"
                    @input="generateNames"
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-600">최대 길이: {{ nameLength.max }}</label>
                  <input
                    v-model.number="nameLength.max"
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    class="w-full"
                    @input="generateNames"
                  />
                </div>
              </div>
            </div>
            
            <!-- 특수 옵션 -->
            <div v-if="selectedCategory === 'username'">
              <label class="block text-sm font-medium text-gray-700 mb-2">특수 옵션</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="includeNumbers"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    @change="generateNames"
                  />
                  <span class="ml-2 text-sm text-gray-700">숫자 포함</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="includeSpecialChars"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    @change="generateNames"
                  />
                  <span class="ml-2 text-sm text-gray-700">특수문자 포함 (_-)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 생성 버튼 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <button
            @click="generateNames"
            class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
          >
            🎲 새로운 이름 생성
          </button>
          
          <div class="mt-4 text-center">
            <button
              @click="copyAllNames"
              :disabled="generatedNames.length === 0"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
            >
              📋 모든 이름 복사
            </button>
          </div>
        </div>
        
        <!-- 사용법 안내 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 사용법</h3>
          <ul class="text-blue-700 space-y-2 text-sm">
            <li>• 원하는 카테고리를 선택하세요</li>
            <li>• 성별, 길이 등의 옵션을 설정하세요</li>
            <li>• 생성 버튼을 클릭하여 랜덤 이름을 만드세요</li>
            <li>• 개별 이름을 클릭하여 복사할 수 있습니다</li>
            <li>• 마음에 드는 이름을 즐겨찾기에 추가하세요</li>
          </ul>
        </div>
      </div>
      
      <!-- 결과 영역 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 생성된 이름들 -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-800">
              생성된 이름 ({{ generatedNames.length }}개)
            </h2>
            <div class="flex gap-2">
              <button
                @click="shuffleNames"
                :disabled="generatedNames.length === 0"
                class="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
              >
                🔀 섞기
              </button>
              <button
                @click="clearFavorites"
                :disabled="favoriteNames.length === 0"
                class="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
              >
                🗑 즐겨찾기 초기화
              </button>
            </div>
          </div>
          
          <div v-if="generatedNames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="(name, index) in generatedNames"
              :key="`${name}-${index}`"
              class="group relative p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              @click="copyName(name)"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {{ name }}
                </span>
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click.stop="toggleFavorite(name)"
                    :class="[
                      'p-1 rounded transition-colors duration-200',
                      favoriteNames.includes(name)
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-yellow-500'
                    ]"
                  >
                    ⭐
                  </button>
                  <button
                    @click.stop="copyName(name)"
                    class="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    📋
                  </button>
                </div>
              </div>
              
              <!-- 복사 힌트 -->
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                클릭하여 복사
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">🎲</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">이름을 생성해보세요</h3>
            <p class="text-gray-600">카테고리를 선택하고 생성 버튼을 클릭하세요</p>
          </div>
        </div>
        
        <!-- 즐겨찾기 -->
        <div v-if="favoriteNames.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-4">⭐ 즐겨찾기 ({{ favoriteNames.length }}개)</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="name in favoriteNames"
              :key="`fav-${name}`"
              class="group relative p-3 bg-white border border-yellow-300 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
              @click="copyName(name)"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-800 group-hover:text-yellow-600 transition-colors duration-200">
                  {{ name }}
                </span>
                <button
                  @click.stop="toggleFavorite(name)"
                  class="p-1 text-yellow-500 hover:text-red-500 transition-colors duration-200"
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
          
          <div class="mt-4 text-center">
            <button
              @click="copyFavoriteNames"
              class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              📋 즐겨찾기 모두 복사
            </button>
          </div>
        </div>
        
        <!-- 통계 정보 -->
        <div v-if="generatedNames.length > 0" class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">📊 생성 통계</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <div class="text-2xl font-bold text-blue-600">{{ generatedNames.length }}</div>
              <div class="text-sm text-gray-600">생성된 이름</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <div class="text-2xl font-bold text-yellow-600">{{ favoriteNames.length }}</div>
              <div class="text-sm text-gray-600">즐겨찾기</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <div class="text-2xl font-bold text-green-600">{{ averageLength }}</div>
              <div class="text-sm text-gray-600">평균 길이</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <div class="text-2xl font-bold text-purple-600">{{ uniqueNames }}</div>
              <div class="text-sm text-gray-600">고유 이름</div>
            </div>
          </div>
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
import { ref, computed, onMounted } from 'vue'

const selectedCategory = ref('korean')
const selectedGender = ref('all')
const generateCount = ref(10)
const nameLength = ref({ min: 5, max: 10 })
const includeNumbers = ref(false)
const includeSpecialChars = ref(false)
const generatedNames = ref<string[]>([])
const favoriteNames = ref<string[]>([])
const showSuccessMessage = ref(false)
const successMessage = ref('')

// 카테고리 정의
const categories = [
  {
    id: 'korean',
    name: '한국어 이름',
    description: '전통적인 한국 이름'
  },
  {
    id: 'english',
    name: '영어 이름',
    description: '서양식 이름'
  },
  {
    id: 'nickname',
    name: '닉네임',
    description: '게임/SNS용 닉네임'
  },
  {
    id: 'username',
    name: '사용자명',
    description: '계정용 사용자명'
  },
  {
    id: 'fantasy',
    name: '판타지 이름',
    description: '판타지 캐릭터 이름'
  }
]

// 성별 옵션
const genderOptions = [
  { value: 'all', label: '전체' },
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' }
]

// 이름 데이터
const nameData = {
  korean: {
    male: {
      surnames: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '전'],
      names: ['민준', '서준', '도윤', '예준', '시우', '하준', '주원', '지호', '지후', '준서', '준우', '현우', '도현', '건우', '우진', '선우', '서진', '민성', '현준', '연우']
    },
    female: {
      surnames: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '전'],
      names: ['서연', '서윤', '지우', '서현', '민서', '하은', '하윤', '윤서', '지민', '지유', '채원', '지원', '예은', '소율', '수아', '시은', '예린', '다은', '은서', '채은']
    }
  },
  english: {
    male: ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle']
  },
  nickname: {
    prefixes: ['Cool', 'Super', 'Mega', 'Ultra', 'Epic', 'Awesome', 'Amazing', 'Fantastic', 'Incredible', 'Legendary', 'Mystic', 'Shadow', 'Fire', 'Ice', 'Storm', 'Thunder', 'Lightning', 'Star', 'Moon', 'Sun'],
    suffixes: ['Master', 'Hero', 'Legend', 'King', 'Queen', 'Warrior', 'Knight', 'Ninja', 'Dragon', 'Phoenix', 'Tiger', 'Wolf', 'Eagle', 'Lion', 'Bear', 'Fox', 'Hawk', 'Shark', 'Viper', 'Falcon']
  },
  username: {
    words: ['tech', 'code', 'dev', 'pro', 'user', 'player', 'gamer', 'ninja', 'master', 'expert', 'wizard', 'genius', 'creator', 'builder', 'maker', 'designer', 'artist', 'writer', 'thinker', 'dreamer']
  },
  fantasy: {
    prefixes: ['Aer', 'Ael', 'Ara', 'Dae', 'Eld', 'Fae', 'Gal', 'Hal', 'Ith', 'Jor', 'Kel', 'Lyr', 'Mor', 'Nal', 'Oth', 'Pyr', 'Quin', 'Ral', 'Syl', 'Thal'],
    suffixes: ['ion', 'wen', 'dor', 'mir', 'ath', 'iel', 'orn', 'wyn', 'eth', 'ara', 'iel', 'oth', 'uin', 'ael', 'ith', 'orn', 'wyn', 'eth', 'ara', 'ion']
  }
}

// 통계 계산
const averageLength = computed(() => {
  if (generatedNames.value.length === 0) return 0
  const total = generatedNames.value.reduce((sum, name) => sum + name.length, 0)
  return Math.round(total / generatedNames.value.length)
})

const uniqueNames = computed(() => {
  return new Set(generatedNames.value).size
})

// 이름 생성 함수들
const generateKoreanName = (): string => {
  const data = nameData.korean
  let surnames: string[], names: string[]
  
  if (selectedGender.value === 'male') {
    surnames = data.male.surnames
    names = data.male.names
  } else if (selectedGender.value === 'female') {
    surnames = data.female.surnames
    names = data.female.names
  } else {
    // 전체: 남성/여성 이름 모두 사용
    surnames = [...data.male.surnames, ...data.female.surnames]
    names = [...data.male.names, ...data.female.names]
  }
  
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  return surname + name
}

const generateEnglishName = (): string => {
  const data = nameData.english
  let names: string[]
  
  if (selectedGender.value === 'male') {
    names = data.male
  } else if (selectedGender.value === 'female') {
    names = data.female
  } else {
    names = [...data.male, ...data.female]
  }
  
  return names[Math.floor(Math.random() * names.length)]
}

const generateNickname = (): string => {
  const data = nameData.nickname
  const prefix = data.prefixes[Math.floor(Math.random() * data.prefixes.length)]
  const suffix = data.suffixes[Math.floor(Math.random() * data.suffixes.length)]
  
  let nickname = prefix + suffix
  
  // 길이 조정
  while (nickname.length < nameLength.value.min || nickname.length > nameLength.value.max) {
    const newPrefix = data.prefixes[Math.floor(Math.random() * data.prefixes.length)]
    const newSuffix = data.suffixes[Math.floor(Math.random() * data.suffixes.length)]
    nickname = newPrefix + newSuffix
  }
  
  return nickname
}

const generateUsername = (): string => {
  const data = nameData.username
  const word = data.words[Math.floor(Math.random() * data.words.length)]
  
  let username = word
  
  // 숫자 추가
  if (includeNumbers.value) {
    const numbers = Math.floor(Math.random() * 9999).toString().padStart(2, '0')
    username += numbers
  }
  
  // 특수문자 추가
  if (includeSpecialChars.value) {
    const chars = ['_', '-']
    const char = chars[Math.floor(Math.random() * chars.length)]
    const position = Math.random() > 0.5 ? 'before' : 'after'
    
    if (position === 'before') {
      username = char + username
    } else {
      username = username + char
    }
  }
  
  // 길이 조정
  while (username.length < nameLength.value.min) {
    username += Math.floor(Math.random() * 10).toString()
  }
  
  if (username.length > nameLength.value.max) {
    username = username.substring(0, nameLength.value.max)
  }
  
  return username
}

const generateFantasyName = (): string => {
  const data = nameData.fantasy
  const prefix = data.prefixes[Math.floor(Math.random() * data.prefixes.length)]
  const suffix = data.suffixes[Math.floor(Math.random() * data.suffixes.length)]
  
  return prefix + suffix
}

// 메인 생성 함수
const generateNames = () => {
  const names: string[] = []
  
  for (let i = 0; i < generateCount.value; i++) {
    let name = ''
    
    switch (selectedCategory.value) {
      case 'korean':
        name = generateKoreanName()
        break
      case 'english':
        name = generateEnglishName()
        break
      case 'nickname':
        name = generateNickname()
        break
      case 'username':
        name = generateUsername()
        break
      case 'fantasy':
        name = generateFantasyName()
        break
    }
    
    if (name) {
      names.push(name)
    }
  }
  
  generatedNames.value = names
}

// 유틸리티 함수들
const shuffleNames = () => {
  const shuffled = [...generatedNames.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  generatedNames.value = shuffled
}

const copyName = async (name: string) => {
  try {
    await navigator.clipboard.writeText(name)
    showSuccess(`"${name}"이 클립보드에 복사되었습니다!`)
  } catch (error) {
    console.error('복사 실패:', error)
    showSuccess('복사에 실패했습니다.')
  }
}

const copyAllNames = async () => {
  if (generatedNames.value.length === 0) return
  
  try {
    const text = generatedNames.value.join('\n')
    await navigator.clipboard.writeText(text)
    showSuccess(`${generatedNames.value.length}개의 이름이 클립보드에 복사되었습니다!`)
  } catch (error) {
    console.error('복사 실패:', error)
    showSuccess('복사에 실패했습니다.')
  }
}

const copyFavoriteNames = async () => {
  if (favoriteNames.value.length === 0) return
  
  try {
    const text = favoriteNames.value.join('\n')
    await navigator.clipboard.writeText(text)
    showSuccess(`${favoriteNames.value.length}개의 즐겨찾기가 클립보드에 복사되었습니다!`)
  } catch (error) {
    console.error('복사 실패:', error)
    showSuccess('복사에 실패했습니다.')
  }
}

const toggleFavorite = (name: string) => {
  const index = favoriteNames.value.indexOf(name)
  if (index > -1) {
    favoriteNames.value.splice(index, 1)
    showSuccess(`"${name}"을 즐겨찾기에서 제거했습니다.`)
  } else {
    favoriteNames.value.push(name)
    showSuccess(`"${name}"을 즐겨찾기에 추가했습니다!`)
  }
  
  // 로컬 스토리지에 저장
  localStorage.setItem('randomNameFavorites', JSON.stringify(favoriteNames.value))
}

const clearFavorites = () => {
  favoriteNames.value = []
  localStorage.removeItem('randomNameFavorites')
  showSuccess('즐겨찾기가 초기화되었습니다.')
}

// 성공 메시지 표시
const showSuccess = (message: string) => {
  successMessage.value = message
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  // 즐겨찾기 로드
  const saved = localStorage.getItem('randomNameFavorites')
  if (saved) {
    try {
      favoriteNames.value = JSON.parse(saved)
    } catch (error) {
      console.error('즐겨찾기 로드 실패:', error)
    }
  }
  
  // 초기 이름 생성
  generateNames()
})
</script> 
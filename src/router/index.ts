import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'MorinaKit - 일상 유틸리티 도구',
        description: '날짜 계산기, 유튜브 썸네일 추출기 등 일상생활에 필요한 유틸리티 도구들'
      }
    },
    // 텍스트 도구들
    {
      path: '/text/case-converter',
      name: 'case-converter',
      component: () => import('@/views/tools/CaseConverterView.vue'),
      meta: {
        title: '대소문자 변환기 - MorinaKit',
        description: '텍스트의 대소문자를 다양한 방식으로 변환하는 도구',
        category: 'text',
        layout: 'tool'
      }
    },
    {
      path: '/text/word-counter',
      name: 'word-counter',
      component: () => import('@/views/tools/WordCounterView.vue'),
      meta: {
        title: '단어/문자 수 세기 - MorinaKit',
        description: '입력된 텍스트의 단어 수, 문자 수를 실시간으로 계산',
        category: 'text',
        layout: 'tool'
      }
    },
    // 날짜/시간 도구들
    {
      path: '/date/calculator',
      name: 'date-calculator',
      component: () => import('@/views/tools/DateCalculatorView.vue'),
      meta: {
        title: '날짜 계산기 - MorinaKit',
        description: '특정 날짜로부터 며칠 뒤 또는 며칠 전의 날짜를 계산',
        category: 'date',
        layout: 'tool'
      }
    },
    {
      path: '/date/dday',
      name: 'dday-calculator',
      component: () => import('@/views/tools/DdayCalculatorView.vue'),
      meta: {
        title: 'D-Day 계산기 - MorinaKit',
        description: '중요한 일정까지의 남은 시간을 실시간으로 카운트다운',
        category: 'date',
        layout: 'tool'
      }
    },
    {
      path: '/date/weekday',
      name: 'weekday-calculator',
      component: () => import('@/views/tools/WeekdayCalculatorView.vue'),
      meta: {
        title: '요일 계산기 - MorinaKit',
        description: '과거나 미래의 특정 날짜가 무슨 요일인지 계산',
        category: 'date',
        layout: 'tool'
      }
    },
    {
      path: '/date/age',
      name: 'age-calculator',
      component: () => import('@/views/tools/AgeCalculatorView.vue'),
      meta: {
        title: '만 나이 계산기 - MorinaKit',
        description: '생년월일을 입력하면 정확한 만 나이를 계산',
        category: 'date',
        layout: 'tool'
      }
    },
    // 이미지 도구들
    {
      path: '/image/qr-generator',
      name: 'qr-generator',
      component: () => import('@/views/tools/QrGeneratorView.vue'),
      meta: {
        title: 'QR 코드 생성기 - MorinaKit',
        description: '텍스트나 URL을 입력하면 QR 코드를 생성하고 다운로드 제공',
        category: 'image',
        layout: 'tool'
      }
    },
    // 유튜브 도구들
    {
      path: '/youtube/thumbnail',
      name: 'youtube-thumbnail',
      component: () => import('@/views/tools/YoutubeThumbnailView.vue'),
      meta: {
        title: '유튜브 썸네일 추출기 - MorinaKit',
        description: '유튜브 URL을 입력하면 다양한 해상도의 썸네일 이미지를 추출',
        category: 'youtube',
        layout: 'tool'
      }
    },
    // 404 페이지
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '페이지를 찾을 수 없습니다 - MorinaKit',
        description: '요청하신 페이지를 찾을 수 없습니다.'
      }
    }
  ]
})

// 라우트 가드 - 페이지 타이틀 설정
router.beforeEach((to, from, next) => {
  // 페이지 타이틀 설정
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 메타 description 설정
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string)
    }
  }
  
  next()
})

// 라우트 변경 후 스크롤 맨 위로 이동
router.afterEach(() => {
  // 다음 틱에서 스크롤 이동 (DOM 업데이트 후)
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, 0)
})

export default router 
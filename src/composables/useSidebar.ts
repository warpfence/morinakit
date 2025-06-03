import { ref, readonly } from 'vue'

// 전역 사이드바 상태 (모바일에서는 기본적으로 닫힌 상태)
const isSidebarOpen = ref(false)

export function useSidebar() {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  // 화면 크기 변경 시 데스크톱에서는 자동으로 열기, 모바일에서는 닫기
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      // 데스크톱에서는 항상 열린 상태 (CSS로 제어)
      isSidebarOpen.value = false
    } else {
      // 모바일에서는 기본적으로 닫힌 상태
      isSidebarOpen.value = false
    }
  }

  return {
    isSidebarOpen: readonly(isSidebarOpen),
    toggleSidebar,
    openSidebar,
    closeSidebar,
    handleResize
  }
} 
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 헤더 -->
    <AppHeader />
    
    <!-- 메인 컨텐츠 영역 -->
    <div class="flex flex-1">
      <!-- 좌측 네비게이션바 -->
      <LeftSidebar />
      
      <!-- 메인 컨텐츠 -->
      <main class="flex-1 container mx-auto px-4 py-8">
        <slot />
      </main>
    </div>
    
    <!-- 푸터 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import LeftSidebar from './LeftSidebar.vue'
</script> 
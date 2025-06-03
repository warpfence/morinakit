<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <div class="animate-bounce-gentle text-6xl mb-8">🔍</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
      <p class="text-lg text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      
      <div class="space-y-4">
        <router-link 
          to="/" 
          class="btn-primary inline-block"
        >
          홈으로 돌아가기
        </router-link>
        
        <div class="text-sm text-gray-500">
          또는 아래 도구들을 사용해보세요
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
          <router-link 
            to="/text/case-converter" 
            class="card-hover text-center p-3"
          >
            <div class="text-2xl mb-1">📄</div>
            <div class="text-sm font-medium">대소문자 변환</div>
          </router-link>
          
          <router-link 
            to="/date/calculator" 
            class="card-hover text-center p-3"
          >
            <div class="text-2xl mb-1">🕒</div>
            <div class="text-sm font-medium">날짜 계산</div>
          </router-link>
          
          <router-link 
            to="/image/qr-generator" 
            class="card-hover text-center p-3"
          >
            <div class="text-2xl mb-1">🔗</div>
            <div class="text-sm font-medium">QR 코드</div>
          </router-link>
          
          <router-link 
            to="/youtube/thumbnail" 
            class="card-hover text-center p-3"
          >
            <div class="text-2xl mb-1">📹</div>
            <div class="text-sm font-medium">유튜브 썸네일</div>
          </router-link>
          
          <router-link 
            to="/text/word-counter" 
            class="card-hover text-center p-3"
          >
            <div class="text-2xl mb-1">📊</div>
            <div class="text-sm font-medium">글자 수 세기</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 페이지 로직
</script> 
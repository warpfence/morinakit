<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import ToolLayout from '@/components/layout/ToolLayout.vue'

const route = useRoute()

const currentLayout = computed(() => {
  return route.meta.layout === 'tool' ? ToolLayout : BaseLayout
})
</script>

<style>
/* Tailwind CSS가 기본 스타일을 처리하므로 기존 스타일 제거 */
</style> 
<template>
  <div class="wordcloud-only-container">
    <WordCloudAnalysis />
  </div>
</template>

<script setup>
import WordCloudAnalysis from '@/components/business/WordCloudAnalysis.vue'
</script>

<style lang="scss" scoped>
.wordcloud-only-container {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%);
  padding: 20px;
  box-sizing: border-box;
}
</style>

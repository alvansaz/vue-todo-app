<template>
  <div
    class="animate-spin rounded-full border-solid border-r-transparent border-l-transparent"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderTopColor: color,
      borderBottomColor: color,
      borderWidth: `${Number(size) / 10}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  size: String,
  color: String,
})
</script>
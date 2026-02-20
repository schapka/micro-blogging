<script lang="ts" setup>
const showDialog = ref(false);
</script>

<template>
  <CreatePostButton @click="showDialog = true" />
  <CreatePostDialog v-model:open="showDialog" />
</template>

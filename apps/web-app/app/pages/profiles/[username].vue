<script lang="ts" setup>
const route = useRoute();

const username = computed(() => {
  if (typeof route.params.username === "string") {
    return route.params.username;
  }
  throw new Error("Invalid or missing username");
});
</script>

<template>
  <UserProfile :username="username" />
</template>

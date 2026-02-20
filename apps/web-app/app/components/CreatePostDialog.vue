<script lang="ts" setup>
const open = defineModel("open", { default: false });

const textareaRef = useTemplateRef("textarea");

const message = ref("");
const sanitizedMessage = computed(() => message.value.trim());

const maxLength = 280;
const count = computed(() => sanitizedMessage.value.length);
const isValid = computed(() => count.value > 0 && count.value <= maxLength);

function handleClose() {
  open.value = false;
}

async function handleSubmit() {
  await $fetch("/api/users/me/posts", {
    method: "POST",
    body: {
      content: sanitizedMessage.value,
    },
  });

  refreshNuxtData(getPostsQueryKey("me"));

  /**
   * Reset form and close dialog
   */
  open.value = false;
  message.value = "";
}

watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.focus();
      }
    });
  }
});
</script>

<template>
  <!-- UI generated via v0.dev, see: https://v0.app/chat/minimal-profile-page-fY85mhQCcYR -->
  <dialog
    class="fixed inset-0 z-50 w-auto h-auto flex items-center justify-center pointer-events-none invisible open:visible open:pointer-events-auto"
    aria-modal="true"
    aria-label="Create a new post"
    :open="open"
  >
    >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/40" @click="handleClose"></div>

    <!-- Panel -->
    <div
      class="relative mx-4 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-semibold">New post</h2>
        <button
          aria-label="Close"
          class="size-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors cursor-pointer"
          @click="handleClose"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <textarea
        ref="textarea"
        :maxlength="maxLength"
        rows="5"
        placeholder="What's on your mind?"
        class="w-full resize-none rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 text-[15px] leading-relaxed placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition"
        v-model="message"
      ></textarea>

      <div class="flex items-center justify-between mt-4">
        <span class="text-xs tabular-nums text-stone-400">
          {{ count }} / {{ maxLength }}
        </span>
        <button
          @click="handleSubmit"
          :disabled="!isValid"
          class="rounded-xl bg-stone-900 text-white text-sm font-medium px-6 py-2.5 hover:bg-stone-800 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          Post
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
interface UserProfileProps {
  username: string;
}

const props = defineProps<UserProfileProps>();

const username = toRef(() => props.username);
const { data: userData } = useUser(username);
const { data: userPosts } = useUserPosts(username);
</script>

<template>
  <!-- UI generated via v0.dev, see: https://v0.app/chat/minimal-profile-page-fY85mhQCcYR -->
  <main v-if="userData" class="mx-auto max-w-xl px-5 pt-12 pb-28">
    <!-- ProfileHeader -->
    <header class="flex items-center gap-5 pb-8 border-b border-stone-200">
      <img
        v-if="userData.avatarUrl"
        :src="userData.avatarUrl"
        :alt="userData.username"
        class="size-20 shrink-0 rounded-full object-cover ring-1 ring-stone-900/10"
      />
      <div>
        <p class="text-stone-500 text-sm mt-0.5">@{{ userData.username }}</p>
      </div>
    </header>
    <!-- /ProfileHeader -->

    <!-- PostFeed -->
    <section
      v-if="userPosts"
      aria-label="Posts"
      class="mt-8 flex flex-col gap-3"
    >
      <!-- PostCard -->
      <article
        v-for="post in userPosts"
        :key="post.id"
        class="bg-white rounded-2xl px-6 py-5 border border-stone-200"
      >
        <p class="text-[15px] leading-relaxed text-pretty">
          {{ post.content }}
        </p>
        <time
          class="block mt-3 text-xs text-stone-400"
          :datetime="post.createdAt"
        >
          <!-- Avoid hydration mismatch: date formatting uses the system timezone, which differs between server (US) and client (user's local). -->
          <ClientOnly>
            {{ formatDate(post.createdAt) }}
          </ClientOnly>
        </time>
      </article>
      <!-- /PostCard -->
    </section>
    <!-- /PostFeed -->
  </main>
</template>

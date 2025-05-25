<template>
  <div class="relative isolate px-6 pt-24 lg:px-8 pb-16 sm:pb-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="relative min-h-96">
        <NuxtLink
          v-if="bingImage"
          :to="bingImage.url"
          target="_blank"
        >
          <img
            class="absolute w-5 h-5 top-4 right-4"
            src="/assets/icons/bing.svg"
            alt="Telegram"
            width=""
            height=""
          />
        </NuxtLink>

        <img
          v-if="bingImage"
          class="object-cover w-full h-32 lg:h-60 rounded sm:rounded-2xl"
          :src="bingImage.url"
          alt=""
        />

        <div class="max-w-5xl px-4 pb-6 mx-auto sm:px-6 lg:px-8">

          <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div class="flex">
              <div class="flex">
                <img
                  class="w-24 h-24 rounded-full ring-4 object-cover ring-white dark:ring-zinc-900 sm:h-32 sm:w-32"
                  src="https://avatars.githubusercontent.com/u/3501211?v=4"
                  alt=""
                />
              </div>
            </div>
            <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-start sm:space-x-6 sm:pb-1">
              <div
                v-if="user"
                class="flex-1 min-w-0 mt-6 sm:hidden md:block rtl:mr-6"
              >
                <h1
                  v-html="user.name"
                  class="text-2xl font-bold truncate"
                ></h1>
                <div
                  v-html="user.email"
                  class="text-sm"
                ></div>
              </div>

              <div class="flex flex-col gap-4 mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0">
                <UButton
                  icon="i-heroicons-information-circle"
                  color="neutral"
                  :label="$t('profile.documentation')"
                  :trailing="false"
                />
                <UButton
                  icon="i-heroicons-question-mark-circle"
                  color="neutral"
                  :label="$t('profile.support')"
                  :trailing="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { loggedIn, user } = useUserSession()
const localePath = useLocalePath();
const toast = useToast()

// Redirect if not logged in
watchEffect(async () => {
  if (!loggedIn.value) {
    await navigateTo(localePath('/auth/login'))
  }
})

const { data: bingImage } = await useFetch("https://bing.biturl.top/");
</script>
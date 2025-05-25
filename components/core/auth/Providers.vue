<template>
  <div>
    <div class="relative mt-10">
      <div
        class="absolute inset-0 flex items-center"
        aria-hidden="true"
      >
        <div class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-sm font-medium leading-6">
        <span
          class="px-6 bg-white dark:bg-zinc-900"
          v-html="$t('auth.orContinue')"
        ></span>
      </div>
    </div>
    <div class="mt-6">
      <UButton
        @click="handleGoogleLogin"
        block
        icon="devicon:google"
        class="cursor-pointer"
        color="neutral"
        variant="solid"
        label="Google"
      />
    </div>
  </div>
</template>

<script setup>
const handleGoogleLogin = () => {
  const { openInPopup } = useUserSession()
  openInPopup('/api/auth/google')
}
</script>

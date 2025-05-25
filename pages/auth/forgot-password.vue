<template>
  <CoreAuth>
    <template #title>
      <h2
        v-html="$t('auth.forgotPasswordTitle')"
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"
      ></h2>
    </template>
    <template #form>
      <CoreFormsForgotPassword />
    </template>
    <template #footer>
      <div class="mt-10 text-sm text-center flex items-center gap-2 justify-center">
        {{ $t('auth.memberAlready') }}
        {{ " " }}
        <NuxtLink
          :to="$localePath('/auth/login')"
          v-html="$t('auth.signNow')"
          class="font-semibold leading-6 text-primary cursor-pointer"
        ></NuxtLink>
      </div>
    </template>
  </CoreAuth>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});
</script>
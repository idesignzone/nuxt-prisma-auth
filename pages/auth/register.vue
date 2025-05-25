<template>
  <CoreAuth>
    <template #title>
      <h2
        v-html="$t('auth.registerTitle')"
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"
      ></h2>
    </template>
    <template #form>
      <CoreFormsRegister />
    </template>
    <template #providers>
      <CoreAuthProviders />
    </template>
    <template #footer>
      <div class="mt-10 text-sm text-center flex items-center gap-2 justify-center">
        {{$t('auth.memberAlready')}}
        {{ " " }}
        <NuxtLink v-html="$t('auth.signNow')"
          :to="$localePath('/auth/login')"
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
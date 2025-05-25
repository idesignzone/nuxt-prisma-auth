<template>
  <CoreAuth>
    <template #title>
      <h2 v-html="$t('auth.signInTitle')" class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"></h2>
    </template>
    <template #form>
      <CoreFormsLogin />
    </template>
    <template #providers>
      <CoreAuthProviders />
    </template>
    <template #footer>
      <div class="mt-10 text-sm text-center flex items-center gap-2 justify-center">
        {{$t('auth.notMember')}}
        {{ " " }}
        <NuxtLink v-html="$t('auth.SignUpNow')" :to="$localePath('/auth/register')" class="font-semibold leading-6 text-primary cursor-pointer"></NuxtLink>
      </div>
    </template>
  </CoreAuth>
</template>

<script setup>
  definePageMeta({
    layout: "blank",
  });
</script>
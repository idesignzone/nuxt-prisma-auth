<template>
  <CoreAuth>
    <template #title>
      <h2 v-html="$t('auth.resetPAsswordTitle')" class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"></h2>
    </template>
    <template #form>
      <CoreFormsResetPassword />
    </template>
  </CoreAuth>
</template>

<script setup>
  definePageMeta({
    layout: "blank",
  });
</script>
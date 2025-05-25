<template>
  <UDropdownMenu :items="[languages]" :popper="{ arrow: true }">
    <UButton
      :label="currentLanguage?.name"
      type="button"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-language"
      class="cursor-pointer" />
  </UDropdownMenu>
</template>

<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const currentLanguage = computed(() =>
  locales.value.find((lng) => lng.code === locale.value)
);

const languages = locales.value.map((lng) => ({
  label: lng.name,
  to: switchLocalePath(lng.code),
}));
</script>

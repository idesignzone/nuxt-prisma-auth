<template>
  <Body class="h-full">
    <CoreGeneralHeader />
    <main>
      <slot />
    </main>
  </Body>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead({
  seo: {
    canonicalQueries: ['foo']
  },
})
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
</script>

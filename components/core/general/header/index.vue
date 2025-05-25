<template>
  <header class="fixed inset-x-0 top-0 z-50 font-header max-w-7xl mx-auto">
    <nav
      class="mx-auto flex items-center justify-between lg:px-8 p-6"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <CoreGeneralHeaderLogo />
      </div>
      <div class="items-center gap-8 flex lg:flex-1 lg:justify-end z-10">
        <div class="flex items-center gap-1">
          <UButton
            @click="open = true"
            :ui="{ base: '!pr-0 flex lg:hidden' }"
            icon="i-heroicons-bars-3"
            size="lg"
            color="white"
            variant="link"
          />
          <div class="hidden lg:flex">
            <ClientOnly>
              <CoreGeneralHeaderTheme />
              <CoreGeneralHeaderLanguage />
              <CoreGeneralHeaderUser v-if="!isAuthRoute" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </nav>

    <UModal
      v-model:open="open"
      fullscreen
    >
      <template #content>
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto py-6 sm:max-w-sm sm:ring-1">
          <div class="flex items-center justify-between px-6">
            <CoreGeneralHeaderLogo />
            <UButton
              @click="open = false"
              :padded="false"
              icon="i-heroicons-x-mark"
              color="white"
              variant="ghost"
            />
          </div>
          <div class="mt-6 flow-root px-4">
            <div class="-my-6 divide-y">
              <div class="py-10">
                <div class="flex flex-col gap-4">
                  <ClientOnly>
                    <CoreGeneralHeaderTheme />
                    <CoreGeneralHeaderLanguage />
                    <CoreGeneralHeaderUser v-if="!isAuthRoute" />
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </header>
</template>

<script setup>
const open = ref(false)
const route = useRoute()
const { locales } = useI18n()
const localeCodes = computed(() => locales.value.map(l => l.code))

const isAuthRoute = computed(() => {
  const path = route.path
  if (path.startsWith('/auth')) return true
  return localeCodes.value.some(locale => path.startsWith(`/${locale}/auth`))
})
</script>

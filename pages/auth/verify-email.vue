<template>
  <CoreAuth>
    <template #title>
      <h2 v-html="$t('auth.verifyTitle')" class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"></h2>
    </template>
    <template #form>

      <div
        v-if="loading"
        class="flex items-center flex-col justify-center"
      >
        <UIcon
          name="i-mynaui:circle-notch"
          class="animate-spin h-8 w-8 mx-auto"
        />
        <p v-html="$t('auth.verifyingEmail')" class="mt-2"></p>
      </div>

      <div
        v-else-if="error"
        class="flex items-center flex-col justify-center"
      >
        <UIcon
          name="i-heroicons-x-circle"
          class="h-12 w-12 mx-auto text-red-500"
        />
        <p class="mt-2 text-red-600">{{ error }}</p>
        <UButton
          to="/auth/login"
          class="mt-4"
          :label="$t('auth.returnLogin')"
        />
      </div>

      <div
        v-else
        class="flex items-center flex-col justify-center"
      >
        <UIcon
          name="i-heroicons-check-circle"
          class="h-12 w-12 mx-auto text-green-500"
        />
        <p class="mt-2" v-html="$t('auth.verifySuccess')"></p>
        <UButton
          to="/auth/login"
          class="mt-4"
          :label="$t('auth.proceedLogin')"
        />
      </div>

    </template>
  </CoreAuth>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute()
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const token = route.query.token

  if (!token) {
    error.value = t('auth.verifcationToeknMissing')
    loading.value = false
    return
  }

  try {
    const response = await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: { token }
    })

    if (!response.success) {
      throw new Error(response.error || t('auth.verifyFailed'))
    }

    setTimeout(() => {
      loading.value = false
    }, 2000)
  } catch (err) {
    error.value = t('auth.verifyError')
    loading.value = false
  }

})
</script>

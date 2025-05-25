<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('auth.email')"
      name="email"
    >
      <UInput
        v-model="state.email"
        color="neutral"
        class="w-full"
      />
    </UFormField>
    <UButton
      type="submit"
      block
      class="!mt-4 cursor-pointer"
      :label="$t('auth.requestReset')"
      :loading="loading"
    />

    <p
      v-if="success"
      class="text-green-600 mt-4"
      v-html="$t('auth.resetLink')"
    ></p>
    <p
      v-if="error"
      class="text-red-600 mt-4"
    >{{ error }}</p>

  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
const { t } = useI18n();
const success = ref(false)
const error = ref<string | null>(null)
const loading = ref(false)

const state = reactive({
  email: '',
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ name: "email", message: t('auth.emailRequired') });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  loading.value = true
  error.value = null
  success.value = false

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: event.data.email }
    })
    success.value = true
  } catch (err) {
    error.value = t('auth.somethingWrong')
  } finally {
    loading.value = false
  }
};
</script>

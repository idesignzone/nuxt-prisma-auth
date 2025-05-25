<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >

    <UFormField
      :label="$t('auth.password')"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        color="neutral"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('auth.confirmPassword')"
      name="confirmPassword"
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        color="neutral"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      block
      :loading="loading"
      class="!mt-4 cursor-pointer"
      :label="$t('auth.resetPassword')"
    />

    <p
      v-if="success"
      class="text-green-600 mt-4"
      v-html="$t('auth.passwordResetSuccess')"
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
const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
const route = useRoute()
const token = route.query.token

const state = reactive({
  password: '',
  confirmPassword: '',
})

const validate = (form: any): FormError[] => {
  const errors = [];
  if (!form.password) {
    errors.push({ name: "password", message: t('auth.passwordRequired') });
  } else if (form.password.length < 8) {
    errors.push({ name: "password", message: t('auth.passwordLength') });
  }
  if (!form.confirmPassword) {
    errors.push({ name: "confirmPassword", message: t('auth.passwordConfirmation') });
  } else if (form.password !== form.confirmPassword) {
    errors.push({ name: "confirmPassword", message: t('auth.passwordMatch') });
  }
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  loading.value = true
  error.value = null
  success.value = false

  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        password: event.data.password
      }
    })
    success.value = true
  } catch (err) {
    error.value = t('auth.invalidToken')
  } finally {
    loading.value = false
  }
}
</script>

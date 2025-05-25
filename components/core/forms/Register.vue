<template>
  <UForm
    :validate="validate"
    :state="form"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('auth.name')"
      name="name"
    >
      <UInput
        v-model="form.name"
        color="neutral"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('auth.email')"
      name="email"
    >
      <UInput
        v-model="form.email"
        color="neutral"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('auth.password')"
      name="password"
    >
      <UInput
        v-model="form.password"
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
        v-model="form.confirmPassword"
        type="password"
        color="neutral"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      block
      class="!mt-6 cursor-pointer"
      :label="$t('auth.signUp')"
      :loading="loading"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
const { t } = useI18n();
const { loggedIn } = useUserSession()
const toast = useToast();
const localePath = useLocalePath();
const loading = ref(false)

// Redirect if already logged in
watchEffect(async () => {
  if (loggedIn.value) {
    await navigateTo(localePath('/admin/profile'))
  }
})

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const validate = (form: any): FormError[] => {
  const errors = [];
  if (!form.name)
    errors.push({ name: "name", message: t('auth.nameRequired') });
  if (!form.email)
    errors.push({ name: "email", message: t('auth.emailRequired') });
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

  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: event.data.name,
        email: event.data.email,
        password: event.data.password
      }
    })

    toast.add({
      title: t('auth.registrationSuccess'),
      description: t('auth.checkMail'),
      color: 'success'
    })

    await navigateTo(localePath('/auth/login'))

  } catch (error: any) {
    const fieldErrors = error?.response?._data?.data

    if (Array.isArray(fieldErrors)) {
      toast.add({
        title: 'Error',
        description: fieldErrors[0]?.message || t('auth.registrationError'),
        color: 'error'
      })
      return fieldErrors
    }

    // Fallback toast for other errors
    toast.add({
      title: 'Error',
      description: error?.response?._data?.message || t('auth.registrationError'),
      color: 'error'
    })
  } finally {
    loading.value = false
  }

}
</script>

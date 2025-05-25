<template>
  <UForm
    :validate="validate"
    :state="form"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('auth.email')"
      name="email"
    >
      <UInput
        v-model="form.email"
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
        class="w-full"
      />
    </UFormField>
    <div class="flex items-center justify-between">
      <div class="flex items-center dar:text-white">
        <UCheckbox
          name="notifications"
          :label="$t('auth.remember')"
        />
      </div>

      <div class="text-sm leading-6">
        <NuxtLink
          :to="$localePath('/auth/forgot-password')"
          class="font-semibold text-primary cursor-pointer"
          v-html="$t('auth.forgotPassword')"
        ></NuxtLink>
      </div>
    </div>

    <UButton
      type="submit"
      :loading="loading"
      block
      class="!mt-6 cursor-pointer"
      :label="$t('auth.signIn')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
const { t } = useI18n();
const { loggedIn, fetch: refreshSession } = useUserSession()
const localePath = useLocalePath();
const route = useRoute()
const toast = useToast();
const loading = ref(false)

// Redirect if already logged in
watchEffect(async () => {
  if (loggedIn.value) {
    await navigateTo(localePath('/admin/profile'))
  }
})

const form = reactive({
  email: '',
  password: '',
});

const validate = (form: any): FormError[] => {
  const errors = [];
  if (!form.email) errors.push({ name: "email", message: t('auth.emailRequired') });
  if (!form.password) errors.push({ name: "password", message: t('auth.passwordRequired') });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  loading.value = true

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data
    })

    await refreshSession()

    toast.add({
      title: t('auth.success'),
      description: t('auth.loggedSuccess'),
      color: 'success',
    })

    await navigateTo(localePath('/admin/profile'))

  } catch (error: unknown) {
    const errorMessage =
      error && typeof error === 'object' && 'data' in error && typeof error.data === 'object' && error.data && 'message' in error.data
        ? (error.data as any).message
        : t('auth.loginError')

    toast.add({
      title: t('auth.error'),
      description: errorMessage,
      color: 'error'
    })
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div class="flex items-center">
    <div class="pl-2 lg:ml-2 lg:border-l h-10 sm:h-7 lg:pl-2" />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'w-48'
      }"
      @update:selected="(item) => item?.click?.()"
    >
      <UButton
        v-if="user"
        :label="user.name"
        color="neutral"
        variant="ghost"
        class="cursor-pointer"
      />
    </UDropdownMenu>
    <div
      v-if="!loggedIn"
      class="flex items-center"
    >
      <div class="flex items-center">
        <UIcon
          name="i-heroicons-user-circle"
          class="w-5 h-5 sm:hidden"
        />
        <UButton
          to="/auth/login"
          color="neutral"
          variant="ghost"
          class="cursor-pointer"
          :label="$t('auth.signIn')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
const localePath = useLocalePath();
const toast = useToast()

const { loggedIn, user, clear } = useUserSession()

const router = useRouter()

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })

    await clear()

    toast.add({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      color: 'success'
    })

    await navigateTo(localePath('/auth/login'))
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'An error occurred during logout.',
      color: 'error'
    })
  }
}

// Initialize auth state
onMounted(() => {
  const { fetch } = useUserSession()
  fetch()
})

const items = ref<DropdownMenuItem[]>([
  [{
    label: user.value ? user.value.name : '',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/3501211?v=4'
    },
    type: 'label'
  }],
  [{
    label: "Profile",
    icon: "i-lucide-user",
    to: localePath('/admin/profile'),
  }],
  [{
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: async () => {
      handleLogout();
      await navigateTo({ path: localePath('/admin/profile') });
    },
  }],
])
</script>

<template>
  <NuxtLink :to="$localePath('/')">
    <img
      :src="$colorMode.preference == 'dark' ? '/logo-green-white.svg' : '/logo-green-black.svg'"
      width=""
      height=""
    />
  </NuxtLink>
</template>
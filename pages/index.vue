<template>
  <div class="relative isolate px-6 pt-14 lg:px-8 pb-16 sm:pb-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
            <h1 v-html="$t('hero.title')" class="text-4xl font-bold font-heading tracking-tight sm:text-6xl"></h1>
            <p v-html="$t('hero.description')" class="mt-6 text-lg leading-8"></p>
        </div>
      </div>
    </div>
  </div>
</template>

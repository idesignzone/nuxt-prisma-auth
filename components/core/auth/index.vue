<template>
  <UCard class="flex flex-col justify-center flex-1 min-h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
      <slot name="title" />
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <slot name="form" />
        <slot name="providers" />
      </div>
      <slot name="footer" />
    </div>
  </UCard>
</template>
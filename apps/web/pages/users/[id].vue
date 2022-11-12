<script setup lang="ts">
definePageMeta({
  validate: ({ params }) => Number.isInteger(Number(params.id)),
})

const route = useRoute()

const { data: user } = useAsyncData(
  'getUserById',
  () => $fetch(`http://localhost:3333/api/users/${route.params.id}`),
)
</script>

<template>
  <div>{{ user }}</div>
  <NuxtLink to="/">
    home
  </NuxtLink>
</template>

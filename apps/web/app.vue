<script setup lang="ts">
const { data } = await useFetch('/api/users')
</script>

<template>
  <h1>users</h1>
  <div>
    <ul>
      <li v-for="{ id, email } in data.data" :key="id">
        <NuxtLink :to="`/users/${id}`">
          {{ email }}
        </NuxtLink>
      </li>
    </ul>
    <div>{{ data.meta }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Response } from './server/types'

const { data } = await useFetch<Response>('/api/users')
</script>

<template>
  <h1>users</h1>
  <div v-if="data">
    <ul>
      <li v-for="{ id, email } in data.data" :key="id">
        <NuxtLink :to="`/users/${id}`">
          {{ email }}
        </NuxtLink>
      </li>
    </ul>
    <div>{{ data.meta }}</div>
  </div>
  <div v-else>
    No data
  </div>
</template>

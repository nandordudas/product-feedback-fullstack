<script setup lang="ts">
import type { Response } from '~/server/types'

const { data: users } = await useAsyncData<Response>(
  'getUsers',
  () => $fetch('http://localhost:3333/api/users'),
)
</script>

<template>
  <h1>users</h1>
  <div v-if="users">
    <ul>
      <li v-for="{ id, email } in users.data" :key="id">
        <NuxtLink :to="`/users/${id}`">
          {{ email }}
        </NuxtLink>
      </li>
    </ul>
    <div>{{ users.meta }}</div>
  </div>
  <div v-else>
    No data
  </div>
</template>

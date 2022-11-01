<script setup lang="ts">
const baseUrl = 'http://localhost:3333/api/users'

const response = await fetch(baseUrl)
const { data: users, meta } = await response.json()
</script>

<template>
  <div>
    <ul>
      <li v-for="{ id, email } in users" :key="id">
        {{ email }}
      </li>
    </ul>
    <div>{{ meta }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'


const userStore = useUsersStore()

//const searchName = ref('')

const handleKeyUp = () => {
  userStore.currentPage = 1
  userStore.loadUsers()
}


//@keyup="handleKeyUp"
</script>

<template>
    <div class="container mx-auto my-8 p-4">
      <h1 class="text-2xl font-bold mb-4 dark:text-white">Search Users</h1>
      <div class="mb-4">
        <input
          type="text"
          v-model="userStore.searchName"
          placeholder="Search by name"
          class="w-full p-2 border rounded"
        />
        <button @click="handleKeyUp" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  </template>
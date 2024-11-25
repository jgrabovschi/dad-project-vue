<script setup>
import { computed, ref } from 'vue'
import Card from './ui/card/Card.vue'
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()

</script>

<template>
    <Card class="w-[450px] mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Profile</h2>
        </div>
        <div>
            <img :src="storeAuth.userPhotoUrl" alt="avatar" class="rounded-full h-24 w-24 mx-auto" />
        </div>
        <div class="mt-4">
            <p class="text-center text-xl text-gray-900 dark:text-white">@{{ storeAuth.nickname }}</p>
            <p class="text-center text-md text-gray-900 dark:text-white">{{ storeAuth.userName }}</p>
            <p class="text-center text-sm text-gray-600 dark:text-white">{{ storeAuth.userEmail }}</p>
        </div>
        <div class="mt-4">
            <p class="text-sm text-gray-600 dark:text-white"><b>Games Won: </b>{{ storeAuth.gamesWon }}</p>
            <p class="text-sm text-gray-600 dark:text-white"><b>User Type: </b>{{ storeAuth.userType == 'A' ? 'Admin' : 'Player' }}</p>
        </div>
    </Card>
</template>
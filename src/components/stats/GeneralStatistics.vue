<script setup>
import axios from 'axios';
import { VueSpinnerPacman } from 'vue3-spinners';
import { ref } from 'vue';

const stats = ref(null)
const isLoading = ref(false)


</script>

<template>
    <div v-if="isLoading" class="flex justify-center items-center h-32">
        <VueSpinnerPacman size="30" color="gray" />
    </div>
    <div v-else class="space-y-2 m-4">
        <div class="flex justify-between items-center">
            <span class="font-semibold dark:text-slate-100">Total Games Registered (all users):</span>
            <span class="dark:text-slate-300">123</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="font-semibold dark:text-slate-100">Total Singleplayer Games:</span>
            <span class="dark:text-slate-300">123</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="font-semibold dark:text-slate-100">Total Multiplayer Games:</span>
            <span class="dark:text-slate-300">123</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="font-semibold dark:text-slate-100">Total Users:</span>
            <span class="dark:text-slate-300">123</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="font-semibold dark:text-slate-100">Total Games Played:</span>
            <span class="dark:text-slate-300">123</span>
        </div>
    </div>
</template>
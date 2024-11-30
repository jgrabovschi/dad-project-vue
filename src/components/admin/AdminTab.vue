<script setup>
import { computed, ref } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router';
import UsersList from '@/components/admin/UsersList.vue'

const storeAuth = useAuthStore()

</script>

<template>
    <Card class="w-[450px] mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 dark:text-white">ADMIN TAB</h2>
        </div>
        <!--<UsersList/>-->
    </Card>
</template>
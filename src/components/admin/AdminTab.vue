<script setup>
import { computed, ref } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router';
import UsersList from '@/components/admin/UsersList.vue'
import UserListFormSearch from '@/components/admin/UserListFormSearch.vue'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import CreateAccount from '../auth/CreateAccount.vue';

const storeAuth = useAuthStore()

</script>

<template>
    <Card class=" mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <UserListFormSearch/>
        <UsersList/>
    </Card>
    <Card class="w-[600px] mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <CardHeader>
            <CardTitle class="text-lg md:text-xl text-black dark:text-white">Create Admin Account</CardTitle>
            <CardDescription class="text-sm md:text-base">
                Fill in the details below to create a new admin account.
            </CardDescription>
        </CardHeader>
        <CreateAccount userType="A"/>
    </Card>
</template>
<script setup>
import { computed, ref } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router';
import UsersList from '@/components/admin/UsersList.vue'
import UserListFormSearch from '@/components/admin/UserListFormSearch.vue'

const storeAuth = useAuthStore()

</script>

<template>
    <Card class=" mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <UserListFormSearch/>
        <UsersList/>
    </Card>
</template>
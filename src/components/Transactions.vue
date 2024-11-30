<script setup>
import { ref, computed, onMounted } from 'vue'
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()



</script>

<template>
    <div class="w-10/12 max-w-5xl mx-auto h-3/4 max-h-screen rounded-lg bg-gray-700 flex flex-col">
        <!-- Header -->
        <p class="text-white mt-8 ms-8 text-xl font-bold">Transactions</p>
        
        <!-- Table Container -->
        <div class="flex-grow dark:bg-zinc-900 bg-slate-300 m-8 rounded-sm overflow-y-auto">
            <Table>
                <!-- Table Header -->
                <TableHeader class="h-12">
                    <TableRow>
                        <TableHead class="w-28">Datetime</TableHead>
                        <TableHead v-if="authStore.userType == 'A'" class="w-28">User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                
                <!-- Table Body -->
                <TableBody>
                    <TableRow class="h-12">
                        <TableCell class="font-medium text-center">INV001</TableCell>
                        <TableCell v-if="authStore.userType == 'A'" class="w-28 text-center">User</TableCell>
                        <TableCell class="text-center">Paid</TableCell>
                        <TableCell class="text-center">Credit Card</TableCell>
                        <TableCell class="text-center">$250.00</TableCell>
                    </TableRow>
                    <!-- Add more rows here -->
                </TableBody>
            </Table>
        </div>
    </div>
</template>
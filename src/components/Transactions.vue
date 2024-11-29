<script setup>
import { ref, computed, onMounted } from 'vue'
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()



</script>

<template>
<div class="w-10/12 h-3/4 rounded-lg bg-gray-700">
    <p class="text-white mt-8 ms-8 text-xl font-bold">Transactions</p>
    <div class="dark:bg-zinc-900 bg-slate-300 m-8 h-2/3 rounded-sm">
        <Table>
            <TableHeader className="h-12">
                <TableRow>
                <TableHead className="w-28">Datetime</TableHead>
                <TableHead v-if="authStore.userType == 'A'" className="w-28">User</TableHead>
                <TableHead className="text-bold">Status</TableHead>
                <TableHead className="text-bold">Method</TableHead>
                <TableHead className="text-bold">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="h-12">
                <TableCell className="font-medium text-center">INV001</TableCell>
                <TableCell v-if="authStore.userType == 'A'" className="w-28 text-center">User</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    
</div>
</template>
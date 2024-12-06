<script setup>
import { onMounted, watch } from 'vue'
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { useTransactionsStore } from '@/stores/transactions'
const authStore = useAuthStore()
const route = useRoute();
const transactionsStore = useTransactionsStore()
const params = route.params

if(params.filter != null){
    transactionsStore.filter = params.filter
}

if(params.nickname != null){
transactionsStore.nickname = params.nickname
}

watch(() => transactionsStore.isLoading, () => {
    console.log(transactionsStore.transactions)
})

onMounted(transactionsStore.loadTransactions);
</script>

<template>
    <div v-if="transactionsStore.isLoading == false" class="w-10/12 max-w-5xl mx-auto h-3/4 max-h-screen rounded-lg bg-white flex flex-col shadow-md dark:bg-gray-700 ">
        <!-- Header -->
        <p class="mt-8 ms-8 text-xl font-bold dark:text-white">Transactions</p>
        
        <!-- Table Container -->
        <div class="flex-grow bg-gray-100 m-8 rounded-sm overflow-y-auto dark:dark:bg-zinc-800 ">
            <Table>
                <!-- Table Header -->
                <TableHeader class="h-12">
                    <TableRow >
                        <TableHead class="w-28 dark:text-slate-200">Transaction Date</TableHead>
                        <TableHead v-if="authStore.userType == 'A'" class="w-28 dark:text-slate-200 text-center">User Nickname</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Type</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Cost (In Euros)</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Payment Method</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Payment Reference</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Brain Coins</TableHead>
                    </TableRow>
                </TableHeader>
                
                <!-- Table Body -->
                <TableBody>
                    <TableRow v-for="transaction in transactionsStore.transactions" class="h-12">
                        <TableCell class="font-medium dark:text-slate-200">{{transaction.transaction_datetime}}</TableCell>
                        <TableCell v-if="authStore.userType == 'A'" class="w-28 text-center dark:text-slate-200">{{transaction.transaction_datetime}}</TableCell>
                        <TableCell class="text-center dark:text-slate-200">Paid</TableCell>
                        <TableCell class="text-center dark:text-slate-200">Credit Card</TableCell>
                        <TableCell class="text-center dark:text-slate-200">$250.00</TableCell>
                        <TableCell class="text-center dark:text-slate-200">Credit Card</TableCell>
                        <TableCell class="text-center dark:text-slate-200">$250.00</TableCell>
                    </TableRow>
                    <!-- Add more rows here -->
                </TableBody>
            </Table>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { useErrorStore } from '@/stores/error'

const storeError = useErrorStore()
const authStore = useAuthStore()

const getTransactions = async () =>{
    storeError.resetMessages();
    let response;
    try{
    if(authStore.userType == 'A'){
         response = await axios.get('/transactions')
    } else {
        response = await axios.get('/transactions/user/' + authStore.user.id)
    }
    return response.data
    }catch(e){
        storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Error Loading the Transactions!')
    }
}

</script>

<template>
    <div class="w-10/12 max-w-5xl mx-auto h-3/4 max-h-screen rounded-lg bg-white flex flex-col shadow-md dark:bg-gray-700 ">
        <!-- Header -->
        <p class="mt-8 ms-8 text-xl font-bold dark:text-white">Transactions</p>
        
        <!-- Table Container -->
        <div class="flex-grow bg-gray-100 m-8 rounded-sm overflow-y-auto dark:dark:bg-zinc-800 ">
            <Table>
                <!-- Table Header -->
                <TableHeader class="h-12">
                    <TableRow >
                        <TableHead class="w-28 dark:text-slate-200">Datetime</TableHead>
                        <TableHead v-if="authStore.userType == 'A'" class="w-28 dark:text-slate-200 text-center">User Nickname</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Type</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Method</TableHead>
                        <TableHead class="text-center dark:text-slate-200">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                
                <!-- Table Body -->
                <TableBody>
                    <TableRow class="h-12">
                        <TableCell class="font-medium dark:text-slate-200">INV001</TableCell>
                        <TableCell v-if="authStore.userType == 'A'" class="w-28 text-center dark:text-slate-200">User</TableCell>
                        <TableCell class="text-center dark:text-slate-200">Paid</TableCell>
                        <TableCell class="text-center dark:text-slate-200">Credit Card</TableCell>
                        <TableCell class="text-center dark:text-slate-200">$250.00</TableCell>
                    </TableRow>
                    <!-- Add more rows here -->
                </TableBody>
            </Table>
        </div>
    </div>
</template>
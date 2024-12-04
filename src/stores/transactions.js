import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const useTransactionsStore = defineStore('transactions', () => {

    const filter = ref("");
    const selected_user = ref(-1);
    const isLoading = ref(false);
    const transactions = ref([]);
    const storeAuth = useAuthStore();
    const storeError = useErrorStore();
    let response

    const loadTransactions = async () => {
        storeError.resetMessages();
        try {
            if(filter.value == ""){
                if(storeAuth.user.userType == "A"){
                    response = await axios.get('/transactions')
                }else{
                    response = await axios.get('/transactions/user/'+ storeAuth.user.id)
                }
                transactions.value = response.data
            } else {

            const response = await axios.get('/transactions' + filter.value)
            transactions.value = response.data
            }
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Error Loading the Transactions!')
        }
    }

})
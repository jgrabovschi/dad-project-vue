import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const useTransactionsStore = defineStore('transactions', () => {
    const filter = ref("");
    const nickname = ref("");
    const isLoading = ref(true);
    const transactions = ref([]);
    const storeAuth = useAuthStore();
    const storeError = useErrorStore();
    let response

    const loadTransactions = async () => {
        storeError.resetMessages();
        let apiUrl = '/transactions';

        if (nickname.value) {
            apiUrl += '/users/' + nickname.value;
        }
        if (filter.value) {
            apiUrl += '/filter/' + filter.value;
        }

        try {
                response = await axios.get(apiUrl)
                transactions.value = response.data.data
                isLoading.value = false
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Error Loading the Transactions!')
        }
    }

    return{
        filter,
        nickname,
        isLoading,
        transactions,
        loadTransactions
    }
});
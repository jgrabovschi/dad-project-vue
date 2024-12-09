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
    const pages = ref(0)
    const currentPage = ref(1)
    const totalItems = ref(0)
    const storeAuth = useAuthStore();
    const storeError = useErrorStore();
    let response

    const nextPage = () => {
        if (currentPage.value < pages.value) {
            currentPage.value++
            loadTransactions()
        }
    }

    const previousPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
            loadTransactions()
        }
    }

    const toPage = (page) => {
        currentPage.value = page
        loadTransactions()
    }
    const lastPage = () => {
        currentPage.value = pages.value
        loadTransactions()
    }

    const loadTransactions = async () => {
        console.log("nickname: " + nickname.value)
        console.log("filter: " + filter.value)
        isLoading.value = true;
        storeError.resetMessages();
        let apiUrl = '/transactions';

        if (nickname.value != "") {
            apiUrl += '/users/' + nickname.value;
        }
        if (filter.value != "") {
            apiUrl += '/type/' + filter.value;
        }

        try {
                console.log(apiUrl + '?page=' + currentPage.value)
                response = await axios.get(apiUrl + '?page=' + currentPage.value)
                transactions.value = response.data.data
                pages.value = response.data.meta.last_page
                currentPage.value = response.data.meta.current_page
                totalItems.value = response.data.meta.total*2
                isLoading.value = false
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Error Loading the Transactions!')
        }
    }

    const resetValues = () => {
        filter.value = ""
        nickname.value = ""
        isLoading.value = true
        transactions.value = []
        pages.value = 0        
        currentPage.value = 1        
        totalItems.value = 0    
    }

    const resetPaginator = () => {
        pages.value = 0
        currentPage.value = 1
        totalItems.value = 0
    }    

    return{
        filter,
        nickname,
        isLoading,
        transactions,
        pages,
        currentPage,
        totalItems,
        loadTransactions,
        toPage,
        previousPage,
        nextPage,
        lastPage,
        resetValues,
        resetPaginator
    }
});
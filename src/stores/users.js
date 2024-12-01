import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useErrorStore } from '@/stores/error'
import axios from 'axios'



export const useUsersStore = defineStore('admin', () => {

    const errorStore = useErrorStore()
    const users = ref([])
    const pages = ref(0)
    const currentPage = ref(1)
    const isLoading = ref(false)
    const totalItems = ref(0)
    const searchName = ref('')
     


    const loadUsers = async () => {
        errorStore.resetMessages()
        isLoading.value = true
        try {
            if(searchName.value == ''){
                const response = await axios.get(`/users`+ '?page=' + currentPage.value)
                users.value = response.data.data
                pages.value = response.data.meta.last_page
                currentPage.value = response.data.meta.current_page
                totalItems.value = response.data.meta.total
            }
            const response = await axios.get(`/users`+ '?page=' + currentPage.value + '&search=' + searchName.value)
            users.value = response.data.data
            pages.value = response.data.meta.last_page
            currentPage.value = response.data.meta.current_page
            totalItems.value = response.data.meta.total

        } catch (e) {
            errorStore.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Users Error!')
        } finally {
            isLoading.value = false
        }
    }

    const nextPage = () => {
        if (currentPage.value < pages.value) {
            currentPage.value++
            loadUsers()
        }
    }

    const previousPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
            loadUsers()
        }
    }

    const toPage = (page) => {
        if (page >= 1 && page <= pages.value) {
            currentPage.value = page
            loadUsers()
        }
    }

    const removeUser =  async (id) => {
        errorStore.resetMessages()

        try {
            await axios.delete(`/users/${id}`)
            loadUsers()
            return true
        } catch (e) {
            errorStore.setErrorMessages(e.response?.data?.message || 'An error occurred', e.response?.data?.errors || {}, e.response?.status || 500, 'Removing User Error!')
            return false
        }
    }

    const toggleBlockUser = async (id) => {
        errorStore.resetMessages()
        try {
            await axios.post(`/users/${id}/block`)
            loadUsers()
            return true
        } catch (e) {
            errorStore.setErrorMessages(e.response?.data?.message || 'An error occurred', e.response?.data?.errors || {}, e.response?.status || 500, 'Blocking User Error!')
            return false
        }
    }

    

    return {loadUsers, users, pages, currentPage, isLoading, nextPage, previousPage, toPage, totalItems, searchName,  removeUser, toggleBlockUser}
})
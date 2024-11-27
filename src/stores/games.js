import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useErrorStore } from '@/stores/error'
import axios from 'axios'

export const useGamesStore = defineStore('games', () => {
    const storeError = useErrorStore()
    const games = ref([])
    const pages = ref(0)
    const currentPage = ref(1)
    const totalItems = ref(0)

    const loadGames = async () => {
        storeError.resetMessages()
        try {
            const response = await axios.get('/games?page=' + currentPage.value)
            games.value = response.data.data
            pages.value = response.data.meta.last_page
            currentPage.value = response.data.meta.current_page
            totalItems.value = response.data.meta.total

        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Games Error!')
        }
    }

    const nextPage = () => {
        if (currentPage.value < pages.value) {
            currentPage.value++
            loadGames()
        }
    }

    const previousPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
            loadGames()
        }
    }

    const toPage = (page) => {
        currentPage.value = page
        loadGames()
    }

  return { loadGames, games, pages, currentPage, totalItems, nextPage, previousPage, toPage}
})

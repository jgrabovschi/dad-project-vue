import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import axios from 'axios'

export const useGamesStore = defineStore('games', () => {
    const storeError = useErrorStore()
    const storeAuth = useAuthStore()
    const games = ref([])


    const clearGames = () => {
        games.value = []
    }

    const loadGames = async () => {
        storeError.resetMessages()
        try {
            const response = await axios.get('/games')
            games.value = response.data.data
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Games Error!')
        }
    }
  return { clearGames, loadGames, games }
})

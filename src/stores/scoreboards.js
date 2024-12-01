import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const useScoreboardsStore = defineStore('scoreboards', () => {
    const storeError = useErrorStore()
    const storeAuth = useAuthStore()
    const scoreboards = ref([])
    const filter = ref('null')
    const isLoading = ref(false)
    const showTable = ref(false)
    const isPersonal = ref(false)
    const gameMode = ref('')

    const loadScores = async () => {
        storeError.resetMessages()
        isLoading.value = true
        try {
            const response = await axios.get('/scoreboards/' + gameMode.value + '/' 
                + (!isPersonal.value ? '' : '/users/' + storeAuth.user.value.id)  + filter.value)
            .then((response) => {
                isLoading.value = false
                showTable.value = true
                return response
            })
            scoreboards.value = response.data

        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Games Error!')
        }
    }

    const showSingleplayerGlobal = () => {
        isPersonal.value = false
        filter.value = 'turns'
        gameMode.value = 'singleplayer'
        loadScores()
    }

    const clearScores = () => {
        showTable.value = false
        scoreboards.value = []
    }

    watch(filter, () => {
        loadScores()
    })


   
  return { loadScores, showSingleplayerGlobal, clearScores, showTable, scoreboards, filter, isLoading, isPersonal }
})

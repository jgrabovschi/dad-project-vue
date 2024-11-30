import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useErrorStore } from '@/stores/error'
import { useRouter } from 'vue-router'
import avatarNoneAssetURL from '@/assets/avatar_none.jpg'
import { useToast } from '@/components/ui/toast/use-toast'




export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const storeError = useErrorStore()

    const { toast } = useToast()
    const user = ref(null)
    const token = ref('')

    const userName = computed(() => {
        return user.value ? user.value.name : ''
    })

    const userFirstLastName = computed(() => {
        const names = userName.value.trim().split(' ')
        const firstName = names[0] ?? ''
        const lastName = names.length > 1 ? names[names.length -1 ] : ''
        return (firstName + ' ' + lastName).trim()
    })

    const gamesWon = computed(() => {
        return user.value ? user.value.games_won : 0
    })

    const userEmail = computed(() => {
        return user.value ? user.value.email : ''
    })

    const userType = computed(() => {
        return user.value ? user.value.type : ''
    })

    const userGender = computed(() => {
        return user.value ? user.value.gender : ''
    })
    
    const nickname = computed(() => {   
        return user.value ? user.value.nickname : ''
    })

    const balance = computed(() => {
        return user.value ? user.value.brain_coins_balance : 0
    })

    const userPhotoUrl = computed(() => {
        const photoFile = user.value ? user.value.photo_filename ?? '' : ''
        if (photoFile) {
            return axios.defaults.baseURL.replaceAll("/api", photoFile)
        }
        return avatarNoneAssetURL
    })

    // This function is "private" - not exported by the store
    const clearUser = () => {
        resetIntervalToRefreshToken()
        user.value = null
        token.value = ''
        localStorage.removeItem('token')
        axios.defaults.headers.common.Authorization = ''
        router.push({ name: 'login' })
    }

    const validatePassword = async (password) => {
        storeError.resetMessages()
        try {
            const response = await axios.post('auth/validatepassword', { password })
            return response.data
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Current password is incorrect')
            return false
        }
    }

    const login = async (credentials) => {
        storeError.resetMessages()
        try {
            const responseLogin = await axios.post('auth/login', credentials)
            token.value = responseLogin.data.token
            localStorage.setItem('token', token.value)
            axios.defaults.headers.common.Authorization = 'Bearer ' + token.value
            const responseUser = await axios.get('users/me')
            user.value = responseUser.data.data
            repeatRefreshToken()
            router.push({ name:'game' })
            return user.value
        } catch (e) {
            clearUser()
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Authentication Error!')
            return false
        }
    }

    const logout = async () => {
        storeError.resetMessages()
        try {
            await axios.post('auth/logout')
            clearUser()
            return true
        } catch (e) {
            clearUser()
            storeError.setErrorMessages(e.response.data.message, [], e.response.status, 'Authentication Error!')
            return false
        }
    }

    // These 2 functions and intervalToRefreshToken variable are "private" - not exported by the store
    let intervalToRefreshToken = null

    const resetIntervalToRefreshToken = () => {
        if (intervalToRefreshToken) {
            clearInterval(intervalToRefreshToken)
        }
        intervalToRefreshToken = null
    }

    const repeatRefreshToken = () => {
        if (intervalToRefreshToken) {
            clearInterval(intervalToRefreshToken)
        }
        intervalToRefreshToken = setInterval(async () => {
            try {
                const response = await axios.post('auth/refreshtoken')
                token.value = response.data.token
                localStorage.setItem('token', token.value)
                axios.defaults.headers.common.Authorization = 'Bearer ' + token.value
                return true
            } catch (e) {
                clearUser()
                storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Authentication Error!')
                return false
            }
        }, 1000 * 60 * 110)  // repeat every 110 minutes

        // To test the refresh token, replace previous line with the following code
        // This will repeat the refreshtoken endpoint every 10 seconds:
        //}, 1000 * 10)

        return intervalToRefreshToken
    }

    const restoreToken = async function () {
        let storedToken = localStorage.getItem('token')
            if (storedToken) {
                try {
                    token.value = storedToken
                    axios.defaults.headers.common.Authorization = 'Bearer ' + token.value
                    const responseUser = await axios.get('users/me')
                    user.value = responseUser.data.data
                    repeatRefreshToken()
                    return true
                } catch {
                    clearUser()
                    return false
                }
        }
        return false
    }

    const canUpdateDeleteProject = (project) => {
        return project && user.value && (userType.value === 'A' || user.value.id === project.created_by_id)
    }

    /*const signup = async (credentials) => {
        storeError.resetMessages()
        try {
            const response = await axios.post('/users', credentials)
            router.push({ name:'login' })
            return response.data
        } catch (e) {
            storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Signup Error!')
            return false
        }
    }*/

        /*
        const signup = async (credentials) => {
            const formData = new FormData()
            formData.append('email', credentials.email)
            formData.append('password', credentials.password)
            formData.append('name', credentials.name)
            formData.append('nickname', credentials.nickname)
            if (credentials.photo_filename) {
                formData.append('photo_filename', credentials.photo_filename)
            }
        
            try {
                const response = await axios.post('/users', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                router.push({ name: 'login' })
                return response.data
            } catch (e) {
                if (e.response) {
                    storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Signup Error!')
                } else {
                    storeError.setErrorMessages('An unexpected error occurred.')
                }
                return false
            }
        }*/

        const signup = async (credentials) => {
            const payload = {
                email: credentials.email,
                password: credentials.password,
                name: credentials.name,
                nickname: credentials.nickname,
                photo_filename: credentials.photo_filename // Base64 encoded image
            }
        
            try {
                const response = await axios.post('/users', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                router.push({ name: 'login' })
                return response.data
            } catch (e) {
                if (e.response) {
                    storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Signup Error!')
                } else {
                    storeError.setErrorMessages('An unexpected error occurred.')
                }
                return false
            }
        }

        /*
        const updateProfile = async (credentials) => {
            //laravel nao aceira metodo put diretamente com o formData: problema ao dar update na info do user,isto nao atualiza logo tem de se dar reload a app

            const formData = new FormData()
            formData.append('_method', 'PUT')
            if (credentials.email) {
                formData.append('email', credentials.email)
            }
            if (credentials.name) {
                formData.append('name', credentials.name)
            }
            if (credentials.nickname) {
                formData.append('nickname', credentials.nickname)
            }
            if (credentials.password) {
                formData.append('password', credentials.password)
            }
            if (credentials.photo_filename) {
                formData.append('photo_filename', credentials.photo_filename)
            }
            
            try {
                const response = await axios.post(`/users/${user.value.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })

                await getUserDataAfterUpdate();
                
                router.push({ name: 'game' })

                return response.data
            } catch (e) {
                if (e.response) {
                    storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Signup Error!')
                } else {
                    storeError.setErrorMessages('An unexpected error occurred.')
                }
                return false
            }
        }*/

        const updateProfile = async (credentials) => {
            const payload = {}

            // Conditionally add fields to the payload
            if (credentials.email) {
                payload.email = credentials.email
            }
            if (credentials.name) {
                payload.name = credentials.name
            }
            if (credentials.nickname) {
                payload.nickname = credentials.nickname
            }
            if (credentials.photo_filename) {
                payload.photo_filename = credentials.photo_filename // Base64 encoded image
            }
            console.log(payload);
            try {
                const response = await axios.put(`/users/${user.value.id}`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log(response.data);
                await getUserDataAfterUpdate();
        
                router.push({ name: 'myprofile' });

                toast({
                    description: 'Account info has been updated correctly!',
                    })
                    
                
                return response.data
            } catch (e) {
                console.log(e);
                if (e.response) {
                    storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Update Profile Error!')
                } else {
                    storeError.setErrorMessages('An unexpected error occurred.')
                }
                return false
            }
        }

        const updateProfilePassword = async (password) => {
            const payload = {}

            // Conditionally add fields to the payload
            if (password) {
                payload.password = password
            }
            
            //console.log(payload);
            try {
                const response = await axios.put(`/users/${user.value.id}`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log(response.data);
                await getUserDataAfterUpdate();
        
                router.push({ name: 'myprofile' });

                toast({
                    description: 'Password has been updated correctly!',
                    })
                
                return response.data
            } catch (e) {
                console.log(e);
                if (e.response) {
                    storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Update Profile Error!')
                } else {
                    storeError.setErrorMessages('An unexpected error occurred.')
                }
                return false
            }
        }

        const getUserDataAfterUpdate = async () => {
            try {
                const response = await axios.get('users/me')
                user.value = response.data.data
                return user.value
            } catch (e) {
                clearUser()
                storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Authentication Error!')
                return false
            
            }
        }
    

    return {
        user, userName, userFirstLastName, userEmail, userType, userGender, userPhotoUrl, gamesWon, nickname, balance,
        login, logout, restoreToken, canUpdateDeleteProject, signup, updateProfile, validatePassword, updateProfilePassword
    }
})

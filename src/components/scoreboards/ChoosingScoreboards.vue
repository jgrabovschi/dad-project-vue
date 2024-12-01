<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const storeAuth = useAuthStore()

const globalOptions = ref(false)
const personalOptions = ref(false)

const showGlobal = () => {
    globalOptions.value = true
    personalOptions.value = false
}

const showPersonal = () => {
    globalOptions.value = false
    personalOptions.value = true
}

</script>

<template>
  <div class="flex justify-center items-center p-4">
    <Card class="w-full max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md">
      <CardHeader class="px-4">
        <CardTitle class="text-lg md:text-xl text-black dark:text-white">Scoreboards</CardTitle>
        <CardDescription class="text-sm md:text-base">Choose a scoreboard to see the results. You need to log in to see personal scoreboards. 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" >
          <!-- Global Scoreboards Button -->
          <div class="p-6 text-white rounded-lg shadow-lg cursor-pointer bg-blue-400" @click="showGlobal">
            <svg 
                    class="mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="white"
                    opacity="0.7"
            >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/>
            </svg>
            <h2 class="text-xl font-bold text-center">Global Scoreboards</h2>
            <p class="text-sm mt-2 text-center">
              See the best players in the world.
            </p>
          </div>
          <!-- Personal scoreboards Button -->
          <div>
            <div v-if="storeAuth.user" class="p-6 text-white rounded-lg shadow-lg cursor-pointer bg-red-400" @click="showPersonal">
                <svg 
                    class="mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="white"
                    opacity="0.7"
                >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                </svg>
              <h2 class="text-xl font-bold text-center">Personal Scoreboards</h2>
              <p class="text-sm mt-2 text-center">
                See your own best personal bests.
              </p>
            </div>
            <div v-else class="relative p-6 text-white rounded-lg shadow-lg cursor-not-allowed bg-black">

                <svg
                    class="mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="white"
                    opacity="0.7"
                >
                    <path
                    d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"
                    />
                </svg>
                <h2 class="text-xl font-bold text-center">
                    Personal Scoreboards
                </h2>
                <p class="text-sm mt-2 text-center">
                    You need to log in to access this feature.
                </p>
                
            </div>

          </div>
        </div>        
        <div v-if="globalOptions" class="mt-4">
            Singleplayer: Best times for each board, Minimum turns for each board
            <br>
            Multiplayer: Top 5 most victories
        </div>
        <div v-if="personalOptions" class="mt-4">
            Singleplayer: Best times for each board, Minimum turns for each board
            <br>
            Multiplayer: Total victories, Total defeats  
        </div>
      </CardContent>
    </Card>
  </div>    
</template>
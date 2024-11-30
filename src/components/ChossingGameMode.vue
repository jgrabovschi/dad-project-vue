<script setup>
import { ref, computed, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBoardsStore } from '@/stores/boards';
import { useRouter } from 'vue-router'


const router = useRouter()

const singlePlayerChosen = ref(false);
const multiPlayerChosen = ref(false);

const boardsStore = useBoardsStore()
boardsStore.loadBoards()

const clickSingle = () =>{
    singlePlayerChosen.value = true;
    multiPlayerChosen.value = false;
}

const clickMulti = () =>{
    singlePlayerChosen.value = false;
    multiPlayerChosen.value = true;
}

const startGame = (board) =>{
    //router.push({ name: 'game', params: { username: 'erina' } })
    router.push({ name: 'game'})
    //console.log(board)
}

</script>



<template>
    <div class="flex flex-col justify-center items-center p-4 space-y-6">
      <!-- First Card: Game Mode Selection -->
      <Card class="w-full max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md">
        <CardHeader class="px-4">
          <CardTitle class="text-lg md:text-xl text-black dark:text-white">Choose Game Mode</CardTitle>
          <CardDescription class="text-sm md:text-base">
            Select a game mode to start playing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- Singleplayer Button -->
            <div @click="clickSingle" class="p-6 text-white rounded-lg shadow-lg cursor-pointer"
              :class="{
                'bg-blue-500 hover:bg-blue-600': !singlePlayerChosen,
                'bg-blue-800': singlePlayerChosen
              }">
              <h2 class="text-xl font-bold">Singleplayer</h2>
              <p class="text-sm mt-2">
                Play on your own and challenge yourself.
              </p>
            </div>
            <!-- Multiplayer Button -->
            <div @click="clickMulti" class="p-6 text-white rounded-lg shadow-lg cursor-pointer"
              :class="{
                'bg-green-500 hover:bg-green-600': !multiPlayerChosen,
                'bg-green-800': multiPlayerChosen
              }">
              <h2 class="text-xl font-bold">Multiplayer</h2>
              <p class="text-sm mt-2">
                Challenge others in a battle of brains and memory.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
  
      <!-- Second Card: Board Selection -->
      <Card v-show="singlePlayerChosen || multiPlayerChosen" class="w-full max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md">
        <CardHeader class="px-4">
          <CardTitle class="text-lg md:text-xl text-black dark:text-white">Choose the Board</CardTitle>
          <CardDescription class="text-sm md:text-base">
            Select the type of board that you want to play.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            <!-- Board Button -->
            <div v-for="board in boardsStore.boards" @click="startGame(board)" class="p-4 bg-gray-500 hover:bg-gray-600 text-white text-center rounded-lg shadow-md cursor-pointer">
              <h2 class="text-lg font-bold">{{ board.board_cols +'x'+ board.board_rows}} Board</h2>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
</template>

  
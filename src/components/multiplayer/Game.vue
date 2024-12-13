<script setup>
import { ref, computed, watch } from 'vue'
import Card from '@/components/Card.vue'
import { inject } from 'vue' 
import { useRoute, useRouter } from 'vue-router'
import {  } from 'vue-router'
import { Card as CardComponent } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import { useMultiplayerGamesStore } from '@/stores/multiplayerGames'
import axios from 'axios';
//import { useStopwatch } from 'vue-timer-hook';


const storeAuth = useAuthStore()
const storeError = useErrorStore()
const storeGames = useMultiplayerGamesStore()

const props = defineProps({
    game: {
        type: Object,
        required: true
    }
})

const route = useRoute()
const router = useRouter()

/*const game_id = ref(null);
const board_cols = ref(null);
const board_rows = ref(null);
*/
const lastMoveDone = ref(999);
//STOPWATCH SHITTTTTTTTTTTTTTTTTTTTTTTTTTTTT


const startTime = ref(null); // When the stopwatch starts
const elapsedTime = ref(0); // Elapsed time in milliseconds
const isRunning = ref(false);
let intervalId = null;

// Compute formatted time
const formattedTime = computed(() => {
      const totalSeconds = elapsedTime.value / 1000; // Convert milliseconds to seconds
      return totalSeconds.toFixed(2); // Keep 3 decimal places for milliseconds
  });

// Start the stopwatch
const start = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    startTime.value = Date.now() - elapsedTime.value; // Account for paused time
    intervalId = setInterval(updateElapsedTime, 10);
  }
};

// Update the elapsed time
const updateElapsedTime = () => {
  elapsedTime.value = Date.now() - startTime.value;
};

// Stop the stopwatch
const stop = () => {
  isRunning.value = false;
  clearInterval(intervalId);
};

//STOP WATCH SHIT STOPS NOWWWWWWWWWWWWWWWWWWWWWWWWW


const gameInterrupted = computed(() => {
        return (formattedTime.value - lastMoveDone.value) >= 20 
})

const gameAlert = inject('gameAlert') 
//isto provalmente vai para dentro do composoble

const flipCard = (card) => {
    
    //meter aqui um emit
    storeGames.play(props.game,
      { 
        row: card.row,
        col: card.col,
      }
    )
}

const goToGamehistory = () =>{
    
  gameAlert.value.dissapearAlert()
  router.push('myprofile')
}

start()
console.log("gameboard aqui")
console.log(props.game)
const pairsFound = computed(() => {
  //console.log(storeGames.playerNumberOfCurrentUser(props.game))
  if(storeGames.playerNumberOfCurrentUser(props.game) == 1){
    return props.game.pairsFoundPlayerOne;
  }
  
  if(storeGames.playerNumberOfCurrentUser(props.game) == 2){
    return props.game.pairsFoundPlayerTwo;
  }  
  
});

const isMyTurn = computed(() => {
  return storeGames.playerNumberOfCurrentUser(props.game) == props.game.currentPlayer
  
});


watch(isMyTurn, (newValue, oldValue) => {
  if(newValue === true){
    
    lastMoveDone.value = formattedTime.value
    console.log(lastMoveDone.value)
  }else{
    lastMoveDone.value = 999
  }
});

watch(gameInterrupted, (newValue, oldValue) => {
  if(gameInterrupted === true){
    //codigo aqui para chamer no auth do multiplayer game
  }
});

if(storeGames.playerNumberOfCurrentUser(props.game) == props.game.currentPlayer){
  lastMoveDone.value = formattedTime.value
}

</script>

<template>
  <div class="flex justify-center items-center p-4">
    <CardComponent class="max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md p-4">
      <div class="text-center">
        <p class="text-black dark:text-white mb-4 text-xl">Game</p>
        <p class="text-black dark:text-white mb-4 text-xl">{{ formattedTime }}</p>
        <p v-if="isMyTurn" class="text-black dark:text-white mb-4 text-xl">Your turn</p>
        <p v-else class="text-black dark:text-white mb-4 text-xl">Opponnent Turn</p>
        <p class="text-black dark:text-white mb-4 text-xl">Pairs Found: {{ pairsFound }}</p>
        <p v-if="gameInterrupted" class="text-black dark:text-white mb-4 text-xl" >PARASTE DE JOGAR DUMBFUCK</p>
        <!-- Grid container with dynamic columns -->
        <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${game.board_id.board_cols}, minmax(0, 1fr))` }">
          <!-- Iterate over rows -->
          <div 
            v-for="cardsRow in game.board" 
            :key="cardsRow[0]?.id"
            class="contents"
          >
            <!-- Iterate over cards in a row -->
            <div 
              v-for="card in cardsRow" 
              :key="card.id" 
              class="bg-white w-24 aspect-[3/4] dark:bg-gray-700 rounded p-1"
            >
              <Card 
                v-if="!card.matched" 
                :card="card" 
                @flip="flipCard" 
              />
            </div>
          </div>
        </div>
      </div>
    </CardComponent>
  </div>
</template>


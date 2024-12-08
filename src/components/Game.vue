<script setup>
import { ref, computed, watch } from 'vue'
import Card from './Card.vue'
import { inject } from 'vue' 
import { useRoute, useRouter } from 'vue-router'
import {  } from 'vue-router'
import { Card as CardComponent } from '@/components/ui/card'
import { useMemoryGame } from '../composables/memoryGame.js'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import axios from 'axios';
//import { useStopwatch } from 'vue-timer-hook';


const storeAuth = useAuthStore()
const storeError = useErrorStore()

const route = useRoute()
const router = useRouter()

const game_id = ref(null);
const board_cols = ref(null);
const board_rows = ref(null);
const lastMoveDone = ref(0);

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

game_id.value = route.query?.game_id ?? null;
board_cols.value = route.query?.board_cols ?? 3;
board_rows.value = route.query?.board_rows ?? 4;
//mudar para int. util
if((typeof board_cols.value) === "string"){
  board_cols.value = parseInt(board_cols.value)
  board_rows.value = parseInt(board_rows.value)
}

const {
    status,
    currentPlayer: player,
    cardsImages,
    pairsFound,
    gameWon,
    startGame
} = useMemoryGame(board_rows.value, board_cols.value)

const gameAlert = inject('gameAlert') 
//isto provalmente vai para dentro do composoble

const isMyTurn = ref(true);

let flippedPair = []

const resetTurn = () =>{
    lastMoveDone.value = formattedTime.value;
    isMyTurn.value = true;
}

const flipCard = (card) => {
    
    if(!isMyTurn.value || card.matched || card.flipped){
      return;
    }

    card.flipped = !card.flipped

    flippedPair.push(card)
    if (flippedPair.length === 2) {
        isMyTurn.value = false;
        console.log(flippedPair[0])
        console.log(flippedPair[1])
        if (flippedPair[0].pair_id === flippedPair[1].pair_id 
                && flippedPair[0].id !== flippedPair[1].id) {
            pairsFound.value = pairsFound.value + 1;
            setTimeout(() => {
              flippedPair[0].matched = true
              flippedPair[1].matched = true
              flippedPair.splice(0, 2)
              resetTurn()
            }, 2000);
        }else{
          setTimeout(() => {
            flippedPair[0].flipped = false
            flippedPair[1].flipped = false
            flippedPair.splice(0, 2)
            resetTurn()
        }, 2000);
        }
        
    }
    lastMoveDone.value = formattedTime.value;
}

const goToGamehistory = () =>{
    
  gameAlert.value.dissapearAlert()
  router.push('myprofile')
}

startGame(board_rows.value , board_cols.value)

console.log(cardsImages.value)

start()


watch(gameWon, (newValue, oldValue) => {
  if (newValue === true) {
    stop()
    gameAlert.value.open(
      goToGamehistory,  
        'Congratulations!', 
        `You Cleared The board in ${formattedTime.value} and in xx turns.
        You will be redirected to game mode page in approximately 5 seconds. You can see the stats of your game in the game history`
    )

    if(storeAuth.user != null){
      try {
        const payload = {
          status: 'E',
          total_time: formattedTime.value
        };
        console.log(game_id.value)
        const response = axios.put(`/games/${game_id.value}`,payload)
        .then((response) => {
            //isto é um sleep
          new Promise(r => setTimeout(r, 5000))
          .then(() =>{
            gameAlert.value.dissapearAlert()
            router.push({ name: 'gameMode'})
          })
        });

    } catch (e) {
        console.log(e);
        storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Games Error!')
    }
    }
    
  }
});
console.log(gameInterrupted.value)
watch(gameInterrupted, (newValue, oldValue) => {
  if (newValue === true) {
    stop()
    gameAlert.value.open(
      goToGamehistory,  
        'Stop the playing', 
        `You didnt make a move in 20 seconds your game will be interrupted
        Next time PLAY THE FUCKING GAME YOU BEATIFULL PERSON. You will be
        redirect to the gameMode menu in approximately 5 seconds`
    )

    if(storeAuth.user != null){
      try {
        /*const payload = {
        created_user_id: storeAuth.user.id,
        type: 'S',
        board_id: board.id,
        status: 'E'
        };*/
        const payload = {
          status: 'I',
          total_time: formattedTime.value
        };
        console.log(game_id.value)
        const response = axios.put(`/games/${game_id.value}`, payload)
        .then((response) => {
            
          //isto é um sleep
          new Promise(r => setTimeout(r, 5000))
          .then(() =>{
            gameAlert.value.dissapearAlert()
            router.push({ name: 'gameMode'})
          })
            
        });

      } catch (e) {
          console.log(e);
          storeError.setErrorMessages(e.response.data.message, e.response.data.errors, e.response.status, 'Getting Games Error!')
      }
    }
    
  }
});



</script>

<template>
  <div class="flex justify-center items-center p-4">
    <CardComponent class="max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md p-4">
      <div class="text-center">
          <p class="text-black dark:text-white mb-4 text-xl">Game</p>
          <p class="text-black dark:text-white mb-4 text-xl">{{ formattedTime }}</p>
          <div class="flex items-center gap-2">
              <!-- Iterate over rows -->
              <div 
                  v-for="cardsRow in cardsImages" 
                  :key="cardsRow[0]?.id" 
                  class="flex-col gap-2 "
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
                          :turn="isMyTurn"
                      />
                  </div>
              </div>
          </div>
      </div>
    </CardComponent>
  </div>
</template>

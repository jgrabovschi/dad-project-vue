<script setup>
import { ref, computed, watch } from 'vue'
import Card from './Card.vue'
import { inject } from 'vue' 
import { useRoute, useRouter } from 'vue-router'
import {  } from 'vue-router'
import { Card as CardComponent } from '@/components/ui/card'
import { useStopwatch } from 'vue-timer-hook';
import { useMemoryGame } from '../composables/memoryGame.js'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import axios from 'axios';


const storeAuth = useAuthStore()
const storeError = useErrorStore()

const route = useRoute()
const router = useRouter()

const game_id = ref(null);
const board_cols = ref(null);
const board_rows = ref(null);

game_id.value = route.query?.game_id ?? null;
board_cols.value = route.query?.board_cols ?? 3;
board_rows.value = route.query?.board_rows ?? 4;
//mudar para int. util
if((typeof board_cols.value) === "string"){
  board_cols.value = parseInt(board_cols.value)
  board_rows.value = parseInt(board_rows.value)
}

//tamanho do board isto está hardcoded para 3x4
const size = ref(null);
size.value = game_id.value != null ? board_cols.value * board_rows.value : 12;

const {
    status,
    currentPlayer: player,
    cardsImages,
    pairsFound,
    gameWon,
    startGame
} = useMemoryGame(board_rows.value, board_cols.value)

const alertDialog = inject('alertDialog') 
//isto provalmente vai para dentro do composoble

const isMyTurn = ref(true);

let flippedPair = []

const resetTurn = () =>{
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
}

const goToGamehistory = () =>{
  router.push('myprofile')
}

startGame(board_rows.value , board_cols.value)

console.log(cardsImages.value)

const autoStart = true;
const stopwatch = useStopwatch(autoStart);

const showSeconds = computed(() => {
  return stopwatch.seconds.value + ( 60 * stopwatch.minutes.value);
})



watch(gameWon, (newValue, oldValue) => {
  if (newValue === true) {
    stopwatch.pause()
    alertDialog.value.open( 
      goToGamehistory,  
        'Are you sure?', 'Cancel', `Yes, delete task #` + showSeconds.value, 
        `This action cannot be undone. This will permanently delete the task 
        " from our servers.`) 

    if(storeAuth.user != null){
      try {
        /*const payload = {
        created_user_id: storeAuth.user.id,
        type: 'S',
        board_id: board.id,
        status: 'E'
        };*/
        console.log(game_id.value)
        const response = axios.put(`/games/${game_id.value}`)
        .then((response) => {
            //console.log(response.data.data)
            //fazer update das coins visualmente
            router.push({ name: 'gameMode'})
            /* fazer aqui o depois
            
            isLoading.value = false
            return response*/
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
          <p class="text-black dark:text-white mb-4 text-xl">{{ showSeconds }}</p>
          <!--<p class="text-black dark:text-white mb-4 text-xl">{{ game_id }}</p>
          <p class="text-black dark:text-white mb-4 text-xl">{{ board }}</p>-->
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

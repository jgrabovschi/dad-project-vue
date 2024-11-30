<script setup>
import { ref, computed, watch } from 'vue'
import Card from './Card.vue'
import { inject } from 'vue' 
import { useRouter } from 'vue-router'
import { Card as CardComponent } from '@/components/ui/card'

const router = useRouter()

//tamanho do board isto está hardcoded para 3x4
var size = 12
const cardsImages = ref([])
const pairsFound = ref(0);

const alertDialog = inject('alertDialog') 

const gameWon = computed(() => {
  return pairsFound.value == size/2 ? true : false
})
const isMyTurn =ref(true);
const nrCardsFlippedPerTurn = ref(0);

function generateRandomPairs(x) {
  //min e max de imagem de cartas. cada numero é um par de cartas
  const min = 1;
  const max = 40;
  const uniqueNumbers = new Set();

  // Gera `x` números únicos
  while (uniqueNumbers.size < x /2 ) {
    //linha a seguir devo conseguir reduzir
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  // Converte os números únicos em um array com pares (duplicados)
  const pairsArray = [...uniqueNumbers, ...uniqueNumbers];

  console.log(pairsArray)

  // Embaralha o array de pares
  for (let i = pairsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
  }

  return pairsArray;
}

function transformToXY(array, x, y) {
  if (array.length !== x * y) {
    throw new Error("The size of the array must be equal to x * y");
  }

  const matrix = [];
  for (let i = 0; i < x; i++) {
    matrix.push(array.slice(i * y, i * y + y));
  }
  return matrix;
}

const pairs = generateRandomPairs(size);
console.log(pairs);

for (var i = 0; i < size ; i++) {
    cardsImages.value.push({
        id: i,
        pair_id: pairs[i],
        src: `/cards/${pairs[i]}.png`,
        flipped: false,
        matched: false
    })
}

cardsImages.value = transformToXY(cardsImages.value, 4, 3)

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
watch(gameWon, (newValue, oldValue) => {
  if (newValue === true) {
    alertDialog.value.open( 
      goToGamehistory,  
        'Are you sure?', 'Cancel', `Yes, delete task #`, 
        `This action cannot be undone. This will permanently delete the task 
        " from our servers.`) 
  }
});

</script>

<template>
  <div class="flex justify-center items-center p-4">
    <CardComponent class="max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md p-4">
      <div class="text-center">
          <p class="text-black dark:text-white mb-4 text-xl">Game</p>
          <div class="flex-col items-center gap-2">
              <!-- Iterate over rows -->
              <div 
                  v-for="cardsRow in cardsImages" 
                  :key="cardsRow[0]?.id" 
                  class="flex gap-2"
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

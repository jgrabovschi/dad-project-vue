<script setup>
import { ref, computed } from 'vue'
import Card from './Card.vue'

var size = 12
const cardsImages = ref([])
var id = null

function generateRandomPairs(x) {
  const min = 1;
  const max = 40;
  const uniqueNumbers = new Set();

  // Gera `x` números únicos
  while (uniqueNumbers.size < x /2 ) {
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

for (var i = 0; i < size ; i++) {
    cardsImages.value.push({
        id: i,
        pair_id: pairs[i],
        src: `/src/assets/cards/${pairs[i]}.png`,
        flipped: false,
        matched: false
    })
}

cardsImages.value = transformToXY(cardsImages.value, 4, 3)

let flippedPair = []

const flipCard = (card) => {
    flippedPair.push(card)
    if (flippedPair.length === 2) {
        console.log(flippedPair)
        if (flippedPair[0].pair_id === flippedPair[1].pair_id 
                && flippedPair[0].id !== flippedPair[1].id) {
            flippedPair[0].matched = true
            flippedPair[1].matched = true
        }
        setTimeout(() => {
            flippedPair[0].flipped = false
            flippedPair[1].flipped = false
            flippedPair.splice(0, 2)
        }, 2000);
    }
}


</script>

<template>
  <div class="rounded-lg bg-white dark:bg-gray-800 h-fit w-fit mt-14">
    <div>
        <p class="text-black dark:text-white p-8 text-xl text-center" >Game</p>
        <div class="flex justify-center">
            <div v-for="cardsRow in cardsImages" class="md:w-auto justify-center p-0">
                <div v-for="card in cardsRow" :key="card.id" class="bg-white w-10 overflow-auto sm:w-14 md:w-20 xl:w-32 aspect-[3/4] dark:bg-gray-700 rounded p-2 m-4 items-center">
                    <Card :card="card" @flip="flipCard"/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
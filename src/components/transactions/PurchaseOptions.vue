<script setup>
import { useRoutingStore } from '@/stores/routing';
const routing = useRoutingStore();
const purchasePack = (pack) => {
    routing.route = {
        name: 'PaymentForm',
        params: { pack: pack },
    }
}
</script>

<template>
<div class="w-10/12 max-w-5xl mx-auto max-h-screen rounded-lg bg-white flex flex-col shadow-md dark:bg-gray-700">
    <!-- Header -->
    <p class="mt-8 ms-8 text-xl font-bold dark:text-white">Purchase Braincoins</p>

    <div class="m-8">
        <div class="grid grid-cols-3 gap-4">
            <!-- Basic Pack -->
            <div>
                <div class="bg-zinc-200 p-4 rounded-lg shadow-md text-slate-700 dark:bg-gray-600 dark:text-white">
                    <p class="font-bold text-center">Basic Pack</p>
                    <p class="text-center text-2xl font-semibold mt-2">500 Braincoins</p>
                    <p class="text-center text-lg mt-1">4.99€</p>
                    <button @click="purchasePack('B')" class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>
            
            <!-- Standard Pack -->
            <div>
                <div class="bg-zinc-200 p-4 rounded-lg shadow-md text-slate-700 dark:bg-gray-600 dark:text-white">
                    <p class="font-bold text-center">Standard Pack</p>
                    <p class="text-center text-2xl font-semibold mt-2">1000 Braincoins</p>
                    <p class="text-center text-lg mt-1">9.99€</p>
                    <button @click="purchasePack('S')" class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>

            <!-- Premium Pack -->
            <div>
                <div class="bg-zinc-200 p-4 rounded-lg shadow-md text-slate-700 dark:bg-gray-600 dark:text-white">
                    <p class="font-bold text-center">Premium Pack</p>
                    <p class="text-center text-2xl font-semibold mt-2">2500 Braincoins</p>
                    <p class="text-center text-lg mt-1">19.99€</p>
                    <button @click="purchasePack('P')" class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>            
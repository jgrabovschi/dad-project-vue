<script setup>
import { useRoutingStore } from '@/stores/routing';
import { ref } from 'vue';
const routing = useRoutingStore();
const payementOptionsMaximum = {
    paypal_max: 10,
    iban_max: 50,
    mb_max: 20,
    visa_max: 30
} 
const packPrices = {
    B: 5,
    S: 10,
    P: 20
};
const packNames = {
    B: "Basic",
    S: "Standard",
    P: "Premium"
}
const errorMessage = ref("")
const payment_reference = ref("")
const paymentMethod = ref("")
let teste = "teste"




const validatePayment = () => {
    if (paymentMethod.value == "mbway") {
        if (payment_reference.value == "" || isNaN(mbway.value) || payment_reference.value.match(/^9\d{8}$/) == null) {
            errorMessage.value = "Invalid MBWAY number"
        }
    } else if (paymentMethod.value == "paypal") {
        if (payment_reference.value == "" || payment_reference.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) == null) {
            errorMessage.value = "Invalid Paypal number"
        }
    } else if (paymentMethod.value == "iban") {
        if (payment_reference.value == "" || payment_reference.value.match(/^[a-zA-Z]{2}\d{23}$/) == null) {
            errorMessage.value = "Invalid IBAN number"
        }
    } else if (paymentMethod.value == "mb") {
        if (payment_reference.value == "" || payment_reference.value.match(/^\d{5}-\d{9}$/) == null) {
            errorMessage.value = "Invalid MB number"
        }
    } else if (paymentMethod.value == "visa") {
        if (payment_reference.value == "" || payment_reference.value.match(/^4\d{15}$/) == null) {
            errorMessage.value = "Invalid VISA number"
        }
    }
    return true
}


</script>

<template>
<div class="w-10/12 max-w-5xl mx-auto max-h-screen rounded-lg bg-white flex flex-col shadow-md dark:bg-gray-700">
    <!-- Header -->
    <p class="mt-8 ms-8 text-xl font-bold dark:text-white">Payment Details</p>
</div>
</template>            
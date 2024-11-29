<script setup>
    import { defineProps } from 'vue'

    const props = defineProps(['card'])

    const emits = defineEmits(['flip'])

    const backOfCard = '/cards/semFace.png'

    const flip = () => {
        
        emits('flip', props.card)
    }

</script>
<template>
    <img :src="card.flipped || card.matched? card.src : backOfCard" alt="card" @click="flip" />
</template>
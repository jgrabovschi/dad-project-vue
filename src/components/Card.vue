<script setup>
    import { defineProps } from 'vue'

    const props = defineProps(['card'])

    const emits = defineEmits(['flip'])

    const backOfCard = '/cards/semFace.png'

    const flip = () => {
        props.card.flipped = !props.card.flipped
        if (props.card.matched || !props.card.flipped) return
        emits('flip', props.card)
    }

</script>
<template>
    <img :src="card.flipped || card.matched? card.src : backOfCard" alt="card" @click="flip" />
</template>
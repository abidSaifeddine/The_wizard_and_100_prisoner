<template>
    <div class="top">
        <img id="wizard" :src="currentImage" alt="">
        <img id="header" src="../assets/images/header.svg" alt="">
        <p id="content">
            {{ currentContent }}
        </p>

        <img
                v-on:click="showHint"
                id="hint" src="../assets/images/hint.png" alt="hint">
    </div>
</template>
<script>
    import EventBus from "@/components/EventBus";

    /**
     * a component that holds information about the riddle
     */
    export default {
        name: 'HeaderComponent',
        props: {
            currentContent: {},
            currentImage: {}
        },
        methods: {
            //send an event to show the hints to the user, the event will be received in App.vue
            showHint: function () {
                EventBus.$emit('showHint');
            }
        }
    }
</script>
<style>


    .top {
        position: absolute;
    }

    #hint {
        position: absolute;
        top: 30px;
        right: 60px;
        cursor: pointer;
        height: 100px;
        width: 100px;
    }

    #wizard {
        position: absolute;
        top: 20px;
        left: 90px;
        width: 300px;
        height: 300px;
    }

    #content {
        position: absolute;
        top: 10px;
        left: 40%;
        right: 300px;
        font-size: 25px;
        height: 100%;
    }

    #header {
        width: 100%;
    }

    .top-left svg {
        position: relative;
        top: 0;
        left: 0;
        z-index: -1;
    }

    #steps-container h3 {
        margin: 0;
    }


</style>

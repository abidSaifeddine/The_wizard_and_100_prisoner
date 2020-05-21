<template>
    <div v-if="show">

        <div class="modal-overlay" id="modal-overlay" v-on:click="hide"></div>

        <div class="modal" id="modal">
            <div class="modal-content">
                <div class="bubble bubble-bottom-left">
                    {{ content }}
                </div>
                <img v-bind:src="image_src" alt="">

            </div>
        </div>

    </div>
</template>
<script>
    /**
     * a component to display messages to the user either for the game results or for the hints
     */
    export default {
        name: 'OverlayMessage',
        props: {
            content: {},
            hide: {},
            image_src: {},
            show: {}
        }
    }
</script>
<style>
    * {
        font-family: 'Montserrat', sans-serif;
        letter-spacing: .05rem;
    }

    html {
        height: 100%;
        background: #ecf0f2;
    }

    body {
        margin: 0;
        padding: 0;
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

    .modal {
        display: block;

        width: 600px;
        max-width: 100%;

        height: 400px;
        max-height: 100%;

        position: fixed;

        z-index: 100;

        left: 40%;
        top: 40%;


    }


    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;

        background: rgba(0, 0, 0, 0.6);
    }

    .modal-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;

    }

    .modal-content > img {
        position: absolute;
        top: 80px;
        height: 150px;
        width: 150px;
    }


    .bubble {
        position: absolute;
        top: 0;
        left: 50px;
        opacity: 0.8;
        font-family: sans-serif;
        font-size: 18px;
        line-height: 24px;
        width: 300px;
        background: #fff;
        border-radius: 40px;
        padding: 24px;
        text-align: center;
        color: #000;
        margin-left: 50px;
    }

    .bubble-bottom-left:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 24px solid #fff;
        border-right: 12px solid transparent;
        border-top: 12px solid #fff;
        border-bottom: 20px solid transparent;
        left: 32px;
        bottom: -24px;
    }
</style>

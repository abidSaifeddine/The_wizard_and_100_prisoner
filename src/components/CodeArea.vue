<template>
   <div>
       <ul>
           <li>Prisoners can't talk to each other once they've agreed on a strategy</li>



           <li>You can declare your own variables <b>only</b> in the variables section by calling <b>vs._yourVariable = value; instead of let _yourVariables = value;</b></li>
           <li>You have access to the <b>prisoners[]</b> array, selecting a prisoner would be : <b>prisoner[Number]</b>;</li>
       </ul>
       <div class="box">
           <h3>Your variables goes here</h3>
           <textarea v-model="variables" name="comment" id="vars" placeholder="ex: variables.x = 2;" style="min-height: 4rem"></textarea>
       </div>
       <ul>
           <li>It will be a loop, on each iteration,
               a prisoner goes to the room randomly and you can make him change the status of the switch
               by calling the <b>switchSwitch(prisonerInRoom.index) function</b>, this function will also set the prisonerInRoom attribute <b>switched</b> to true
           </li>
           <li>Your code will be included in this loop, on each iteration you will have access to prisonerInRoom = { index, switched }
               <br>and _switch variables, the <b>_switch</b> variable holds the switch state (true/false)</li>
           <li>When you call the switchSwitch function, make sure to pass in the prisonerInRoom as parameter</li>
           <li>Once you are sure all of the prisoners have been in the special room, you can call the <b>release()</b> function;</li>
       </ul>
       <div class="box">
           <h3>Your strategy goes here</h3>
           <textarea v-model="code" name="comment" id="comment" placeholder="Type your code here..."></textarea>
       </div>
       <button v-on:click="submit" id="submit">Submit</button>

   </div>
</template>

<script>
    import EventBus from "@/components/EventBus";

    /**
     * A component that holds the code written by the user,
     * the submit button sends the code to the App.vue component
     * for code evaluation
     */
    export default {
        name: "CodeArea",
        methods: {
            submit() {
                // an event that holds arguments = {variables, code} that the App.vue component will receive and evaluate
                EventBus.$emit('submit', {variables: this.variables, code: this.code})
            }
        },
        data() {
            return {
                variables: '',
                code: ''
            }
        }
    }
</script>

<style scoped>




    .box {
        display: block;
        width: 80%;
        max-width: 900px;

    }

    h3 {
        font-size: 2rem;
        font-weight: 100;
    }

    textarea {
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        min-height: 25rem;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        line-height: 2rem;
        font-weight: 300;
        background:#FFFFFF;
        border: none;
        border-radius: 1rem;
        outline: none;
        box-shadow:
                18px 18px 30px #D1D9E9,
                -18px -18px 30px #FFFFFF;
        resize: vertical;
        transition: ease .2s;
        cursor: pointer;
    }

    textarea::placeholder {
        color: #9fa8da;
    }



    /* Chrome/Opera/Safari */
    ::-webkit-input-placeholder {
        color: transparent;
    }
    /* Firefox 19+ */
    ::-moz-placeholder {
        color: transparent;
    }
    /* IE 10+ */
    :-ms-input-placeholder {
        color: transparent;
    }
    /* Firefox 18- */
    :-moz-placeholder {
        color: transparent;
    }

    textarea:placeholder-shown {
        background: none;
    }
    #submit {
        -webkit-tap-highlight-color: transparent;
        width: 90px;
        min-height: 1.5rem;
        padding: 1rem;
        margin: 10px;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 300;
        background:#42b983;
        border: none;
        border-radius: 1rem;
        outline: none;
        box-shadow:
                18px 18px 30px #D1D9E9,
                -18px -18px 30px #FFFFFF;
        resize: vertical;
        transition: ease .2s;
        cursor: pointer;
    }
</style>

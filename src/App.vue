<template>
    <div id="app">
        <!--
          Header component
        -->
        <HeaderComponent :current-content="currentContent" :current-image="currentImage"/>
        <!--
          end header component
        -->


        <!--
          steps section, when hover, a new content will reveal depending on the step
        -->
        <div id="steps">
            <div id="steps-container">
                <h3>
                    Hover Over
                </h3>
                <div class="step" @mouseover="revealContent(1)">
                    <p>
                        The wizard & the prisoners
                    </p>
                </div>
                <div class="step" @mouseover="revealContent(2)">
                    <p>
                        The way to escape
                    </p>
                </div>
                <div class="step" @mouseover="revealContent(3)">
                    <p>
                        The strategy
                    </p>
                </div>
                <div class="step" @mouseover="revealContent(4)">
                    <p>
                        Help them
                    </p>
                </div>

            </div>
        </div>
        <!--
          end steps section
        -->
        <!--
          Code area
        -->
        <div id="code">
            <CodeArea/>
        </div>
        <!--
          end code area
        -->
        <!--
         Overlay message for showing messages to the user
       -->
        <OverlayMessage :content="content" :hide="hide" :image_src="image_src" :show="show"/>
        <!--
         end Overlay message
       -->
    </div>
</template>

<script>

    import CodeArea from "@/components/CodeArea";
    import contents from "@/assets/content";
    import HeaderComponent from "@/components/HeaderComponent";
    import EventBus from "@/components/EventBus";
    import OverlayMessage from "@/components/OverlayMessage";

    export default {
        name: 'App',
        components: {
            OverlayMessage,
            HeaderComponent,
            CodeArea
        },
        data() {
            return {
                //An array holding messages to show for the user
                contents,
                //First content to display to the user
                currentContent: contents[0].title,
                //First image to display to the user
                currentImage: contents[0].src,
                //Image src for the OverlayMessage component
                image_src: '',
                //content for the OverlayMessage component
                content: '',
                //controlling the displaying of the OverlayMessage
                show: false,
                //controlling the user's hints
                hint_count: 0,
                //stopping the loop when release function is called
                releaseCalled: false
            }
        },
        mounted() {
            //accessing The data object
            let self = this;
            //Listening for showHint event to show hints to the user
            EventBus.$on('showHint', function () {
                //user is only allowed 3 hints
                if (self.hint_count < 3) {
                    //The hints's content in the contents array starts from index 5
                    self.image_src = contents[self.hint_count + 5].src;
                    self.content = contents[self.hint_count + 5].title;

                    self.hint_count++;
                } else {
                    self.image_src = contents[5].src;
                    self.content = 'You have no hints left';
                }
                self.show = true;
            });
            //Listening for the submit event to be triggered
            EventBus.$on('submit', function (args) {
                //The counter hidden of the user to prevent him from cheating
                let the_game_s_counter = 0;
                //Holding days that prisoner have been in captivity
                let days = 0;

                /**
                 *Starting game OverlayMessage
                 */
                self.image_src = contents[0].src;
                self.content = 'LET THE GAME BEGINS, please wait...';
                self.show = true;

                /**
                 *End starting game OverlayMessage
                 */


                //The function that will turn on or off the switch and do the secret counting
                // eslint-disable-next-line no-unused-vars
                function switchSwitch(prisoner) {
                    prisoners[prisoner].switched = true;
                    the_game_s_counter++;
                    _switch = !_switch;
                }

                //The release function that will display the result to the user
                // eslint-disable-next-line no-unused-vars
                function release() {
                    //this will stop the random picking
                    self.releaseCalled = true;
                    /**
                     *the_game_s_counter should be 198 : The counter prisoner must of had switched the switch 99 times
                     * Other prisoner must turn on the switch 99 times, each prisoner does the action only once
                     * if the_game_s_counter variables is equal to 198, and all of the prisoner has switched ==> survived
                     * if the_game_s_counter variables is less than 198, and all of the prisoner has switched ==> cheated
                     * if the_game_s_counter variables is less than 198 ==> not all of the prisoners have been there ==> died
                     * if the_game_s_counter variables is greater than 198 ==> something is wrong
                     */
                    if (the_game_s_counter === 198 && prisoners.every((e) => e.switched === true)) {
                        self.content = `your friends survived in ${days} days`;
                    } else if (the_game_s_counter <= 198 && prisoners.every((e) => e.switched === true)) {
                        self.content = `You cheated!!!`;
                    } else if (the_game_s_counter < 198) {
                        self.content = `your friends died in ${days} days`;
                    } else if (the_game_s_counter > 198) {
                        self.content = 'Either you cheated or your strategy is wrong';
                    }

                    self.image_src = contents[0].src;
                    self.show = true;
                }

              //init prisoners array
                let prisoners = [];
              //holding the switch's status
                let _switch = false;
              //filling the prisoners array with prisoners
                for (let i = 0; i < 100; i++) {
                    let prisoner = {
                        'index': i,
                        'switched': false
                    };
                    prisoners.push(prisoner);
                }

                // will hold users variables
                // eslint-disable-next-line no-unused-vars
                let vs = {};
                // user's variables
                eval(args.variables);
                // end user's variables

              //Loop, one iteration each 10 milliseconds // random prisoner
                const prisonersLoop = setInterval(function () {
              //120.000 * 10 milliseconds = 1.200.000 milliseconds = 20minutes
                  // if after 20 minutes the release function is never called, the system will break;
                    if (days === 120000) {
                        clearInterval(prisonersLoop);
                        self.image_src = contents[0].src;
                        self.content = `Timeout, you never asked the question`;
                        self.show = true;
                    }
                  //randomly picking a prisoner
                    let prisonerIndex = Math.floor(Math.random() * Math.floor(100));
                    // eslint-disable-next-line no-unused-vars
                    let prisonerInRoom = prisoners[prisonerIndex];
                    days++;
                    console.log(prisonerIndex, the_game_s_counter);
                    //eval user's code
                    try {
                        eval(args.code);
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            alert(e.message);
                            clearInterval(prisonersLoop);
                        }
                    }
                    //end user's code

                  //stopping the loop when the release function is called
                    if (self.releaseCalled) clearInterval(prisonersLoop);
                }, 10);


            });
            //Hide overlayMessage
            EventBus.$on('hide', function () {
                self.show = false;
            });
        },
        methods: {
          //Change the content of the header component depending on the step hovered over
            revealContent: function (index) {
                this.currentContent = contents[index].title;
                this.currentImage = contents[index].src;
            },
          //hide the Overlay Message
            hide: function () {
                this.show = false;
            }
        },

        created() {
          //Preventing the user from screening the application code
            // console.log = function () { }
        }
    }
</script>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

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


    #steps {
        position: absolute;
        top: 0;
        left: 0;
        width: 600px;
        height: 1400px;
        background: #DDA0DD;
        z-index: -2;


    }

    #steps-container {
        position: relative;
        top: 30%;
        left: 50px;
    }

    .step {
        text-align: center;
        background: #aaf;
        height: 70px;
        width: 80%;
        margin-top: 10px;
        cursor: pointer;
        border-radius: 10px;
        box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
        color: #fff;
        padding: 10px;
        transition: ease .2s;
    }

    .step:hover {
        width: 81%;
        height: 72px;
    }

    #steps-container h3 {
        margin: 0;
    }

    #code {
        position: absolute;
        top: 310px;
        right: 3%;
        width: 50%;
    }

    @media only screen and (min-width: 1367px) {
        #code {
            position: absolute;

            width: 60%;
        }
    }

    .modal-content > img {
        height: 150px;
        width: 150px;
    }


</style>

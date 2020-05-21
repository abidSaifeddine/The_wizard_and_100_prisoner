const images = require.context('./images', true, /\.png$/);

const contents = [

    {
        title: 'Welcome to the wizard and a 100 prisoners riddle',
        src: images('./wizard.png'),
    },
    {
        title: 'A wizard that likes to play strange games with the villagers, He has captured a 100 villager and put them in a 100 separate cells',
        src: images('./wizard.png'),
    },
    {
        title: 'In order to escape, the villagers have to come up with a strategy which will allow them to ask for release and that is under one condition',
        src: images('./prisoner.png'),
    },
    {
        title: 'Each and every one of the prisoners has to be entered to a special room at least once, this special room has a switch and a light ',
        src: images('./room.png'),
    },
    {
        title: 'You are required to figure out the strategy and right it as javascript code in the textarea, you also have access to three hints by clicking on the lantern',
        src: images('./strategy.png'),
    },
    {
        title: 'Hi there, you have three hints, First one is : Try to solve it (not in code area) where you have only 2 prisoners.',
        src: images('./genie.png')
    },
    {
        title: 'This is your second hint, Think of the strategy as if only one prisoner will do the counting, while you have access to the prisoners array, you can choose one',
        src: images('./genie.png')
    }
    ,
    {
        title: 'Final Hint: Your prisoner Counter does not have to count him self',
        src: images('./genie.png')
    }

];
export default contents;

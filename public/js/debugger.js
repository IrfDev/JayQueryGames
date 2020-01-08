const holes = $('.hole')
const score = $('#debugger .score')
const bug = $('.bug')
const welcome = $('#debugger .welcome')
const instructions = $('#debugger .instructions')
var minTime = 0

let lastHole;
let finishedTime = false;
let scoreCounter = 0



$('#startDebugger').on('click', startDebugger)
$('#restartDebugger').on('click', restartGame)

function startDebugger() {
    let difficulty = $('#difficulty').val() * 300
    let maxValue = $('#difficulty').attr('max')
    minTime = Math.abs(Math.floor((difficulty) - (maxValue)))
    startGame()
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const randomNumber = Math.floor(Math.random() * holes.length)
    const hole = holes[randomNumber]
    if (hole === lastHole) {
        return randomHole(holes)
    }
    lastHole = hole
    return hole
}

function peep() {
    const time = randomTime(200, (minTime + 1))
    const hole = randomHole(holes)
    const holeChildren = $(hole).children()
    $(holeChildren).addClass('up')
    console.log(holeChildren)
    setTimeout(() => {
        $(holeChildren).removeClass('up')
        if (!finishedTime) peep()
    }, time)
}

function startGame() {
    score.text(0)
    finishedTime = false
    scoreCounter = 0
    peep()
    setTimeout(() => finishedGame(), 10000)
    welcome.css("display", "none")
    instructions.append(`
    <h2>Smashed those bugs!! </h2>
    <div>
    <h2 class="score"></h2>
</div>
    `)
}

function hitIt() {
    scoreCounter++;
    $(this).removeClass('up')
    if (scoreCounter === 1) {
        score.text(`You smashed ${scoreCounter} bug 🤪`)
    } else {
        score.text(`You smashed ${scoreCounter} bugs 🤪`)
    }
}

function finishedGame() {
    finishedTime = true
    instructions.html(`
    <h1>
    Game over! 🥳
</h1>
<h2>You just smashed ${scoreCounter} bugs</h2>
<p>Try again and beat your own record</p>
<button id="restartDebugger" onclick="restartGame()">
    Restart
    <i class="fas fa-gamepad"></i>
</button>
    `)
}


function restartGame() {
    instructions.html(`
    <h1>Let's play!</h1>
    <h2 class="welcome">Smash all the bugs you can</h2>
    <p class="welcome"> Just choose the difficulty and then click on each bug as they come from his holes</p>
    <div class="set-game welcome">
        <label for="difficulty">Pick the difficulty</label>
        <input type="range" class="custom-range" min="1" max="5" id="difficulty">
        <button id="startDebugger" onclick="startDebugger()">
         Start
         </button>
    </div>
    <div>
        <h2 class="score"></h2>
    </div>
    `)
}
$('.bug').on('click', hitIt)
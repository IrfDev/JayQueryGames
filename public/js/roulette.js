function addSuccessMessage() {
    if (resultObjects.head === 0) {
        $('#roulette .instructions').html(`
        <div class="success">
                    <img src="./assets/victory.gif" alt="" class="img-fluid">
                    <h1>¡Ganaste! 🤩</h1>
                    <h2>Lograste armar al diseñador 🤓</h2>
                    <p>Al parecer aún no descubre el significado de "métele más diseño"</p>
                </div>
    `)
    } else if (resultObjects.head === 1) {
        $('#roulette .instructions').html(`
        <div class="success">
                    <img src="./assets/victory.gif" alt="" class="img-fluid">
                    <h1>¡Ganaste! 🤩</h1>
                    <h2>Lograste armar al desarrollador 🤓</h2>
                    <p>Con el super poder de mantener la calma cuando el cliente cancela un cambio que él mismo había pedido</p>
                </div>
    `)
    } else {
        $('#roulette .instructions').html(`
        <div class="success">
                    <img src="./assets/victory.gif" alt="" class="img-fluid">
                    <h1>¡Ganaste! 🤩</h1>
                    <h2>Lograste armar al mercadólogo 🤓</h2>
                    <p>Huye antes de que comience a armar un FODA de éste juego</p>
                </div>
    `)
    }
}

$('.carousel').carousel({
    interval: 0
})

// Score
const resultObjects = {
    head: '',
    torso: '',
    leg: '',
}
const attempts = []

// Probability
var headP = $('.head').length
var torsoP = $('.torso').length
var legP = $('.leg').length


// Start heads
const heads = $('.heads')
const headsImages = [$('.head')]
const nodeHeads = $('.head')
const headsLength = nodeHeads.length

$('#startHeads').on("click", function() {
    let randomNumber = Math.floor(Math.random() * (headsLength - 0))
    const changingNode = headsImages[0][randomNumber]
    attempts.push(randomNumber)
    resultObjects.head = randomNumber

    $('.heads').append(`<p class="loader">🎩</p>`)
    setTimeout(function() {
        $('.loader').remove()
        nodeHeads.each(function() {
            $(this).removeClass('active')
        })
        changingNode.classList.add('active')
    }, 3000)


    // Probability
    if (randomNumber === resultObjects.torso) {
        headP = 1
        torsoP = 1
    } else if (randomNumber === resultObjects.leg) {
        headP = 1
        legP = 1
    } else {
        headP = headsLength
    }


})

// Start torso
const torsos = $('.torsos')
const torsosImages = [$('.torso')]
const nodeTorsos = $('.torso')
const torsosLength = nodeTorsos.length

$('#startTorsos').on("click", function(e) {
    let randomNumber = Math.floor(Math.random() * (torsosLength - 0))
    const changingNode = torsosImages[0][randomNumber]
    attempts.push(randomNumber)
    resultObjects.torso = randomNumber

    $('.torsos').append(`<p class="loader">👕</p>`)
    setTimeout(function() {
        $('.loader').remove()
        nodeTorsos.each(function() {
            $(this).removeClass('active')
        })
        changingNode.classList.add('active')
    }, 3000)


    if (randomNumber === resultObjects.head) {
        torsoP = 1
        headP = 1
    } else if (randomNumber === resultObjects.leg) {
        torsoP = 1
        legP = 1
    } else {
        torsoP = torsosLength

    }
})

const legs = $('.legs')
const legsImages = [$('.leg')]
const nodeLegs = $('.leg')
const legsLength = nodeLegs.length

// Start Legs
$('#startLegs').on("click", function(e) {
    let randomNumber = Math.floor(Math.random() * (legsLength - 0))
    const changingNode = legsImages[0][randomNumber]
    attempts.push(randomNumber)
    resultObjects.leg = randomNumber

    $('.torsos').append(`<p class="loader">👖</p>`)
    setTimeout(function() {
        $('.loader').remove()
        nodeLegs.each(function() {
            $(this).removeClass('active')
        })
        changingNode.classList.add('active')
    }, 3000)



    if (randomNumber === resultObjects.head) {
        legP = 1
        headP = 1
    } else if (randomNumber === resultObjects.torso) {
        legP = 1
        torsoP = 1
    } else {
        legP = legsLength
    }
})


$('#startLegs,#startTorsos,#startHeads').on("click", function(e) {
    let attemptsLength = attempts.length
    const score = Math.floor(150 - attemptsLength * 10)

    let n = (headP * torsoP * legP)
    const winProbability = 1 / n
    const winPercentage = winProbability * 100
    const entireWinPercentage = Math.floor(winPercentage)

    if (attempts.length <= 3) {
        $('.score').html(`<h2>Spins: 
        <span>
           🤩 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    <div class="progress">
        <div class="progress-bar progress-bar-animated progress-bar-striped bg-success" role="progressbar" style="width: ${ entireWinPercentage}%" aria-valuenow="${ entireWinPercentage}" aria-valuemin="0" aria-valuemax="100">${entireWinPercentage} complete </div>
    </div>
    `)
    } else if (attempts.length < 6) {
        $('.score').html(`<h2>Spins: 
        <span>
           😊 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    <div class="progress">
        <div class="progress-bar progress-bar-animated progress-bar-striped bg-success" role="progressbar" style="width: ${entireWinPercentage}%" aria-valuenow="${entireWinPercentage}" aria-valuemin="0" aria-valuemax="100">${entireWinPercentage} complete</div>
    </div>  
  `)
    } else if (attempts.length < 10) {
        $('.score').html(`<h2>Spins: 
        <span>
           🙂 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    <div class="progress">
        <div class="progress-bar bg-success progress-bar-animated progress-bar-striped" role="progressbar" style="width: ${entireWinPercentage}%" aria-valuenow="${entireWinPercentage}" aria-valuemin="0" aria-valuemax="100">${entireWinPercentage} complete</div>
    </div>
    `)

    } else if (attempts.length < 12) {
        $('.score').html(`<h2>Spins: 
        <span>
           🙁 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    <div class="progress">
        <div class="progress-bar bg-success progress-bar-animated progress-bar-striped" role="progressbar" style="width: ${entireWinPercentage}%" aria-valuenow="${entireWinPercentage}" aria-valuemin="0" aria-valuemax="100">${entireWinPercentage} complete</div>
    </div>
    `)
    } else if (attempts.length < 15) {
        $('.score').html(`<h2>Spins: 
        <span>
           😱 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    <div class="progress">
        <div class="progress-bar bg-success progress-bar-animated progress-bar-striped" role="progressbar" style="width: ${entireWinPercentage}%" aria-valuenow="${entireWinPercentage}" aria-valuemin="0" aria-valuemax="100">${entireWinPercentage} complete</div>
    </div>
    `)
    } else {
        $('.instructions').html(`<h2>Spins: 
        <span>
           😭 ${attemptsLength}
        </span>
    </h2>
    <h2>Score:
        <span>
            ${score}
        </span>
    </h2>
    `)
        $('.carousels').html(`
    <img src="./assets/airplane.gif" alt="" class="img-fluid">
    <h1>You lose! 😫</h1>
    <p>Try again and I bet you'll win. Just refresh this page</p>`)
    }

    if (resultObjects.head === resultObjects.torso && resultObjects.torso === resultObjects.leg) {
        console.log('ganador')
        addSuccessMessage()

    } else {
        console.log('perdedor')
    }

})
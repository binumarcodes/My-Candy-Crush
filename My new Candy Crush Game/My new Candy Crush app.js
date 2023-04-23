document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score')
    const width = 8;
    const squares = [];
    let score = 0


    const candyColors = [
        'url("Images/green-candy.png")',
        'url("Images/red-candy.png")',
        'url("Images/yellow-candy.png")',
        'url("Images/blue-candy.png")',
        'url("Images/purple-candy.png")',
        'url("Images/orange-candy.png")'
    ]
    

    function createBoard() {
        for(let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true);
            square.setAttribute('id', i)
            grid.appendChild(square)
            const randomColors = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColors];
            squares.push(square);
        }
    }
    createBoard();



    // Making Function
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));


    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover')
    }

    function dragEnter() {
        console.log(this.id, 'dragenter')
    }

    function dragLeave() {
        console.log(this.id, 'dragleave')
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.background = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        console.log(colorBeingReplaced)
        console.log(this.id, 'dragDrop')
    }



    function dragEnd(e) {
        console.log(this.id, 'dragend')
        //What is a valid move



        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if(squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }
    }


//Drop candies once some have been cleared
function moveDown() {
    for(i = 0; i < 55; i++) {
        if(squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor];
            }
        }
    }
}


//Cheking for matches
//Check for row of Four

    function checkRowforFour() {
        for(i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 29, 30, 39, 45, 46, 47, 53, 54, 55]
            if(notValid.includes(i)) continue

            if(rowOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

checkRowforFour();

    function checkColumnforFour() {
        for(i = 0; i < 47; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnforFour();

    //Cheking for matches
//Check for row of Three

function checkRowforThree() {
    for(i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        let decideColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage  === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue

        if(rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkRowforThree();

function checkColumnforThree() {
    for(i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decideColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage  === ''

        if(columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkColumnforThree();


window.setInterval(function() {
    moveDown();
     checkRowforFour();
    checkColumnforFour();
    checkRowforThree();
    checkColumnforThree();
}, 100)



var duration = 60;

var setTime = setInterval(function() {
    duration -= 1;
    document.getElementById('time').innerHTML = duration + 's';

    if(duration === 0) {
        alert('Game Over! You scored ' + score)
        window.location.reload()

    } 
}, 1000)


})
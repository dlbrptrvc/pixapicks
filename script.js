function initializeDOM(parentElementID) {
    window[parentElementID] = document.querySelector('#'+parentElementID)
    Array.from(window[parentElementID].children).forEach(element => {
        if (element.id) {initializeDOM(element.id)}        
    });
}

initializeDOM('main')
let activeBrush = 'color'
let currentColor = 'rgb(0,0,0)'
let brushOn = false
document.addEventListener('mouseup', e => brushOn = false)

function initializeBoard(x) {
    for (let i=0;i<x;i++) {
        let row = document.createElement('row')
        for (let i=0;i<x;i++){
            let pixel = document.createElement('pixel')
            pixel.style.backgroundColor = 'rgb(255,255,255)'
            pixel.addEventListener('mousedown', e => {brushOn = true;paint(e.target)})
            pixel.addEventListener("mouseover", e => paint(e.target))
            pixel.addEventListener("dragstart", e => e.preventDefault())
            row.append(pixel)
        }
       board.append(row)
    }
}

initializeBoard(boardSize.value)

Array.from(document.querySelectorAll(".brush")).forEach(element =>
    element.addEventListener('click',()=>activeBrush=element.id))
    
function paint(target) {
    if (brushOn == true) {
        let rgb = target.style.backgroundColor.replace(/rgb\(| |\)/g, '').split(',')
        switch (activeBrush) {
            case 'color':
                target.style.backgroundColor = currentColor
                break
            case 'darken':
                 for (let i in rgb) {
                    if (+rgb[i]>0) {rgb[i]=+rgb[i]-30}
                    else {rgb[i]=0}
                }
                target.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'
                break
            case 'lighten':
                 for (let i in rgb) {
                    if (+rgb[i]<255) {rgb[i]=+rgb[i]+30}
                    else {rgb[i]=255}
                }
                target.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'
                break
            case 'rainbow':
                target.style.backgroundColor = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
        }
    }
}

function clearBoard() {
    let newBoard = document.createElement('div')
    newBoard.id = 'board'
    board.replaceWith(newBoard)
    window['board']=newBoard
    initializeBoard(boardSize.value)
}

boardSize.addEventListener('input', ()=>{
    let x = boardSize.value
    boardSizeLabel.textContent = 'Size: '+x+'x'+x
})

changeBoardSize.addEventListener('click', clearBoard)

colorSelector.addEventListener('input',()=>{
    let hex = colorSelector.value
    currentColor='rgb('+parseInt(hex.slice(1, 3), 16)+','+parseInt(hex.slice(3, 5), 16)+','+parseInt(hex.slice(5, 7), 16)+')'
})
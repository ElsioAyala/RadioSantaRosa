
let glideProgram = new Glide('.glide', {
    type: 'carousel',
    startAt: 3,
    perView: 3,
    gap: 0,
    draggable: false,
}).mount()


const playStop = document.querySelector('.play-stop')
let cancion = "https://node-13.zeno.fm/afnx6011qtzuv?rj-ttl=5&amp;rj-tok=AAABcNZhJCYAfGXcwx6yzGvX7g.mp3"
audio = new Audio(`${cancion}`)

const icon = document.getElementById('icon')
let count = 0
playStop.addEventListener('click', () =>{
    if(count === 0){
        audio.play()
        audio.volume = "0.1"
        count = 1
        icon.setAttribute('class', 'fa-solid fa-pause')
    }else if(count === 1){
        audio.pause()
        icon.setAttribute('class', 'fa-solid fa-play')
        count = 0
    }
})


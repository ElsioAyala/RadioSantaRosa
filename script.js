let allProgramas = []
let currentTime = () => new Date
const glide__slides = document.querySelector('.glide__slides')
let isPlay = 0

let setTimeProgram = t => {
    const time = new Date();
    time.setHours(t.substr(0,2));
    time.setMinutes(t.substr(3));
    time.setSeconds(00);
    return time.getTime();
}


function programTimeMs(allProgramas) {
    allProgramas.map(program => {
        program.start = setTimeProgram(program.start)
        program.ends = setTimeProgram(program.ends)
        return program
    })
}

const filter = (programs) => {
    let day = currentTime().getDay()
    allProgramas = programs.filter(program => program.days.includes(`${day}`))
}


const loadProgram = async () => {
    const response = await fetch("./programas.json");
    const program = await response.json();
    allProgramas = [...program];
    filter(allProgramas)
    console.log(allProgramas)
    showProgram(allProgramas)
}




const waiting = (objProgram) =>{
        let end = setTimeProgram(objProgram.ends)
        end += 30000
        setTimeout(()=>{
            let glide = document.querySelectorAll('.glide__slide')
            glide.forEach( ele => ele.remove())
            showProgram(allProgramas)
        }, (end  - currentTime()))
  
}


const schedule = (days, start, end, name) => {
    if (start.startsWith('0')) start = start.substr(1)
    if (end.startsWith('0')) end = end.substr(1)
    if (start.endsWith('00')) start = start.slice(0, -3)
    if (end.endsWith('00')) end = end.slice(0, -3)
    
    if (name === "Radio Santa Rosa"){
        return ""
    }else if(days.length === 5){
        return `lu a vie ${start}h a ${end}h`
    }else{
        let dayss = ''
        days.forEach(day => {
            switch (day){
                case "1":
                    dayss += `lun, `
                    break
                case "2":
                    dayss += `mar, `
                    break
                case "3":
                    dayss += `mie, `
                    break
                case "4":
                    dayss += `jue, `
                    break
                case "5":
                    dayss += `vie, `
                    break
                case "6":
                    dayss += `sab, `
                    break
                case "0":
                    dayss += `dom, `
                    break
            }
        });
        dayss += `${start}h a ${end}h`
        return dayss
    }

}


const showProgram = (allProgramas) => {
    let status
    let startSlide = 0
    let i
     
    console.log("los programas para recorrer", allProgramas)
    allProgramas.forEach( (programa, index) => {
            if (currentTime() >=  setTimeProgram(programa.start) && currentTime() <= setTimeProgram(programa.ends)) waiting(programa), status = "live", console.log("true")
            i = index
            console.log("index:", i)
            const  glide__slide = document.createElement('div');
            glide__slide.className = 'glide__slide'
                const card = document.createElement('div');
                card.className = 'card'
                glide__slide.appendChild(card)
                    const card__img = document.createElement('div');
                    card__img.className = 'card__img'
                    card.appendChild(card__img)
                        const img = document.createElement('img');
                        img.setAttribute('src', `./images/${programa.locutor[0].avatar}.jpg`)
                        img.setAttribute('alt', `Foto de ${programa.locutor[0].fullName}`)
                        card__img.appendChild(img)
                    const card__info = document.createElement('div');
                    card__info.className = 'card__info';
                    card.appendChild(card__info)
                        const card__infoheader = document.createElement('div')
                        card__infoheader.className = 'card__infoheader'
                        card__info.appendChild(card__infoheader)
                            const vivo = document.createElement('div')
                            /*vivo.className= 'animation'*/
                            status === "live" ? vivo.className = 'vivo animation' : vivo.className = "tag"
                            if (status === "live") vivo.textContent = 'EN VIVO', startSlide = index
                            else if (status === "continuation") vivo.textContent = 'A Continuación', status = "later"
                            else if (status === "later") vivo.textContent = 'Luego', status = "complete"
                            card__infoheader.appendChild(vivo)
                        const card__infositle = document.createElement('h3')
                        card__infositle.className = 'card__infositle'
                        card__infositle.textContent = programa.name
                        card__info.appendChild(card__infositle)
                        const card__infosubtitle = document.createElement('p')
                        card__infosubtitle.className = 'card__infosubtitle'
                        card__infosubtitle.textContent = schedule(programa.days, programa.start, programa.ends, programa.name)
                        card__info.appendChild(card__infosubtitle)
                    const control = document.createElement('div')
                    control.classList.add('card__play')
                    card.appendChild(control)
                        if (status == "live"){
                        /*isLive = true*/
                        control.classList.add('play-stop')
                        /*control.setAttribute('onclick', 'play()')*/
                        const controlIcon1 = document.createElement('i')
                        controlIcon1.setAttribute('onclick', 'play()')
                        //controlIcon1.setAttribute('id', 'icon')
                        isPlay === 0 ? controlIcon1.classList.add('fa-solid', 'fa-play', 'active', 'icon') : controlIcon1.classList.add('fa-solid', 'fa-play', 'icon')
                        control.appendChild(controlIcon1)
                        const controlIcon2 = document.createElement('i')
                        controlIcon2.setAttribute('onclick', 'pause()')
                        isPlay === 1 ? controlIcon2.classList.add('fa-solid', 'fa-pause', 'active', 'icon') : controlIcon2.classList.add('fa-solid', 'fa-pause', 'icon');
                        control.appendChild(controlIcon2)
                        status = "continuation"
                        }
            glide__slides.appendChild(glide__slide)
        
    });

    console.log(startSlide)
    let glideProgram = new Glide('.glide', {
        type: 'carousel',
        startAt: i >= 2 ?  startSlide + 3 : startSlide,
        perView: i >= 2 ? 3 : i + 1,
        gap: 0,
        draggable: false,
    }).mount()

    
    if (status === undefined) {
        console.log("cargar load")
        setTimeout(() =>{
            let glide = document.querySelectorAll('.glide__slide')
            glide.forEach( ele => ele.remove())
            loadProgram()
        },60000)
        
    }else{
        console.log("Esta en vivo")
    }

}


let cancion = "http://stream.zeno.fm/d0up6mm3pnhvv.aac"
//let cancion = "https://boing.streaming.gabrielli.com.ar/radio/8010/radio.aac"

/*audio = new Audio(`${cancion}`)*/


/*let audio = () => {
    return new Audio(`${cancion}`)
}*/
const control = () =>{
    /*let icon = document.querySelector(".icon")
    console.log()
    const isPlay = icon.className.includes("fa-play")
    console.log("isPlay:", isPlay)
    icon.classList.toggle("fa-pause", isPlay)
    icon.classList.toggle("fa-play", !isPlay)*/

    

    
}


/*const play = () => {

    let play = document.querySelector(".fa-play")
    let pause = document.querySelector(".fa-pause")
    if(isPlay === 0){
        console.log("play")
        audio().play()
        audio.volume = volume.value / 100
        isPlay = 1
        play.classList.remove("active")
        pause.classList.add("active")
    }else if(isPlay === 1){
        console.log("pause")
        audio.pause()
        isPlay = 0
        pause.classList.remove("active")
        play.classList.add("active")
    }
   
   
}*/

let audio
let audioLoad = false

const play = () => {
    let play = document.querySelector(".fa-play")
    let pause = document.querySelector(".fa-pause")
    console.log("Play")
    !audioLoad ? audio = new Audio(`${cancion}`) : null
    audioLoad = true
    audio.play()
    audio.volume = volume.value / 100
    isPlay = 1
    play.classList.remove("active")
    pause.classList.add("active")
}

const pause = () => {
    let play = document.querySelector(".fa-play")
    let pause = document.querySelector(".fa-pause")
    console.log("pause")
    audio.pause()
    isPlay = 0
    pause.classList.remove("active")
    play.classList.add("active")
}


let volume = document.getElementById('volume')
let volumeIcon = document.getElementById('volumeIcon')


volumeIcon.addEventListener('click', () => {
    isMuted = audio.muted === true
    if (isMuted) {
        audio.muted = false
        volumeIcon.classList.remove("fa-volume-xmark")
        volumeIcon.classList.add("fa-volume-high")

    }else{
        audio.muted = true
        volumeIcon.classList.remove("fa-volume-high")
        volumeIcon.classList.add("fa-volume-xmark")
    }
})

volume.addEventListener('mousemove', () => {
    audio.volume = volume.value / 100


    const isCero = volume.value === "0"
    volumeIcon.classList.toggle("fa-volume-high", !isCero)
    volumeIcon.classList.toggle("fa-volume-xmark", isCero)
    
})



window.onload = loadProgram;


btn_menu.addEventListener("click", () =>{
    nav.style.left = "0px"
    back_menu.style.display = "block"
})

back_menu.addEventListener("click", () =>{
    nav.style.left = "-200px"
    back_menu.style.display = "none"
})


let allProgramas = [];
let currentTime = () => new Date;
const glide__slides = document.querySelector('.glide__slides')

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
        /*document.querySelector('.glide__slide').remove()*/
        /*glide__slide.remove()*/
        /*showProgram(objProgram)*/
        let end = setTimeProgram(objProgram.ends)
        end += 30000
        setTimeout(()=>{
            let glide = document.querySelectorAll('.glide__slide')
            glide.forEach( ele => ele.remove())
            showProgram(allProgramas)
        }, (end  - currentTime()))
  
}


const schedule = (days, start, end) => {
    if (start.startsWith('0')) start = start.substr(1)
    if (end.startsWith('0')) end = end.substr(1)
    if (start.endsWith('00')) start = start.slice(0, -3)
    if (end.endsWith('00')) end = end.slice(0, -3)
    
    if (days.length === 5){
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
    let status = ""
    let startSlide = 0
     

    allProgramas.forEach( (programa, index) => {
            if (currentTime() >=  setTimeProgram(programa.start) && currentTime() <= setTimeProgram(programa.ends)) waiting(programa), status = "live", console.log("true")
            const  glide__slide = document.createElement('div');
            glide__slide.className = 'glide__slide'
                const card = document.createElement('div');
                card.className = 'card'
                glide__slide.appendChild(card)
                    const card__img = document.createElement('div');
                    card__img.className = 'card__img'
                    card.appendChild(card__img)
                        const img = document.createElement('img');
                        img.setAttribute('src', 'foto')
                        img.setAttribute('alt', 'Foto de')
                        card__img.appendChild(img)
                    const card__info = document.createElement('div');
                    card__info.className = 'card__info';
                    card.appendChild(card__info)
                        const card__infoheader = document.createElement('div')
                        card__infoheader.className = 'card__infoheader'
                        card__info.appendChild(card__infoheader)
                            const vivo = document.createElement('div')
                            status === "live" ? vivo.className = 'vivo' : vivo.className = "tag"
                            /*status === "live" ? vivo.textContent = 'EN VIVO' : ""*/
                            if (status === "live") vivo.textContent = 'EN VIVO', startSlide = index
                            else if (status === "continuation") vivo.textContent = 'A Continuación', status = "later"
                            else if (status === "later") vivo.textContent = 'Luego', status = "complete"
                            /*status = "continuation"*/
                            card__infoheader.appendChild(vivo)
                        const card__infositle = document.createElement('h3')
                        card__infositle.className = 'card__infositle'
                        card__infositle.textContent = programa.name
                        card__info.appendChild(card__infositle)
                        const card__infosubtitle = document.createElement('p')
                        card__infosubtitle.className = 'card__infosubtitle'
                        card__infosubtitle.textContent = schedule(programa.days, programa.start, programa.ends)
                        card__info.appendChild(card__infosubtitle)
                    const control = document.createElement('div')
                    control.classList.add('card__play', 'play-stop')
                    card.appendChild(control)
                        if (status == "live"){
                        const controlIcon = document.createElement('i')
                        controlIcon.setAttribute('id', 'icon')
                        controlIcon.classList.add('fa-solid', 'fa-play')
                        control.appendChild(controlIcon)
                        status = "continuation"
                        }
            glide__slides.appendChild(glide__slide)
        /*}*/
    });
    console.log(startSlide)
    let glideProgram = new Glide('.glide', {
        type: 'carousel',
        startAt: startSlide,
        perView: 3,
        gap: 0,
        draggable: false,
    }).mount()

}




window.onload = loadProgram;
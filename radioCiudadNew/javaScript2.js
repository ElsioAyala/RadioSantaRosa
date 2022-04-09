let allProgramas = [];
let currentTime = () => new Date;
const programElement = document.getElementById('programContainerElement');
let chargeProgram = false;
const live = document.getElementById('live')


let setTimeProgram = t => {
    const time = new Date();
    time.setHours(t.substr(0,2));
    time.setMinutes(t.substr(3));
    time.setSeconds(00);
    return time.getTime();
}


const loadProgram = async () => {
    const response = await fetch("./programas.json");
    const program = await response.json();
    allProgramas = [...program];
    programTimeMs(allProgramas)
    currentProgram()
}

const currentDay = i => {
    for (const key in allProgramas[i].days) {
        if (allProgramas[i].days[key] == currentTime().getDay()) {
            return true
        }
    }
    return false
}

/*Area de prearacion*/
/*const stagingPubli  = (objectProgram) => {

}*/
let publi = false;
const staging = (objProgram, tipo) =>{

    if (tipo === "Publicidad"){
        if (publi == false){
            let element = document.getElementById("containImg")
        
            containImg.remove()
            info.remove()
        
            showProgram(objProgram, "programa");
            publi = true;
            chargeProgram = true;
            setTimeout(()=>{
                currentProgram()

            }, (1000))
        
        }else{
            setTimeout(()=>{
                currentProgram()
            }, (60000))
            
        }
        
    }else if(tipo == "offLine"){
        containImg.remove()
        info.remove()

        showProgram(objProgram);

    }else{

        containImg.remove()
        info.remove()
    
        showProgram(objProgram, "programa")
        chargeProgram = true

        setTimeout(()=>{
            currentProgram()
        }, (objProgram.ends - currentTime()))
    }
}

const currentProgram = () => {
    for (const i in allProgramas){
        if (currentTime() >= allProgramas[i].start && currentTime() <= allProgramas[i].ends && currentDay(i)){
            publi = false;
            var ok = true;
            staging(allProgramas[i]);
            
        }
    }
    if (ok != true){
        let publicidad = {
            name: "Espacio Publicitario",
            locutor: [
                {
                    avatar: "Publi.jpg",
                    profileFacebook: "radiociudad.radiociudad",
                    fullName: "Ya volvemos!!"
                }
            ]
        }
       staging(publicidad, "Publicidad") 
    }
}


const showProgram = (program, type) => {
    let fullName = ""
    let containerImg = document.createElement("div")
    containerImg.setAttribute("class", "containImg")
    containerImg.setAttribute("id", "containImg")
    let img = ""
    program.locutor.forEach( locutor => {
        img += `
        <a href="https://www.facebook.com/${locutor.profileFacebook}" target="_blank" title="Ver perfil de Facebook"> 
        <picture>
        ${locutor.avatar == "autoDj.gif" ? `<img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Avatar ${locutor.avatar}" />` :
        `
            <source type="image/webp" srcset="./img/${locutor.avatar.slice(0, -4)}.webp">
            <source type="image/jpeg" srcset="./img/${locutor.avatar}">
            <img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Foto ${locutor.fullName}"/>
            </picture>
        </a>
        `}`
        fullName += locutor.fullName + " & " 
    })
    containerImg.innerHTML = img
    programElement.appendChild(containerImg)
    fullName = fullName.slice(0, -2)

    
    const info = document.createElement("div")
    info.setAttribute("class", "live-radio__aire--description")
    info.setAttribute("id", "info")
    
    let infoContent
    
    if (type === "programa"){
        
    infoContent = `
    <p class="nombre" id="nombre">${program.name}<p>
    <p class="conductor" id="conductor">${fullName}</p>
    `
    }else{ 
    
    infoContent = `
    <div class="marquee">
        <ul class="marquee-content">
            <li class="nombre" id="nombre" style="padding-right:30px;" data-aos="fade-right" data-aos-delay="900">${program.name}<li>
        </ul>
    </div>
    <p class="conductor" id="conductor" data-aos="fade-left" data-aos-delay="900">${fullName}</p>
    `}

    info.innerHTML = infoContent
    programElement.appendChild(info)
    
}

/* Pasar de Horas a Milisegundos*/
function programTimeMs(allProgramas) {
    allProgramas.map(program => {
        program.start = setTimeProgram(program.start)
        program.ends = setTimeProgram(program.ends)
        return program
    })
}




const url = "https://tools.zenoradio.com/api/stations/" + "ef7d2011qtzuv" + "/now_playing/?rand=" + Math.random();

const loadMedia = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log("DATA:", data)
    if (data.title !== "Radio Ciudad 90.5" && data.title !== "Un lugar para Todos") {
        chargeProgram = false;
        loadAutoDj(data);
    
    }else if (chargeProgram === false){

        loadProgram();
        live.textContent = "en vivo"
        live.classList.add("animation");
       
    
    }

  
}

const loadAutoDj = (data) => {
    let offLine = {
        name: `${data.artist} - ${data.title}`,
        /*name: `la konga - como el aire`,*/
        locutor: [
            {
                avatar: "autoDj.gif",
                profileFacebook: "radiociudad.radiociudad",
                fullName: "Auto DJ"
            }
        ]
    }
    

    let nombre = "sinNombre"
    try {
        nombre = document.getElementById("nombre").innerHTML
    } catch (error) {}

  
    if ( nombre !== `${data.artist} - ${data.title}`) {
        live.textContent = "off line"
        live.classList.remove('animation');


        staging(offLine, "offLine")
        let element = document.getElementById('nombre');
        let elementStyle = window.getComputedStyle(element);
        let elementAncho = elementStyle.getPropertyValue('width'); //ancho del li

        if (Math.round(parseInt(elementAncho)) > 325) {//360
            
            style.setProperty('--marquee-element-width-px', elementAncho);
    
            const marqueeContent = document.querySelector("ul.marquee-content");
            style.setProperty("--marquee-elements", 1);
            let nodo = marqueeContent.children[0].cloneNode(true)
            marqueeContent.appendChild(nodo)
            marqueeContent.children[1].style.display = "none"
        }else{
            element.removeAttribute("data-aos")
            document.getElementById("conductor").removeAttribute("data-aos")
            element.style.width = "100%"
            element.style.padding = "0"
        }
    }
}


setInterval(() => {
    loadMedia();
}, 20000)



window.onload = loadMedia;

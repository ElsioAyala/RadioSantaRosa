import Program from "./clases/Program.js";
import Locutor from "./clases/Locutor.js";

const element = document.getElementById("Programas")
const element2 = document.getElementById("Locutores")


function borrar(item, objetos, elementoPadre) {
    let itemId = item.getElementsByClassName("id")[0].textContent
    console.log("Item:", itemId)
    if (confirm("Esta Seguro que decea Borrar?")) {
        
        elementoPadre.removeChild(item)
        objetos.forEach((objeto, index) =>  {
            if (objeto.id == itemId) {
                objetos.splice(index,1)
            }
        })
        console.log(objetos)
    }
}




let todosLosProgramas = []
let todosLosLocutores = []

const formulario = document.getElementById("formProgramas")
formulario.addEventListener("submit", e => {
    e.preventDefault()
    const target = e.target
    let dias = []
    if (target.lunes.checked) dias.push(target.lunes.value)
    if (target.martes.checked) dias.push(target.martes.value)
    if (target.miercoles.checked) dias.push(target.miercoles.value)
    if (target.jueves.checked) dias.push(target.jueves.value)
    if (target.viernes.checked) dias.push(target.viernes.value)
    if (target.sabado.checked) dias.push(target.sabado.value)
    if (target.domingo.checked) dias.push(target.domingo.value)
    const programa = new Program(target.nombrePrograma.value, dias, target.inicioPrograma.value, target.finPrograma.value)
    let selec = document.getElementById("selec")
    let selec2 = document.getElementById("selec2") 

    todosLosLocutores.forEach(locutor => {
        if (locutor.fullName == selec.value){
            programa.setLocutor([locutor])
        }
    })

    if (selec2 != null){
        todosLosLocutores.forEach(locutor => {
            if (locutor.fullName == selec2.value){
                programa.setLocutor([...programa.getLocutor(), locutor])
            }
        })
    }

    
    
    todosLosProgramas = [...todosLosProgramas, programa]
    borrarProgramas()
    /*imprimirProgramas(todosLosProgramas)*/
    ordenar(todosLosProgramas)
    eliminarSelec2()
    

    btnGuardarProgramas.style.backgroundColor = "green"
    btnGuardarProgramas.style.color = "white"
    

})

const formulario2 = document.getElementById("formLocutores")
formulario2.addEventListener("submit", e => {
    e.preventDefault()
    const target = e.target
    const locutor = new Locutor(target.avatarLocutor.value, target.nombreLocutor.value, target.apellidoLocutor.value, target.facebookLocutor.value)

  
    todosLosLocutores = [...todosLosLocutores, locutor]
    borrarlocutores()
    imprimirLocutores(todosLosLocutores)
    eliminarSelec()
    selec(todosLosLocutores)

    btnGuardarLocutores.style.backgroundColor = "green"
    btnGuardarLocutores.style.color = "white"
      

})



function downloadJsonProgramas(data) {
    var blob = new Blob([JSON.stringify(data)], { type: "" });
    saveAs(blob, "programas.json");
}

function downloadJsonLocutores(data) {
    var blob = new Blob([JSON.stringify(data)], { type: "" });
    saveAs(blob, "locutores.json");
}


const btnGuardarProgramas = document.getElementById("btnGuardarProgramas")
btnGuardarProgramas.addEventListener("click", () => {
    downloadJsonProgramas(todosLosProgramas)
    btnGuardarProgramas.style.backgroundColor = "rgb(255, 145, 0)"
        btnGuardarProgramas.style.color = "black"
})

const btnGuardarLocutores = document.getElementById("btnGuardarLocutores")
btnGuardarLocutores.addEventListener("click", () => {
    downloadJsonLocutores(todosLosLocutores)
    btnGuardarLocutores.style.backgroundColor = "rgb(255, 145, 0)"
    btnGuardarLocutores.style.color = "black"
})

function eliminarSelec(){
    document.getElementById("selec").remove()
    document.getElementById("mas").remove()
}

function eliminarSelec2(){
    if (document.getElementById("selec2") != null) document.getElementById("selec2").remove()
 }

function selec(locutores) {
    let select = document.createElement("select");
    select.setAttribute("id", "selec")
 
    locutores.forEach(locutor => {
        let option = document.createElement("option")
        option.setAttribute("value", locutor.fullName)
        let optionTexto = document.createTextNode(locutor.fullName)
        option.appendChild(optionTexto)
        select.appendChild(option)
    })
    
    formulario.insertBefore(select, botonPrograma)

    let mas = document.createElement("span")
    mas.setAttribute("id", "mas")
    let masTexto = document.createTextNode(" + ")
    mas.appendChild(masTexto)

    formulario.insertBefore(mas, botonPrograma)
    
    mas.addEventListener("click", () => {

        let select2 = document.createElement("select");
        select2.setAttribute("id", "selec2")

        locutores.forEach(locutor => {
            
            let option = document.createElement("option")
            option.setAttribute("value", locutor.fullName)
            let optionTexto = document.createTextNode(locutor.fullName)
            option.appendChild(optionTexto)
            select2.appendChild(option)
        })
        
        formulario.insertBefore(select2, mas);
    })
}





function borrarProgramas(){
    let programas = [...document.getElementsByClassName("programa")]
    programas.forEach(programa => {
        programa.remove()
    }) 
}
function borrarlocutores(){
    let locutores = [...document.getElementsByClassName("locutor")]
    locutores.forEach(locutor => {
        locutor.remove()
    })
}

function editarLocutores(item){
    let itemId = item.getElementsByClassName("id")[0].innerHTML
    /*console.log(item)*/
    todosLosLocutores.forEach((locutor, index) =>{
        if (locutor.id == itemId) {
            avatar.value = locutor.avatar
            nombreLocutor.value = locutor.firsName
            apellidoLocutor.value = locutor.lastName
            facebookLocutor.value = locutor.profileFacebook
            
            overlayLocutor.classList.add("active")
            todosLosLocutores.splice(index,1)
        }
    })
}



function editarProgramas(item){
    let itemId = item.getElementsByClassName("id")[0].innerHTML
    /*console.log(itemId)*/
    
    todosLosProgramas.forEach( (programa, index) => {
        if (programa.id == itemId){
            nombrePrograma.value = programa.name
            inicioPrograma.value = programa.start
            finPrograma.value = programa.ends
            document.getElementById("selec").value = programa.locutor[0].fullName
            if (document.getElementById("selec2") != undefined) {
                document.getElementById("selec2").value = programa.locutor[1].fullName
            }
            
            programa.days.forEach( dia => {
                console.log(dia)
                
                switch(dia){
                    case "1":
                        lunes.checked = true
                    break
                    case "2":
                        martes.checked = true
                    break
                    case "3":
                        miercoles.checked = true
                    break
                    case "4":
                        jueves.checked = true
                    break
                    case "5":
                        viernes.checked = true
                    break
                    case "6":
                        sabado.checked = true
                    break
                    case "0":
                        domingo.checked = true
                    break
                }
            })

            overlay.classList.add("active")
            todosLosProgramas.splice(index,1)

        }
    })
}


let lav = document.createElement("div")
lav.setAttribute("id", "lav")
element.appendChild(lav)
let s = document.createElement("div")
s.setAttribute("id", "s")
element.appendChild(s)
let d = document.createElement("div")
d.setAttribute("id", "d")
element.appendChild(d)

const imprimirProgramas = (programa) => {

    programa.forEach(programa => {
        const hijo = document.createElement("div")
        hijo.setAttribute("class", "programa")
    
            let avatar = ""
            let fullName = ""
            
            programa.locutor.forEach(locutor => {
                avatar += `<img src="./img/${locutor.avatar}"/>`
                fullName += locutor.fullName + " & "
    
            })
    
            fullName = fullName.slice(0, -2)
    
            hijo.innerHTML = `
            <div class="id">${programa.id}</div>
            <div>${avatar}</div>
            <h3>${programa.name}</h3>
            <p> ${fullName}</p>
            <p> De ${programa.start} A ${programa.ends} Hs.
            `
            /* BOTON DE EDITAR */
            const btnEditar = document.createElement("button")
            btnEditar.textContent = "Editar"
            btnEditar.className = "btnEditar"
            hijo.appendChild(btnEditar)
            btnEditar.addEventListener("click", e =>{
                const item = e.target.parentElement
                console.log(item)
                editarProgramas(item)
            })
            
            /* BOTON DE BORRAR */
            const btnBorrar = document.createElement("button")
            btnBorrar.textContent = "X"
            btnBorrar.className = "btnBorrar"
            
            hijo.appendChild(btnBorrar)
            
            if (programa.days[0] != 0 && programa.days[0] != 6) {
                btnBorrar.addEventListener("click", e => {
                    const item = e.target.parentElement
                    /*console.log(item)*/
                    borrar(item, todosLosProgramas, lav)
                    btnGuardarProgramas.style.backgroundColor = "green"
                    btnGuardarProgramas.style.color = "white"
                })
                console.log("lunes a viernes")
                lav.appendChild(hijo)
            }
            if (programa.days[0] == 6) {
                btnBorrar.addEventListener("click", e => {
                    const item = e.target.parentElement
                    console.log(item)
                    borrar(item, todosLosProgramas, s)
                    btnGuardarProgramas.style.backgroundColor = "green"
                    btnGuardarProgramas.style.color = "white"
                })
                console.log("Sabado")
                s.appendChild(hijo)
            }
            if (programa.days[0] == 0) {
                btnBorrar.addEventListener("click", e => {
                    const item = e.target.parentElement
                    console.log(item)
                    borrar(item, todosLosProgramas, d)
                    btnGuardarProgramas.style.backgroundColor = "green"
                    btnGuardarProgramas.style.color = "white"
                })
                console.log("domingo")
                d.appendChild(hijo)
            }
        });

}

const loadProgramas = async () => {
    const response = await fetch("./programas.json")
    const programa = await response.json()
    /*imprimirProgramas(programa);*/
    todosLosProgramas = [...programa]
    ordenar(todosLosProgramas)
}


const imprimirLocutores = (locutores) => {
    locutores.forEach(locutor => {
        const hijo = document.createElement("div")
        hijo.className = "locutor"

        hijo.innerHTML = `
            <div class="id">${locutor.id}</div>
            <img src="./img/${locutor.avatar}"/>
            <p>${locutor.fullName}</p>
        `
        /* BOTON EDITAR */
        const btnEditar = document.createElement("button")
        btnEditar.textContent = "Editar"
        btnEditar.className = "btnEditar"
        hijo.appendChild(btnEditar)
        btnEditar.addEventListener("click", e =>{
            const item = e.target.parentElement
            editarLocutores(item)
        })

        /* BOTON BORRAR */
        const btnBorrar = document.createElement("button")
        btnBorrar.textContent = "X"
        btnBorrar.className = "btnBorrar"
        hijo.appendChild(btnBorrar)
        btnBorrar.addEventListener("click", e => {
        const item = e.target.parentElement
        borrar(item, todosLosLocutores, element2)
            btnGuardarLocutores.style.backgroundColor = "green"
            btnGuardarLocutores.style.color = "white"
        })

        element2.appendChild(hijo)
    });
}

const loadLocutores = async () => {
    const response = await fetch("./locutores.json")
    const locutores = await response.json()
    todosLosLocutores = [...locutores]
    imprimirLocutores(todosLosLocutores);
    selec(locutores)
    
}

loadProgramas();
loadLocutores();

function ordenar(programas){

    let arreglo = programas.sort((o1, o2) => {
        if (o1.start < o2.start){
            return -1
        }else if (o1.start > o2.start){
            return 1
        }else{
            return 0
        }
    })
    imprimirProgramas(arreglo)
}

let abrirPopup = document.getElementById("btnAgregarPrograma")
let abrirPopupLocutor = document.getElementById("btnAgregarLocutor")
let cerrarPopup = document.getElementById("btnCerrarPopup")
let cerrarPopupLocutor = document.getElementById("btnCerrarPopupLocutor")
let overlay = document.getElementById("overlay")
let overlayLocutor = document.getElementById("overlayLocutor")

abrirPopup.addEventListener("click", function(){
    overlay.classList.add("active")
} )
abrirPopupLocutor.addEventListener("click", function(){
    overlayLocutor.classList.add("active")
} )

cerrarPopup.addEventListener("click", function(){
    overlay.classList.remove("active")
} )
cerrarPopupLocutor.addEventListener("click", function(){
    overlayLocutor.classList.remove("active")
} )
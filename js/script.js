//objeto encargado de detectar errores en el formulario html
class Formulario {
    //dicionario con las comprobaciones del formulario
    comprobantes = {
        "nombre": /^([A-Z][a-z]+\s?){1,2}$/,
        "apellidos": /^[A-Z][a-z]+\s[A-Z][a-z]+$/,
        "dni": /^[a-zA-z][1-9]{7}[A-Z]{1}$|^[1-9]{8}[A-Z]{1}$/,
        "nacimiento": {
            test:
                function (texto) {
                    if (! /^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
                        return false
                    }
                    let textoLista = texto.split("/")
                    let fecha = new Date(textoLista[1] + "/" + textoLista[0] + "/" + textoLista[2])
                    if (fecha.getDate() == Number(textoLista[0])) {
                        return fecha < new Date()
                    } else {
                        return false
                    }
                }
        },
        "postal": /^[0-9]{5}$/,
        "email": /^[A-z.0-9]+@[A-z.0-9]+\.[A-z]{1,3}$/,
        "fijo": /^[89][0-9]{8}$/,
        "movil": /^[67][0-9]{8}$/,
        "iban": /^ES[0-9]{22}$/,
        "credito": /^[0-9]{12}$/,

        "pass": /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{12,}/,
        "password": {
            test:
                function (texto) {
                    this.comprobarCampo(document.getElementById("password_repeat").value, "password_repeat")
                    return this.comprobantes["pass"].test(texto)
                }.bind(this)
        },

        "password_repeat": {
            test:
                function (texto) {
                    if (!this.comprobantes["pass"].test(texto)) {
                        return false
                    } else {
                        return document.getElementById("password").value == texto
                    }
                }.bind(this)
        }
    }
    // inicar la escucha de los inputs y poner funcionalidad en los botnoes
    constructor() {
        let hijos = [...document.getElementById("formulario").querySelectorAll("input")]
        for (let hijo of hijos) {
            hijo.addEventListener("input", function (e) {
                this.comprobarCampo(e.target.value, e.target.id)
            }.bind(this))
        }

        document.getElementById("guardar").onclick = function () { this.guardar() }.bind(this)
        document.getElementById("recuperar").onclick = function () { this.recuperar() }.bind(this)
    }

    //comprueba si un campo esta bien, y lo colorea en base a ello
    comprobarCampo(texto, id_formulario) {
        if (this.comprobantes[id_formulario].test(texto)) {
            document.getElementById(id_formulario).classList.add("valido")
            document.getElementById(id_formulario).classList.remove("no_valido")
            return true
        } else {
            document.getElementById(id_formulario).classList.add("no_valido")
            document.getElementById(id_formulario).classList.remove("valido")
            return false
        }
    }

    // guarda los datos en el localstorage
    guardar() {
        let hijos = [...document.getElementById("formulario").querySelectorAll("input")]
        let comprobacionTodos = true
        hijos.forEach(function (hijo) {
            if (!this.comprobarCampo(hijo.value, hijo.id)) {
                comprobacionTodos = false
            }
        }.bind(this))
        if (comprobacionTodos) {
            let json = {}
            hijos.forEach(function (hijo) {
                json[hijo.id] = hijo.value
            })
            localStorage["persona"] = JSON.stringify(json)
        }
    }

    // pone los datos del localstorage en el formulario html y los comprueba
    recuperar() {
        if (localStorage.persona) {
            let datos = JSON.parse(localStorage.persona)
            for (let dato of Object.keys(datos)) {
                document.getElementById(dato).value = datos[dato]
                this.comprobarCampo(datos[dato], dato)
            }
        }
    }
}

formulario = new Formulario()











class Particula {
    particulaPermitida = true
    coloresParticulas = ["red", "blue", "green", "yellow"]

    constructor(modoParticulas, icono) {
        this.iconoParticula = icono

        if (modoParticulas == "Tiempo") {
            this.iniciarContadorTiempo()
        }

        document.addEventListener('mousemove', function (e) {
            if (this.particulaPermitida) {
                this.particulaPermitida = false
                this.crearParticula(e.clientX, e.clientY)
            }
        }.bind(this));
    }


    iniciarContadorTiempo() {
        setInterval(function () { this.particulaPermitida = true }.bind(this), 100)
    }


    crearParticula(ejeX, ejeY) {
        let particula = document.createElement("i")
        particula.className = this.iconoParticula + " particula"

        particula.style.setProperty("top", ejeY + 10 + "px")
        particula.style.setProperty("left", ejeX + "px")
        particula.style.setProperty("color", this.coloresParticulas[getRandomInt(this.coloresParticulas.length)])
        document.getElementById("contenedorParticulas").appendChild(particula)

        setTimeout(function () { document.getElementById("contenedorParticulas").removeChild(particula) }, 1500)
        setTimeout(function () {
            particula.style.setProperty("top", ejeY + 150 + "px")
            let rotacion = `${getRandomInt(2)} ${getRandomInt(2)} ${getRandomInt(2)} 240deg`
            particula.style.setProperty("rotate", rotacion)
        }.bind(this), 10)
    }
}
new Particula("Tiempo", "fa fa-star fa-2xs")

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function abrirCarta() {
    //abrir sobre
    document.getElementById("frontal4").style.setProperty("rotate", "1 0 0 180deg")

    setTimeout(function () {
        document.getElementById("sobre").style.setProperty("opacity", "0")
    }, 1700)

    setTimeout(function () {
        Array.from(document.getElementsByClassName("elementoCarta")).forEach(function (elemento) {
            console.log(elemento)
            elemento.style.setProperty("transform", "translateY(500px)")
            if (elemento.id == "frontal4") {
                document.getElementById("frontal4").style.zIndex = -10
                elemento.style.setProperty("transform", "translateY(-500px)")
            }
        })
    }, 1700)

    //desenrrollar
    setTimeout(function () {
        document.getElementById("pliegue_arriba").style.setProperty("rotate", "0 0 0 0deg")
    }, 2200)
    setTimeout(function () {
        document.getElementById("pliegue_abajo").style.setProperty("rotate", "0 0 0 0deg")

    }, 3200)
}

document.getElementById("carta").onclick = abrirCarta




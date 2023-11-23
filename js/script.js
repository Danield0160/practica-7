class Formulario {
    comprobantes = {
        "nombre": /^[A-Z][a-z]+$/,
        "apellidos": /^[A-Z][a-z]+\s[A-Z][a-z]+$/,
        "dni": /^[a-zA-z][1-9]{7}[A-Z]{1}$|^[1-9]{8}[A-Z]{1}$/,
        "nacimiento": {
            test:
                function (texto) {
                    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
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
        "email": /^[A-z.1-9]+@[A-z.1-9]+\.[A-z]{1,3}$/,
        "fijo": /^[89][0-9]{8}$/,
        "movil": /^[67][0-9]{8}$/,
        "iban": /^ES[0-9]{22}$/,
        "credito": /^[0-9]{12}$/,

        "password": {
            test:
                function (texto) {
                    this.comprobarCampo(document.getElementById("password_repeat").value, "password_repeat")
                    return /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{6,}/.test(texto)
                }.bind(this)
        },

        "password_repeat": {
            test:
                function (texto) {
                    if (!/(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{6,}/.test(texto)) {
                        return false
                    } else {
                        return document.getElementById("password").value == texto
                    }
                }
        }
    }

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

    comprobarCampo(texto, id_formulario) {
        if (this.comprobantes[id_formulario].test(texto)) {
            document.getElementById(id_formulario).classList.add("valido")
            document.getElementById(id_formulario).classList.remove("no_valido")
        } else {
            document.getElementById(id_formulario).classList.add("no_valido")
            document.getElementById(id_formulario).classList.remove("valido")
        }
    }


    guardar() {
        let hijos = [...document.getElementById("formulario").querySelectorAll("input")]
        let comprobacionTodos = true
        hijos.forEach(function (hijo) {
            if (!hijo.classList.contains("valido")) {
                comprobacionTodos = false
            }
        })
        hijos.forEach(function (hijo) {
            localStorage[hijo.id] = hijo.value
        })
    }

    recuperar() {
        if (localStorage) {
            for (let i = 0; i < localStorage.length; i++) {
                let item = localStorage.key(i)
                document.getElementById(item).value = localStorage[item]
                this.comprobarCampo(localStorage[item], item)
            }
        }
    }
}

new Formulario()


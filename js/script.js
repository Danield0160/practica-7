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


var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://danieldawdns.ddns.net/datos.json');

ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
};
ourRequest.onerror = function () {
    console.log("Connection error");
};
ourRequest.send();

class Json { }
guardadoJson = new Json()
formulario = new Formulario()


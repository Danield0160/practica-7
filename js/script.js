class Formulario {
    comprobantes = {
        "nombre": /^[A-Z][a-z]*/,
        "apellidos": /^[A-Z][a-z]+\s[A-Z][a-z]+/,
        "dni": /^[A-Z][1-9]{7}[A-Z]{1}$|^[1-9]{8}[A-Z]{1}$/,
        "nacimiento": /$$$$/,
        "postal": /^[1-9]{5}$/,
        "email": /^[A-z.1-9]+@[A-z.1-9]+\.[A-z]{1,3}$/,
        "fijo": /^[89][0-9]{8}$/,
        "movil": /^[67][0-9]{8}$/,
        "iban": /^ES[0-9]{22}$/,
        "credito": /^[0-9]{12}$/,
        "password": /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{6,}/,
        "password_repeat": /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{6,}/
    }

    constructor() {
        let hijos = [...document.getElementById("formulario").querySelectorAll("input")]
        for (let hijo of hijos) {
            hijo.addEventListener("input", function (e) {
                this.comprobarCampo(e.target.value, e.target.id)
            }.bind(this))
        }
    }

    comprobarCampo(texto, id_formulario) {
        if (this.comprobantes[id_formulario].test(texto)) {
            document.getElementById(id_formulario).classList.add("valido")
            document.getElementById(id_formulario).classList.remove("no_valido")
        } else {
            document.getElementById(id_formulario).classList.add("no_valido")
            document.getElementById(id_formulario).classList.remove("valido")
        }
        if(["password","password_repeat"].includes(id_formulario)){
            if(document.getElementById("password_repeat").value != document.getElementById("password").value){
                document.getElementById("password_repeat").classList.remove("valido")
                document.getElementById("password_repeat").classList.add("no_valido")
            }else{
                document.getElementById("password_repeat").classList.remove("no_valido")
                document.getElementById("password_repeat").classList.add("valido")
            }
        }
    }
}

new Formulario()
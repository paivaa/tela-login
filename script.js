document.addEventListener('DOMContentLoaded', function () {
    Parse.initialize("nDKe1ie4SeUVI33mFeRIebXCpDWiwLgMVhkzo5uK", "Wy31FmLlHotlvpGCJAYVm8Px8h7AHephWxJfCXdG");
    Parse.serverURL = "https://parseapi.back4app.com/";

    document.querySelector('form').addEventListener("submit", enviarForms);
    loadingEnd();
});

async function enviarForms(e) {
    try{
        e.preventDefault();
        loadingStart();
    
        let inputNascimento = document.getElementById("nascimento").value;
        let inputCpf = document.getElementById("cpf").value;
        
        if(inputNascimento){
            var arr = inputNascimento.split("/");
            var nascimento = arr[2]+"-"+arr[1]+"-"+arr[0];
        } else{
            throw "Informe a data de nascimento";
        }
        
        if(inputCpf){
            var registroInfo = {};
            registroInfo.nascimento = nascimento;
            registroInfo.cpf = inputCpf.replace(/\D/g, "");

        const retorno = await Parse.Cloud.run("submit",registroInfo);
        loadingEnd();
        if(retorno){
            alert("Medico(a): "+retorno.no_medico+" encontrado(a)!");
            console.log(retorno);
        }else{
            alert("Médico não encontrado!");
        }
        

        } else{
            throw "Informe seu cpf";
        }

        

    }catch(error){
        alert(error);
    }
}

//mascara para o campo CPF
function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}
//////////////////////////////////////////////////

//mascara para o campo data
function mascaraData(val) {
    var pass = val.value;
    var expr = /[0123456789]/;

    for (i = 0; i < pass.length; i++) {
        // charAt -> retorna o caractere posicionado no índice especificado
        var lchar = val.value.charAt(i);
        var nchar = val.value.charAt(i + 1);

        if (i == 0) {
            // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
            // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
            // instStr.search(expReg);
            if ((lchar.search(expr) != 0) || (lchar > 3)) {
                val.value = "";
            }

        } else if (i == 1) {

            if (lchar.search(expr) != 0) {
                // substring(indice1,indice2)
                // indice1, indice2 -> será usado para delimitar a string
                var tst1 = val.value.substring(0, (i));
                val.value = tst1;
                continue;
            }

            if ((nchar != '/') && (nchar != '')) {
                var tst1 = val.value.substring(0, (i) + 1);

                if (nchar.search(expr) != 0)
                    var tst2 = val.value.substring(i + 2, pass.length);
                else
                    var tst2 = val.value.substring(i + 1, pass.length);

                val.value = tst1 + '/' + tst2;
            }

        } else if (i == 4) {

            if (lchar.search(expr) != 0) {
                var tst1 = val.value.substring(0, (i));
                val.value = tst1;
                continue;
            }

            if ((nchar != '/') && (nchar != '')) {
                var tst1 = val.value.substring(0, (i) + 1);

                if (nchar.search(expr) != 0)
                    var tst2 = val.value.substring(i + 2, pass.length);
                else
                    var tst2 = val.value.substring(i + 1, pass.length);

                val.value = tst1 + '/' + tst2;
            }
        }

        if (i >= 6) {
            if (lchar.search(expr) != 0) {
                var tst1 = val.value.substring(0, (i));
                val.value = tst1;
            }
        }
    }

    if (pass.length > 10)
        val.value = val.value.substring(0, 10);
    return true;
}

function loadingStart(){
    let element = document.getElementById("preloader");
    let element2 = document.getElementById("inner");

    element.removeAttribute("style");
    element2.removeAttribute("style");
}

function loadingEnd() {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });
}
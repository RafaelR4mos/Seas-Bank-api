const submitAccount = document.getElementById("submit-account");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const inputscpf = document.getElementById("inputs-cpf");
const cepInput = document.getElementById("cep-input");
const numero = document.getElementById("numero");
const password = document.getElementById("password");

cepInput.addEventListener("input", () => {
    const cpfInputValue = cepInput.value;

    if (cpfInputValue.length == 8) {
        buscarCep(cpfInputValue);
    }
});

submitAccount.addEventListener("click", (e) => {
    e.preventDefault();

    let nameInputValue = nameInput.value;
    let emailInputValue = emailInput.value;
    let inputscpfvalue = inputscpf.value;
    let cepInputvalue = cepInput.value;
    let numerovalue = numero.value;
    let passwordvalue = password.value;

    if (
        !nameInputValue.trim() ||
        !emailInputValue.trim() ||
        !inputscpfvalue.trim() ||
        !cepInputvalue.trim() ||
        !numerovalue.trim() ||
        !passwordvalue.trim()
    ) {
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        window.location.href = "../dashboard/";
    }
});

function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (data.erro) {
                alert("CEP não encontrado.");
                nameInput.style.borderColor = "red";
                emailInput.style.borderColor = "red";
                inputscpf.style.borderColor = "red";
                cepInput.style.borderColor = "red";
                numero.style.borderColor = "red";
                password.style.borderColor = "red";
            } else {
                document.getElementById("addres").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("localidade").value = data.localidade;
                document.getElementById("uf").value = data.uf;
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Ocorreu um erro ao buscar o CEP.");
        });
}

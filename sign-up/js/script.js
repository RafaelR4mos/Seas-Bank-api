const submitAccount = document.getElementById("submit-account");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const inputscpf = document.getElementById("inputs-cpf");
const cepInput = document.getElementById("cep-input");
const numero = document.getElementById("numero");
const password = document.getElementById("password");
const cardText = document.getElementById("card-text");
const goBackBtn = document.getElementById("go-back-btn");

window.onload = () => {
    const selectedCard = localStorage.getItem("planCard");
    cardText.innerText = selectedCard;

    if (selectedCard == "gold") {
        cardText.style.backgroundColor = "#EBB62D";
    } else if (selectedCard == "silver") {
        cardText.style.backgroundColor = "#F0F0F0";
        cardText.style.color = "#000000";
    } else if (selectedCard == "platinum") {
        cardText.style.backgroundColor = "#4A7686";
    }
};

goBackBtn.addEventListener("click", () => {
    window.location.href = "../plans";
});
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
        if (!nameInputValue.trim()) {
            nameInput.style.border = "1px solid red";
        } else {
            nameInput.style.border = "none";
        }
        if (!emailInputValue.trim()) {
            emailInput.style.border = "1px solid red";
        } else {
            emailInput.style.border = "none";
        }
        if (!inputscpfvalue.trim()) {
            inputscpf.style.border = "1px solid red";
        } else {
            inputscpf.style.border = "none";
        }
        if (!cepInputvalue.trim()) {
            cepInput.style.border = "1px solid red";
        } else {
            cepInput.style.border = "none";
        }
        if (!numerovalue.trim()) {
            numero.style.border = "1px solid red";
        } else {
            numero.style.border = "none";
        }

        if (!passwordvalue.trim()) {
            password.style.border = "1px solid red";
        } else {
            password.style.border = "none";
        }
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        const userName = nameInput.value;

        localStorage.setItem("userinfo", userName);
        window.location.href = "../dashboard/";
    }
});

function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (data.erro) {
                alert("CEP não encontrado.");
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

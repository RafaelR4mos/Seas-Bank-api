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
    window.location.href = "../plans/";
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
            nameInput.classList.add("invalid-input");
        } else {
            nameInput.classList.remove("invalid-input");
        }
        if (!emailInputValue.trim()) {
            emailInput.classList.add("invalid-input");
        } else {
            emailInput.classList.remove("invalid-input");
        }
        if (!inputscpfvalue.trim()) {
            inputscpf.classList.add("invalid-input");
        } else {
            inputscpf.classList.remove("invalid-input");
        }
        if (!cepInputvalue.trim()) {
            cepInput.classList.add("invalid-input");
        } else {
            cepInput.classList.remove("invalid-input");
        }
        if (!numerovalue.trim()) {
            numero.classList.add("invalid-input");
        } else {
            numero.classList.remove("invalid-input");
        }

        if (!passwordvalue.trim()) {
            password.classList.add("invalid-input");
        } else {
            password.classList.remove("invalid-input");
        }
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        const userName = nameInput.value;
        const origen = "sign-up";

        localStorage.setItem("userinfo", userName);
        localStorage.setItem("origen", origen);
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

import Cliente from "../../js/entidade/cliente.js";
const submitAccount = document.getElementById("submit-account");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const inputscpf = document.getElementById("cpf-input");
const cepInput = document.getElementById("cep-input");
const numeroresidencia = document.getElementById("numeroresidencia");
const numerocelular = document.getElementById("numerocelular");
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
    let numeroresidenciavalue = numeroresidencia.value;
    let numerocelularvalue = numerocelular.value;
    let passwordvalue = password.value;

    if (
        !nameInputValue.trim() ||
        !emailInputValue.trim() ||
        !inputscpfvalue.trim() ||
        !cepInputvalue.trim() ||
        !numeroresidenciavalue.trim() ||
        !numerocelularvalue.trim() ||
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
        if (!numeroresidenciavalue.trim()) {
            numeroresidencia.classList.add("invalid-input");
        } else {
            numeroresidencia.classList.remove("invalid-input");
        }
        if (!numerocelularvalue.trim()) {
            numerocelular.classList.add("invalid-input");
        } else {
            numerocelular.classList.remove("invalid-input");
        }

        if (!passwordvalue.trim()) {
            password.classList.add("invalid-input");
        } else {
            password.classList.remove("invalid-input");
        }
        swal(
            "Tente novamente!",
            "Por favor, preencha todos os campos. Algum campo do formulário encontra-se vazio ou inválido",
            "error"
        );
    } else {
        const origen = "sign-up";
        const cliente = new Cliente(
            nameInputValue,
            emailInputValue,
            inputscpfvalue,
            cepInputvalue,
            numeroresidenciavalue,
            numerocelularvalue,
            passwordvalue
        );

        localStorage.setItem("userinfo", cliente.cpf);
        const clienteJSON = JSON.stringify(cliente);
        localStorage.setItem(cliente.cpf, clienteJSON);
        localStorage.setItem("origen", origen);
        window.location.href = "../dashboard/";
    }
});

function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (data.erro) {
                swal(
                    "Tente novamente!",
                    "O CEP digitado não foi encontrado na nossa base de dados.",
                    "error"
                );
            } else {
                document.getElementById("addres").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("localidade").value = data.localidade;
                document.getElementById("uf").value = data.uf;
            }
        })
        .catch((error) => {
            console.error(error);
            swal(
                "Tente novamente!",
                "Foi encontrado um erro ao buscar pelo CEP",
                "error"
            );
        });
}

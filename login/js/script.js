import Cliente from "../../js/entidade/cliente.js";

const submitBtn = document.getElementById("submit-btn");
const accountNumbner = document.getElementById("account-number");
const accountPassword = document.getElementById("account-password");
const goBackBtnLogin = document.getElementById("go-back-btn-login");
const forgetPasswordButton = document.querySelector("#forget-password");

goBackBtnLogin.addEventListener("click", () => {
    window.location.href = "../";
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let accountNumbnerValue = accountNumbner.value;
    let accountPasswordValue = accountPassword.value;

    if (!accountNumbnerValue.trim() || !accountPasswordValue.trim()) {
        if (!accountNumbnerValue.trim()) {
            accountNumbner.classList.add("invalid-input");
        } else {
            accountNumbner.classList.remove("invalid-input");
        }
        if (!accountPasswordValue.trim()) {
            accountPassword.classList.add("invalid-input");
        } else {
            accountPassword.classList.remove("invalid-input");
        }
        swal(
            "Tente novamente!",
            "Por favor, preencha todos os campos. Os campos inválidos estão demarcados e devem ser preenhcidos novamente.",
            "error"
        );
    } else {
        const clienteJSON = localStorage.getItem(accountNumbnerValue);
        if (clienteJSON == null) {
            swal(
                "Tente novamente!",
                "Os dados digitados não conferem com nenhum cliente registrado no Seas.",
                "error"
            );
        } else {
            const cliente = Cliente.fromJSON(JSON.parse(clienteJSON));
            if (
                cliente.cpf == accountNumbnerValue &&
                cliente.senha == accountPasswordValue
            ) {
                const origen = "login";
                window.localStorage.setItem("origen", origen);
                window.location.href = "../dashboard/";
            } else {
                swal(
                    "Tente novamente!",
                    "Os dados do cliente não conferem",
                    "error"
                );
            }
        }
    }
});

forgetPasswordButton.addEventListener("click", () => {
    let accountNumbnerValue = accountNumbner.value;
    if (!accountNumbnerValue.trim()) {
        if (!accountNumbnerValue.trim()) {
            accountNumbner.classList.add("invalid-input");
        } else {
            accountNumbner.classList.remove("invalid-input");
        }
        swal(
            "Preencha o campo CPF!",
            "Para recuperar a sua senha precisamos que digite o seu CPF digitado no cadastro.",
            "info"
        );
    } else {
        const clienteJSON = localStorage.getItem(accountNumbnerValue);
        if (clienteJSON == null) {
            swal(
                "Tente novamente!",
                "O cliente não foi encontrado na base para o envio de e-mail. Revise o campo cpf e tente novamente",
                "error"
            );
        } else {
            const cliente = Cliente.fromJSON(JSON.parse(clienteJSON));
            const email = cliente.email;
            if (email) {
                sendEmail(email);
            } else {
                swal(
                    "Tente novamente!",
                    "Por favor, Preencha um e-mail válido.",
                    "error"
                );
            }
        }
    }
});

function sendEmail(email) {
    swal(
        "Recuperação de conta",
        `Um email de recuperação foi enviado para ${email}`,
        "success"
    );
}

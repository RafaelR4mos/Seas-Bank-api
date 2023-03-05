import Cliente from "../../js/entidade/cliente.js";

const submitBtn = document.getElementById("submit-btn");
const accountNumbner = document.getElementById("account-number");
const accountPassword = document.getElementById("account-password");
const goBackBtnLogin = document.getElementById("go-back-btn-login");

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
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        const clienteJSON = localStorage.getItem(accountNumbnerValue);
        if(clienteJSON == null){
            alert(
                "Cliente inexistente na base."
            );
        }else{
            const cliente = Cliente.fromJSON(JSON.parse(clienteJSON));
            if(cliente.cpf == accountNumbnerValue && cliente.senha == accountPasswordValue){
                const origen = 'login';
                window.localStorage.setItem("origen",origen);
                window.location.href = "../dashboard/";
            }else{
                alert(
                    "Dados do cliente não conferem. Tente novamente."
                );
            }

        }
    }
});

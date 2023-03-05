const submitBtn = document.getElementById("submit-btn");
const accountNumbner = document.getElementById("account-number");
const accountPassword = document.getElementById("account-password");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let accountNumbnerValue = accountNumbner.value;
    let accountPasswordValue = accountPassword.value;

    if (!accountNumbnerValue.trim() || !accountPasswordValue.trim()) {
        if (!accountNumbnerValue.trim()) {            
            accountNumbner.classList.add("invalid-input")
        } else {
            accountNumbner.classList.remove("invalid-input")            
        }
        if (!accountPasswordValue.trim()) {
            accountPassword.classList.add("invalid-input")
        } else {
            accountPassword.classList.remove("invalid-input")
        }
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        window.location.href = "../dashboard/";
    }
});
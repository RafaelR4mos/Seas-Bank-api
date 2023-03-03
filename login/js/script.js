const submitBtn = document.getElementById("submit-btn");
const accountNumbner = document.getElementById("account-number");
const accountPassword = document.getElementById("account-password");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let accountNumbnerValue = accountNumbner.value;
    let accountPasswordValue = accountPassword.value;

    if (!accountNumbnerValue.trim() || !accountPasswordValue.trim()) {
        if (!accountNumbnerValue.trim()) {
            accountNumbner.style.borderInline = "3px solid red";
        } else {
            accountNumbner.style.borderInline = "none";
        }
        if (!accountPasswordValue.trim()) {
            accountPassword.style.borderInline = "3px solid red";
        } else {
            accountPassword.style.borderInline = "none";
        }
        alert(
            "Por favor, preencha todos os campos. Algum campo do formulário está vazio."
        );
    } else {
        window.location.href = "../dashboard/";
    }
});

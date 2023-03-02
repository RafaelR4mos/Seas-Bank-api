const cpfInput = document.getElementById("cep-input");

cpfInput.addEventListener("input", () => {
    const cpfInputValue = cpfInput.value;

    if (cpfInputValue.length == 8) {
        buscarCep(cpfInputValue);
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

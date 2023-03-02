const searchInput = document.querySelector("#search-transaction-btn");
var transactionData = [
    {
        transactionTitle: "cinema jung",
        date: "28-02-2023",
        time: "21:15",
        category: "entertainment",
        type: "exit",
        value: "44.99",
    },
    {
        transactionTitle: "supermercado",
        date: "28-02-2023",
        time: "21:15",
        category: "entertainment",
        type: "exit",
        value: "44.99",
    },
];

searchInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();

        console.log(value);
        setList(
            transactionData.filter((transaction) => {
                return transaction.transactionTitle.includes(value);
            })
        );
    } else {
        console.log("não encontrado");
    }
});

let i = 0;
function setList(results) {
    for (const transaction of results) {
        console.log(results[i].transactionTitle);

        const transactionDiv = document.createElement("div");

        const createTransaction = `
                            <div class="info">
                                <div class="icon">
                                    <img
                                        src="./imgs/entertainment-icon.svg"
                                        alt="Imagem representativa de uma cadeira de cinema"
                                    />
                                </div>
                                <div class="transaction-title-info">
                                    <div class="header-info">
                                        <strong>${results}</strong>
                                        <div class="transaction-details-icon">
                                            <img
                                                src="./imgs/plus-icon.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <p>19 de Fevereiro às 21h15</p>
                                </div>
                            </div>
                            <div class="value">
                                <span
                                    >R$
                                    <strong class="spent">-44,99</strong></span
                                >
                                <button>Detalhes</button>
                            </div>`;

        const text = document.createTextNode(transaction.transactionTitle);
        console.log(text);
        // resultItem.appendChild(text)
        i++;
    }
}

const searchInputBtn = document.querySelector("#search-transaction-btn");
const searchInput = document.querySelector("#search-transaction-input");
const transactionContainer = document.querySelector(".transaction-container");
const filterBtn = document.querySelectorAll(".filter-btn");
const userName = document.getElementById("username");

var transactionData = [
    {
        transactionTitle: "cinema jung",
        date: "28-02-2023",
        time: "21:15",
        category: "entertainment",
        type: "spent",
        value: "44.99",
    },
    {
        transactionTitle: "supermercado mayra",
        date: "28-02-2023",
        time: "12:00",
        category: "store",
        type: "spent",
        value: "90",
    },
    {
        transactionTitle: "supermercado Pablo",
        date: "28-02-2023",
        time: "09:00",
        category: "store",
        type: "spent",
        value: "200",
    },
    {
        transactionTitle: "pix lucas amaral",
        date: "28-02-2023",
        time: "10:00",
        category: "transference",
        type: "income",
        value: "25",
    },
    {
        transactionTitle: "dog do maicon",
        date: "28-02-2023",
        time: "21:15",
        category: "entertainment",
        type: "spent",
        value: "60",
    },
    {
        transactionTitle: "salario dbc",
        date: "01-03-2023",
        time: "08:00",
        category: "entertainment",
        type: "income",
        value: "800",
    },
    {
        transactionTitle: "informatica da cris",
        date: "01-03-2023",
        time: "17:00",
        category: "store",
        type: "income",
        value: "90",
    },
    {
        transactionTitle: "restaurante do rafa",
        date: "01-03-2023",
        time: "12:00",
        category: "store",
        type: "spent",
        value: "70",
    },
    {
        transactionTitle: "lojas renner",
        date: "01-03-2023",
        time: "20:00",
        category: "food",
        type: "spent",
        value: "70",
    },
    {
        transactionTitle: "pix do alisson",
        date: "02-03-2023",
        time: "10:00",
        category: "transference",
        type: "income",
        value: "15",
    },
];

window.onload = () => {
    const user = window.localStorage.getItem("userinfo");
    const userFormated = user.toLowerCase();
    const userCardFormated = user.toUpperCase();
    userName.innerText = `Olá, ${userFormated}`;
    userNameCard.innerText = `${userFormated}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn-all").classList.add("active");

    setList(
        transactionData.map((transaction) => {
            return transaction;
        })
    );
});
searchInputBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearList();
    filterBtn.forEach((btn) => btn.classList.remove("active"));
    let value = searchInput.value;

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();

        console.log(value);

        setList(
            transactionData.filter((transaction) => {
                return transaction.transactionTitle.includes(value);
            })
        );

        document.querySelector(".transaction-title h2").innerText =
            "Transações encontradas";
    } else {
        console.log("não encontrado");
    }
});

filterBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        clearList();

        const clickedBtnId = e.target.id;
        const clickedBtn = e.target;
        console.log(e.target.id);

        filterBtn.forEach((btn) => btn.classList.remove("active"));

        if (clickedBtnId == "btn-income") {
            clickedBtn.classList.add("active");

            setList(
                transactionData.filter((transaction) => {
                    return transaction.type.includes("income");
                })
            );
        } else if (clickedBtnId == "btn-spent") {
            clickedBtn.classList.add("active");

            setList(
                transactionData.filter((transaction) => {
                    return transaction.type.includes("spent");
                })
            );
        } else {
            clickedBtn.classList.add("active");
            setList(
                transactionData.map((transaction) => {
                    return transaction;
                })
            );
        }
    });
});

function setList(results) {
    let i = 0;
    console.log(results);
    for (const transaction of results) {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction");
        const transactionBody = `
        <div class="info">
            <div class="icon">
            </div>
            <div class="transaction-title-info">
                <div class="header-info">
                    <strong>${results[i].transactionTitle}</strong>
                    <div class="transaction-details-icon">
                        <img
                            src="./imgs/plus-icon.svg"
                            alt=""
                        />
                    </div>
            </div>
                <p> ${results[i].time}</p>
                </div>
        </div>
                <div class="value">
                    <span
                        >R$
                        <strong class="${results[i].type}">${results[i].value}</strong></span
                    >
                </div>
                `;

        transactionDiv.innerHTML = transactionBody;
        transactionContainer.appendChild(transactionDiv);
        i++;
    }

    if (results.length === 0) {
        alert("Desulpe! Nenhum resultado encontrado.");
    }
}

function clearList() {
    while (transactionContainer.firstChild) {
        transactionContainer.removeChild(transactionContainer.firstChild);
    }
}

// const pesquisarCambio = async () => {
async function pesquisarCambio() {
    let moedas = ["USD-BRL", "EUR-BRL", "BTC-BRL"];

    const response = await fetch(
        `https://economia.awesomeapi.com.br/last/${moedas}`
    );
    const cambio = await response.json();
    return cambio;
}

pesquisarCambio().then((cambio) => {
    cambio; // fetched movies
    let moeda = Object.keys(cambio);
    const resultado = [];
    for (let e of moeda) {
        console.log(`
        ${cambio[e]["code"]} > ${cambio[e]["codein"]}
        low ${parseFloat(cambio[e]["low"], 10).toLocaleString("pt-BR", {
            style: "currency",
            currency: cambio[e]["codein"],
        })}
        high ${parseFloat(cambio[e]["high"], 10).toLocaleString("pt-BR", {
            style: "currency",
            currency: cambio[e]["codein"],
        })}`);

        resultado.push(
            `${cambio[e]["code"]} > ${cambio[e]["codein"]} - low ${parseFloat(
                cambio[e]["low"],
                10
            ).toLocaleString("pt-BR", {
                style: "currency",
                currency: cambio[e]["codein"],
            })} high ${parseFloat(cambio[e]["high"], 10).toLocaleString(
                "pt-BR",
                { style: "currency", currency: cambio[e]["codein"] }
            )} | `
        );
    }

    console.log(resultado);
    const item = document.getElementById("cambio");
    item.innerHTML = `
      <div>
        <p class="cotation-values">${resultado}</p>
      </div>
      `;
});

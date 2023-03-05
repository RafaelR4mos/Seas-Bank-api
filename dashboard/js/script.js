import Cliente from "../../js/entidade/cliente.js";
const searchInputBtn = document.querySelector("#search-transaction-btn");
const searchInput = document.querySelector("#search-transaction-input");
const transactionContainer = document.querySelector(".transaction-container");
const filterBtn = document.querySelectorAll(".filter-btn");
const userName = document.getElementById("username");
const saldoConta = document.getElementById("saldoConta");
const numberCard = document.getElementById("numberCard");

var transactionData = [];
const origen = window.localStorage.getItem("origen");
if(origen == "login"){
    transactionData = [
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
        }
    ];
}



window.onload = () => {
    const userCpf = window.localStorage.getItem("userinfo");
    const clienteJSON = localStorage.getItem(userCpf);
    const cliente = Cliente.fromJSON(JSON.parse(clienteJSON));


    const userFormated = cliente.nome.toLowerCase();
    const userCardFormated = cliente.nome.toUpperCase();
    userName.innerText = `Olá, ${userFormated}`;
    userNameCard.innerText = `${userFormated}`;
    if(origen == "sign-up"){
        saldoConta.innerText = 'R$ 0,00';
    } else {
        saldoConta.innerText = 'R$ 1.500,00';
    }
    numberCard.innerText = generateCreditCardNumber();
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

function generateCreditCardNumber() {
    let creditCardNumber = "4";

    for (let i = 0; i < 14; i++) {
      creditCardNumber += Math.floor(Math.random() * 10);
    }
  
    const checkDigit = generateLuhnCheckDigit(creditCardNumber);
  
    creditCardNumber += checkDigit;

    const formattedNumber = creditCardNumber.match(/.{1,4}/g).join(" ");

    return formattedNumber;
  }
  
  function generateLuhnCheckDigit(number) {
    const reversedNumber = number.split("").reverse().join("");
    let sum = 0;
    for (let i = 0; i < reversedNumber.length; i++) {
      const digit = parseInt(reversedNumber.charAt(i));
      if (i % 2 === 1) {
        sum += digit * 2 >= 10 ? digit * 2 - 9 : digit * 2;
      } else {
        sum += digit;
      }
    }
    const checkDigit = (10 - sum % 10) % 10;
    return checkDigit.toString();
  }
  
  
  
  

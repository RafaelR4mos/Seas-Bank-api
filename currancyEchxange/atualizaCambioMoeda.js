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
    low ${cambio[e]["low"]} high ${cambio[e]["high"]}`);

        resultado.push(
            `${cambio[e]["code"]} > ${cambio[e]["codein"]} - low ${cambio[e]["low"]} high ${cambio[e]["high"]}`
        );
    }

    const item = document.getElementById("cambio");
    item.innerHTML = `
  <div>
    <p class="cotation-values">${resultado}</p>
  </div>

  `;
});

// ESTUDANDO COMO PUXAR DADOS DO XML

// copiando os dados da tag `book` para o objeto `Book`
/* var Book = function (node) {
    var that = this;
    this.id = node.id;      
    [].forEach.call(node.childNodes, function (child, indice) {
      if (child.nodeType == 1) {
        that[child.nodeName] = child.textContent;
      }
    });
  }
  
  // criando um link para um XML. 
  var xml = document.getElementById("xml").innerHTML;
  var url = URL.createObjectURL(new Blob([xml], { type: "application/xml" }));
  var tbody = document.querySelector("tbody");
  
  // lendo um XML por AJAX.
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true)
  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4) {
      var catalog = httpRequest.responseXML.getElementsByTagName("catalog")[0];
      var books = catalog.getElementsByTagName("book");
      [].forEach.call(books, function (node, indice) {
        var book = new Book(node);     
        var linha = document.createElement("tr");      
        for (var indice = 0; indice < 6; indice++) {
          var celula = document.createElement("td");
          linha.appendChild(celula);
        }
        
        linha.dataset.id = book.id;
        linha.children[0].textContent = book.author;
        linha.children[1].textContent = book.title;
        linha.children[2].textContent = book.genre;
        linha.children[3].textContent = book.price;
        linha.children[4].textContent = book.publish_date;
        linha.children[5].textContent = book.description;
        
        tbody.appendChild(linha);
      });
    }
  });
  httpRequest.send(); */

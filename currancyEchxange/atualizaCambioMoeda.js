// const pesquisarCambio = async () => {
async function pesquisarCambio() {

  // let moedas = ['USD-BRL', 'EUR-BRL', 'BTC-BRL'];

  /*   const response = await fetch('/movies');
      // waits until the request completes...
      console.log(response);
    } */
  // async function fetchMovies() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
  const cambio = await response.json();
  return cambio;
}
pesquisarCambio().then(cambio => {
  cambio; // fetched movies
  let moedas = Object.keys(cambio);
  for (let e of moedas) {
    console.log(cambio[e])
  }
}
)
  // waits until the request completes...

  // await fetch(`https://economia.awesomeapi.com.br/last/${moedas.toString}`, {
  /*   const vamo = await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    }).then((cambios) => {
      if (cambios.length !== 0) {
        console.log(JSON.stringify(cambios));
        // document.getElementById('resposta').innerHTML =
        //     `<div class="card" style="width: 18rem;">                
        //     <div class="card-body">
        //       <h5 class="card-title">${dogs[0]['name']}</h5>
        //     </div>
        //     <ul class="list-group list-group-flush">
        //         <li class="list-group-item">Grupo: ${dogs[0]['breed_group']}</li>
        //         <li class="list-group-item">Expectativa de vida: ${dogs[0]['life_spam']}</li>
        //         <li class="list-group-item">Temperamento: ${dogs[0]['temperament']}</li>
        //     </ul>                  
        //     </div>
        //   </div> <hr/>`
      }
    })
    console.log(vamo) */
  ;

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
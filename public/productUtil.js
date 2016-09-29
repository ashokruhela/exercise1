function mediaQuerySupportForIELessThan8() {
  console.log(navigater.appName);
}

function getProducts(){
  //make an ajax request to get product data
  var xhttp;
  if(window.XMLHttpRequest) {
    //for IE7+
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhttp.onload = function() {
    addProducts(JSON.parse(this.response));
  };

  xhttp.oneror = function() {
    console.log('error occured');
  }

  xhttp.open("GET",'http://localhost:3000/products', true);
  xhttp.send();
  // return products;
}

function addProducts(products) {
  var table = document.getElementById('table-body');
  var row, productCell, rateCell, depositCell, typeCell;
  for(var i=0; i< products.length; i++) {
    row = table.insertRow(-1); //alwarys insert at last row
    row.setAttribute('data-row-index', i + 1);
    row.setAttribute('data-product-name', products[i].name);

    if(i != 0) {
      row.setAttribute('class', 'collapsed');
    } else {
      row.setAttribute('class', 'currentRecord');
    }

    productCell = row.insertCell(0);
    rateCell = row.insertCell(1);
    depositCell = row.insertCell(2);
    typeCell = row.insertCell(3);
    productCell.innerHTML  = products[i].name;
    rateCell.innerHTML = products[i].interest;
    depositCell.innerHTML = products[i].mindeposit;
    typeCell.innerHTML = products[i].interestType;

  }
  setLinkCaptions(products[products.length -1].name, products[1].name);
}

function onNextClick (e) {
  var productTable = document.getElementById('productTable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.dataset.rowIndex) ;
  var nextRowInex = 1;
  if(currentRowIndex != productTable.rows.length - 1) {
    nextRowInex = parseInt(currentRowIndex) + 1;
  }
  productTable.rows[nextRowInex].setAttribute('class', 'currentRecord');
  setLinkCaptions(currentRow.dataset.productName, productTable.rows[(nextRowInex + 1) < productTable.rows.length ? nextRowInex + 1 : 1 ].dataset.productName);
  currentRow.setAttribute('class', 'collapsed');
}

function onPrevClick (e) {
  alert('previous clicked');
}

function setLinkCaptions(prevButton, nextButton) {
  var prevLink = document.getElementById('prevLink');
  var nextLink = document.getElementById('nextLink');
  prevLink.value = "< " + prevButton;
  nextLink.value = nextButton + " >";
}

getProducts();

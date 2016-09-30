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
  //products[products.length -1].name
  setLinkCaptions("", products[1].name);
}

function onNextClick (e) {
  var prevLinkCaption = "";
  var nextLinkCaption = "";
  var productTable = document.getElementById('productTable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.dataset.rowIndex) ;
  var nextRowInex = 1;
  if(currentRowIndex != productTable.rows.length - 1) {
    nextRowInex = parseInt(currentRowIndex) + 1;
  }

  if(nextRowInex < productTable.rows.length - 1) {
    nextLinkCaption = productTable.rows[nextRowInex + 1].dataset.productName;
    prevLinkCaption = currentRow.dataset.productName;
  } else if(nextRowInex == productTable.rows.length - 1) {
    prevLinkCaption = productTable.rows[1].dataset.productName;
  }


  productTable.rows[nextRowInex].setAttribute('class', 'currentRecord');


  setLinkCaptions(prevLinkCaption, nextLinkCaption);
  currentRow.setAttribute('class', 'collapsed');
}

function onPrevClick (e) {
  var prevLinkCaption = "";
  var nextLinkCaption = "";
  var productTable = document.getElementById('productTable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.dataset.rowIndex) ;
  var prevRowInex = productTable.rows.length - 1;
  if(currentRowIndex > 1) {
    prevRowInex = currentRowIndex - 1;
  }
  //set captions
  if(prevRowInex > 1) {
    prevLinkCaption = productTable.rows[prevRowInex - 1].dataset.productName;
    nextLinkCaption = currentRow.dataset.productName;
  } else{
    nextLinkCaption = productTable.rows[2].dataset.productName;
  }


  productTable.rows[prevRowInex].setAttribute('class', 'currentRecord');
  setLinkCaptions(prevLinkCaption, nextLinkCaption);
  currentRow.setAttribute('class', 'collapsed');
}

function setLinkCaptions(prevButton, nextButton) {
  var prevLink = document.getElementById('prevLink');
  var nextLink = document.getElementById('nextLink');

  //If cantion is blank then button has to be hidden
  if(prevButton == "")
    prevLink.style.display = 'none';
  else {
    prevLink.value = "< " + prevButton;
    prevLink.style.display = 'block';
  }


  if(nextButton == "")
    nextLink.style.display = 'none';
  else {
    nextLink.value = nextButton + " >";
    nextLink.style.display = 'block';
  }

}

getProducts();

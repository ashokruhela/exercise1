var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('./public'));
// app.use(expr ess.static(path.join(__dirname, 'public')));

app.get('/products', function(req, res) {
  var products = [
    {
      name: "Fixed Saver",
      interest: "2.20",
      mindeposit:500,
      interestType:"Fixed"
    },
    {
      name: "Flex Saver",
      interest: "1.5",
      mindeposit:800,
      interestType:"Tracker"
    },
    {
      name: "Offset Saver",
      interest: "1.8",
      mindeposit:3000,
      interestType:"Fixed"
    },
    {
      name: "Saving Plan",
      interest: "3.8",
      mindeposit:5000,
      interestType:"Flex"
    }
  ];
  res.json(products);
});

app.get('/table', function(req, res){
  res.sendfile('table.html');
});

app.listen(3000, function() {
  console.log('server started on port 3000');
});

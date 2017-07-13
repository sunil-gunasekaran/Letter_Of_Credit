
var ipfsAPI = require('ipfs-api');
var express = require('express');
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');
var util = require('util');

function upload() {

var path_value = document.getElementById("file_name").value;

ipfs.util.addFromFs(path_value, { recursive: false , ignore: ['subfolder/to/ignore/**']}, (err, result) => {
  if (err) {
    throw err
  }
  console.log(result)
});

}

/*
  Bank Registration API
*/
function registerBank() {

  // Gets the bank details from the customer
  var _bank_name        = document.getElementById("bank_name").value;
  var _bank_addr        = document.getElementById("bank_addr").value;

  var gov = Governance.deployed(); // Deployed contract instance

  var func = gov.then(function(instance) {

      return instance.registerBank(_bank_name,_bank_addr,{from:web3.eth.coinbase,gas:1164443});

  });

  alert("Bank registration successfull !!");
loadBanks();
}

/*
    Get all the available banks
*/
function loadBanks() {

  //Get all the available registered banks
  var table_header ='<table style="width:100%" border=4><tr><th>Bank Address</th></tr>';
  var tablecont = table_header ;
  var endtable ="</table>";

  var gov = Governance.deployed(); // Deployed contract instance
  var func = gov.then(function(instance){return instance.getAvailableBanks.call();});


  func.then(function(output) { 
    
        for(var i =0 ;i < output.length ; i++) { 

          tablecont = tablecont + "<tr>" + "<td>" + output[i] + "</td>" + "</tr>";
          if ( i == output.length -1) {
                var final =  tablecont  + endtable ;
                 alert(final);
                var divtable = document.getElementById("mytable");
                divtable.innerHTML = final;

            }
        }
  });
}




























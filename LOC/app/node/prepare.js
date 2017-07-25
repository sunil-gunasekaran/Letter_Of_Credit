
var express = require('express');
var ipfsAPI = require('ipfs-api')
var multer = require('multer')
var bodyparser = require ('body-parser')
var util = require('util')
var fs = require('fs')
var path=require('path')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');
var app = express()
var router = express.Router();
var upload = multer({ storage: storage})
var jsonparser = bodyparser.json();


app.listen(8888);
app.set("json spaces",0);
app.use(bodyparser.json())
var mime = require("mime")


//app.use(bodyparser.urlencoded({ extended: false }));

const truffleContractFactory = require("truffle-contract");
const Web3 = require("web3");
const GovJSON  = require("/home/blockchain/projects/LOC/build/contracts/Governance.json");
const SellSON  = require("/home/blockchain/projects/LOC/build/contracts/SellerWarehouse.json");
const BuyerJSON  = require("/home/blockchain/projects/LOC/build/contracts/BuyerRegistry.json");
const CarrierJSON  = require("/home/blockchain/projects/LOC/build/contracts/CarrierRegistry.json");
const AdvisingBankJSON  = require("/home/blockchain/projects/LOC/build/contracts/AdvisingBankRegistry.json");
const IssuingBankJSON  = require("/home/blockchain/projects/LOC/build/contracts/IssuingBankRegistry.json");
const PurchaseJSON  = require("/home/blockchain/projects/LOC/build/contracts/Purchase.json");
const PurchaseExecutor  = require("/home/blockchain/projects/LOC/build/contracts/PurchaseExecutor.json");
const LOCExecutor  = require("/home/blockchain/projects/LOC/build/contracts/LOCExecutor.json");
const ShippingExecutor  = require("/home/blockchain/projects/LOC/build/contracts/ShippingExecutor.json");

const MigrationsJSON = require("/home/blockchain/projects/LOC/build/contracts/Migrations.json");

// ABI and Truffle goodies
const Gov = truffleContractFactory(GovJSON);
const Sell = truffleContractFactory(SellSON);
const Buy = truffleContractFactory(BuyerJSON);
const Car = truffleContractFactory(CarrierJSON);
const AdvBank = truffleContractFactory(AdvisingBankJSON);
const IssBank = truffleContractFactory(IssuingBankJSON);
const Pur = truffleContractFactory(PurchaseJSON);
const PurExec = truffleContractFactory(PurchaseExecutor);
const LOCExec = truffleContractFactory(LOCExecutor);
const ShipExec = truffleContractFactory(ShippingExecutor);

const Mig = truffleContractFactory(MigrationsJSON);


if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet provider.
    web3 = new Web3(web3.currentProvider);
} else {
    // Use the provider from the config.
   //web3 = new Web3(new Web3.providers.IpcProvider('/home/blockchain/projects/pfizer/privatechain/data/geth.ipc',require('net')));
   // testrpc integration 
   //web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8001'));
}

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname,'./imagesPath/'));
  },
  filename: function (req, file, callback) {
    var ext = file.originalname.split('.').pop();
    callback(null,file.originalname);
  }
});


// Instruct the contracts to use the prepared Geth node.
web3.eth.getAccounts((err, acc) => console.log("acc", acc));

[Gov,Sell, Buy,Car,AdvBank,IssBank,Pur,PurExec,LOCExec,ShipExec, Mig].forEach(contract => contract.setProvider(web3.currentProvider));

// Get the List of available accounts
web3.eth.getAccountsPromise = () => 
    new Promise((resolve, reject) =>
        web3.eth.getAccounts((error, accounts)  =>
            error ? reject(error) : resolve(accounts)));

/***********************************************************
      Method name : Advising Bank Registration
************************************************************/
app.post('/registerAdvisingBank',jsonparser,function(req,res) {

      var bank_name    = req.body.bank_name;
      var bank_addr    = req.body.bank_addr;

      console.log("\nStart Advising Bank Registration");
      console.log("bank_name:"+bank_name);
      console.log("bank_addr:"+bank_addr);

      web3.eth.getAccountsPromise()
                        .then(accounts => { Gov.deployed()
                        .then(instance => {instance
                        .registerAdvisingBank.sendTransaction(bank_name,bank_addr,{from:bank_addr,gas:97000000})
                        .then(txHash => {
                        // Event monitoring
                        var myEvent = instance.advbankRegistration({fromBlock: "latest"});
                        myEvent.watch(function (err, result) {
                        if (err) { 
                          console.error(err);
                        }
                        else {
                                if(result.args.message) {
                                    res.status(500).send({error: result.args.message});
                                    res.end();
                                    myEvent.stopWatching();                                                   
                                    console.error("Event received :" + result.args.message);
                                }
                                else {
                                        myEvent.stopWatching();                                                   
                                        res.end();
                                }
                             }
                        });
                        }
                        ).catch(console.error);}
                                                  )
                                                  }
                    ).catch(console.error);
      console.log("End Advising Bank Registration");
 });

/***********************************************************
      Method name : Issuing Bank Registration
************************************************************/
app.post('/registerIssuingBank',jsonparser,function(req,res) {

      var bank_name    = req.body.bank_name;
      var bank_addr    = req.body.bank_addr;
      
      console.log("Start Issuing Bank Registration");
      console.log("bank_name:"+bank_name);
      console.log("bank_addr:"+bank_addr);

      web3.eth.getAccountsPromise()
                        .then(accounts => { Gov.deployed() 
                        .then(instance => { instance 
                        .registerIssuingBank.sendTransaction(bank_name,bank_addr,{from:bank_addr,gas:97000000}) 
                        .then(txHash => {
                        // Event monitoring
                        var myEvent = instance.issbankRegistration({fromBlock: "latest"});
                        myEvent.watch(function (err, result) {
                        if (err) { 
                          console.error(err);
                        }
                        else {
                                if(result.args.message) {
                                    res.status(500).send({error: result.args.message});
                                    res.end();
                                    myEvent.stopWatching();                                                   
                                    console.error("Event received :" + result.args.message);
                                }
                                else {
                                        myEvent.stopWatching();                                                   
                                        res.end();
                                }
                             }
                        });
                        }
                        ).catch(console.error);}
                                                  )
                                                  }
                    ).catch(console.error);
      console.log("End Issuing Bank Registration");
 });


/***********************************************************
      Method name : Seller Registration
************************************************************/
app.post('/registerSeller',jsonparser,function(req,res) {

      console.log("Start Seller Registration");

      var name            = req.body.seller_name;
      var product         = req.body.seller_product;
      var seller_addr     = req.body.seller_addr
      var bank_addr       = req.body.bank_addr;
      var cost            = req.body.cost;

      console.log("name="+name);
      console.log("product="+product);
      console.log("seller_addr="+seller_addr);
      console.log("bank_addr="+bank_addr);
      
      web3.eth.getAccountsPromise()
                        .then(accounts => { Gov.deployed()
                        .then(instance => { instance 
                        .registerSeller.sendTransaction(name,product,cost,seller_addr,bank_addr,{from: seller_addr,gas:97000000})
                        .then(txHash => {
                        // Event monitoring
                        var myEvent = instance.sellerRegistration({fromBlock: "latest" });
                        myEvent.watch(function (err, result) {
                        if (err) { 
                          console.error(err);
                        }
                        else {
                                if(result.args.message) {
                                    res.status(500).send({error: result.args.message});
                                    res.end();
                                    myEvent.stopWatching();                                                   
                                    console.error("Event received :" + result.args.message);
                                }
                                else {
                                        myEvent.stopWatching();                                                   
                                        res.end();
                                }
                             }
                        });
                        }
                        ).catch(console.error);}
                                                  )
                                                  }
                    ).catch(console.error);
      console.log("End Seller Registration");
 });


/***********************************************************
      Method name : Buyer Registration
************************************************************/
app.post('/registerBuyer',jsonparser,function(req,res) {
      
      console.log("Start Buyer registration");

      var buyer_name    = req.body.buyer_name;
      var buyer_addr    = req.body.buyer_addr;
      var bank_addr     = req.body.bank_addr;

      console.log("buyer_name="+buyer_name);
      console.log("buyer_addr="+buyer_addr);
      console.log("bank_addr="+bank_addr);

      web3.eth.getAccountsPromise()
                        .then(accounts => { Gov.deployed()
                        .then(instance => { instance      
                        .registerBuyer.sendTransaction(buyer_name,buyer_addr,bank_addr,{from: buyer_addr,gas:97000000})
                        .then(txHash => {
                        // Event monitoring
                        var myEvent = instance.buyerRegistration({fromBlock: "latest" });
                        myEvent.watch(function (err, result) {
                        if (err) { 
                          console.error(err);
                        }
                        else {
                                if(result.args.message) {
                                    res.status(500).send({error: result.args.message});
                                    res.end();
                                    myEvent.stopWatching();                                                   
                                    console.error("Event received :" + result.args.message);
                                }
                                else {
                                        myEvent.stopWatching();                                                   
                                        res.end();
                                }
                             }
                        });
                        }
                        ).catch(console.error);}
                                                  )
                                                  }
                    ).catch(console.error);
      console.log("End Buyer Registration");
 });


/***********************************************************
      Method name : Carrier Registration
************************************************************/
app.post('/registerCarrier',jsonparser,function(req,res) {

      console.log("Start Carrier registration");

      var carrier_name    = req.body.carrier_name;
      var carrier_addr    = req.body.carrier_addr;
      var bank_addr       = req.body.bank_addr;

      console.log("Carrier name ="+carrier_name);
      console.log("Carrier addrress = "+carrier_addr);
      console.log("Bank address ="+bank_addr);

      web3.eth.getAccountsPromise()
                        .then(accounts => { ShipExec.deployed() //1
                        .then(instance => { instance       //2
                        .registerCarrier.sendTransaction(carrier_name,carrier_addr,bank_addr,{from: carrier_addr,gas:97000000}) //3 and end 3
                        .then(txHash => {
                        // Event monitoring
                        var myEvent = instance.carrierRegistration({fromBlock: "latest" });
                        myEvent.watch(function (err, result) {
                        if (err) { 
                          console.error(err);
                        }
                        else {
                                if(result.args.message) {
                                    res.status(500).send({error: result.args.message});
                                    res.end();
                                    myEvent.stopWatching();                                                   
                                    console.error("Event received :" + result.args.message);
                                }
                                else {
                                        myEvent.stopWatching();                                                   
                                        res.end();
                                }
                             }
                        });
                        }
                        ).catch(console.error);}
                                                  )
                                                  }
                    ).catch(console.error);
      console.log("End Carrier Registration");
 });


/***********************************************************
      Method name : Get Advising Bank details
************************************************************/
app.get('/getAvailableAdvBanks',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Advising Banks");
    var DataArr = new Array();
    var details;
    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(  instance    => { instance.getAvailableAdvBanks.call()
                            .then(contract_addr => {  
          
          if (contract_addr.length == 0) res.send();
          for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                var x = 0;
                AdvBank.at(contract_addr[i]).then(inst => inst.getBankInfo.call()).then(result=> {
                  console.log(result[2]);
                          details = {bank_name: result[0] , bank_address: result[1], balance : Math.round(web3.fromWei(result[2],"ether")).toLocaleString('en')};
                          DataArr.push(details);
                          x++;
                          if ( i == x) {
                                
                                console.log(DataArr);
                                res.write(JSON.stringify(DataArr));
                                res.send();
                            }
                }).catch(console.error);
          }
                                                   }

                                  )}))
  .catch(console.error);
  console.log("End Get all Advising Banks");
});

/***********************************************************
      Method name : Get Issuing Bank details
************************************************************/
app.get('/getAvailableIssBanks',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Issuing Banks");
    var DataArr = new Array();
    var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(  instance    => { instance.getAvailableIssBanks.call()
                            .then(contract_addr => {  
          
          if (contract_addr.length == 0) res.send();
          for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                var x = 0;
                IssBank.at(contract_addr[i]).then(inst => inst.getBankInfo.call()).then(result=> {
                          details = {bank_name: result[0] , bank_address: result[1], balance : Math.round(web3.fromWei(result[2],"ether")).toLocaleString('en')};
                          DataArr.push(details);
                          x++;
                          if ( i == x) {
                                
                                console.log(DataArr);
                                res.write(JSON.stringify(DataArr));
                                res.send();
                            }
                }).catch(console.error);
          }
                                                   }

                                  )}))
  .catch(console.error);
  console.log("End Get all Issuing Banks");
});

/***********************************************************
      Method name : Seller details retrieval
************************************************************/
app.get('/getAllSellerDetails',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Seller Details");
    var DataArr = new Array();
    var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(  instance    => { instance.getAllSellerDetails.call()
                            .then(contract_addr => {  
          
          if (contract_addr.length == 0) res.send();
          for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                var x =0;
                Sell.at(contract_addr[i]).then(inst => inst.getSellerStuff.call()).then(result=> {
                          details = {seller_name: result[0],
                                     seller_addr: result[1],
                                     seller_product:result[2],
                                     seller_cost:result[3],
                                     seller_bank_addr:result[4]};
                          DataArr.push(details);
                          x++;
                          if ( i == x) {
                                console.log(DataArr);
                                res.write(JSON.stringify(DataArr));
                                res.send();
                            }
                }).catch(console.error);
          }
                                                   }

                                  )}))
  .catch(console.error);
  console.log("End Get all Seller Details");
});

/***********************************************************
      Method name : Buyer details retrieval
************************************************************/
app.get('/getAvailableBuyers',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Buyer Details");
    var DataArr = new Array();
    var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(  instance    => { instance.getAvailableBuyers.call()
                            .then(contract_addr => {  
          
          if (contract_addr.length == 0) res.send();
          for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                var x =0;
                Buy.at(contract_addr[i]).then(inst => inst.getBuyerInfo.call()).then(result=> {
                          details = {buyer_name: result[0],buyer_address: result[1],bank_address:result[2]};
                          DataArr.push(details);
                          x++;
                          if ( i == x) {
                                console.log(DataArr);
                                res.write(JSON.stringify(DataArr));
                                res.send();
                            }
                }).catch(console.error);
          }
                                                   }

                                  )}))
  .catch(console.error);
  console.log("End Get all Buyer Details");
});


/***********************************************************
      Method name : Carrier details retrieval
************************************************************/
app.get('/getAvailableCarriers',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Carrier Details");
    var DataArr = new Array();
    var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => ShipExec.deployed()
                            .then(  instance    => { instance.getAvailableCarriers.call()
                            .then(contract_addr => {  
          console.log(contract_addr[0]);
          if (contract_addr.length == 0) res.send();
          for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                var x =0;
                Car.at(contract_addr[i]).then(inst => inst.getCarrierInfo.call()).then(result=> {
                          details = {carrier_name: result[0],carrier_address: result[1],bank_address:result[2]};
                          DataArr.push(details);
                          x++;
                          if ( i == x) {
                                console.log(DataArr);
                                res.write(JSON.stringify(DataArr));
                                res.send();
                            }
                }).catch(console.error);
          }
                                                   }

                                  )}))
  .catch(console.error);
  console.log("End Get all Carrier Details");
});



/***********************************************************
      Method name : Execute a purchase action
************************************************************/
app.post('/purchase',jsonparser,function(req,res) {

      var seller_addr      = req.body.seller_addr;
      var buyer_name       = req.body.buyer_name;
      var buyer_addr       = req.body.buyer_addr
      var product          = req.body.products;
      var quantity         = req.body.quantity;

      console.log("Start purchase");
      console.log("seller_addr:"+seller_addr);
      console.log("buyer_name:"+buyer_name);
      console.log("buyer_addr:"+buyer_addr);
      console.log("product:"+product);
      console.log("quantity:"+quantity);
      var seller_contract_addr;
      console.log("Get Seller Contract Address");

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(result => { 
                              web3.eth.getAccountsPromise()
                              .then(accounts => PurExec.deployed() //1
                              .then(instance => {                               

                               console.log("seller_contract_addr="+seller_contract_addr) ;
                               instance.purchaseProduct.sendTransaction(seller_contract_addr,
                                                                        buyer_name,
                                                                        buyer_addr,
                                                                        product,
                                                                        quantity,
                                                                        {from: buyer_addr,gas:97000000}) //3 and end 3
                              .then(txHash => {res.end();}) // 4 and end 4
                                                  }) //end 2
                    ).catch(console.error);
                              seller_contract_addr = result;
                              console.log("End purchase");
                            })));
 });


/*******************************************************************
      Method name : Get Purchase detail by providing buyer address
********************************************************************/
app.post('/getPurchaseDetail',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all Purchase Details");
 
    var seller_addr      = req.body.seller_addr;
    var buyer_addr       = req.body.buyer_addr
   
    console.log("seller_addr:"+seller_addr);
    console.log("buyer_addr:"+buyer_addr);
    
    var DataArr = new Array();
    var details;
           var seller_contract_addr;
 
    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(result => { 
    
    web3.eth.getAccountsPromise()
                            .then(accounts => PurExec.deployed()
                            .then(instance => { instance.getPurchaseOrderByBuyer.call(seller_contract_addr,seller_addr,buyer_addr)
                            .then(contract_addr => 
                              {  
                                        if (contract_addr.length == 0) res.send();
                                        for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                                            var x =0;
                                            console.log(contract_addr[i]);
                                            
                                            if (contract_addr[i]=='0x0000000000000000000000000000000000000000') 
                                                break;
                                            Pur.at(contract_addr[i]).then(inst => inst.getPurchaseInfo.call()).then(result=> {
                                                    details = {
                                                  purchase_addr : result[0],
                                                  //buyer_name    : result[1],
                                                  //buyer_address : result[2],
                                                  product       : result[3],
                                                  quantity      : result[4],
                                                  cost          : result[5],
                                                  order_accepted: result[6],
                                                  //filename      : result[7],
                                                  file_hash     : result[8]};

                                                  if (!details.order_accepted) {
                                                    details.order_accepted="Not confirmed by Seller";
                                                    details.filename = "----";
                                                    details.file_hash = "----";
                                                  }
                                                  else {
                                                    details.order_accepted="Confirmed by Seller";
                                                  }



                                        
                                                  DataArr.push(details);
                                                  x++;
                                        
                                                  if ( i == x) {
                                                      console.log(DataArr);
                                                      res.write(JSON.stringify(DataArr));
                                                      res.send();
                                                  }
                                                  }).catch(console.error);
                                        }
                              }
                        )})).catch(console.error);
                              seller_contract_addr = result;
                                                            console.log(seller_contract_addr);

                              console.log("End getPurchaseDetail");
                            })));
});


/*******************************************************************
      Method name : Get all the purchase details
********************************************************************/
app.post('/getAllPurchases',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
    console.log("Start Get all the Purchases");
 
    var seller_addr      = req.body.seller_addr;
   
    console.log("seller_addr:"+seller_addr);
    
    var DataArr = new Array();
    var details;
      
    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(result => { 
    
    web3.eth.getAccountsPromise()
                            .then(accounts => PurExec.deployed()
                            .then(instance => { instance.getAllPurchasesBySeller.call(seller_contract_addr)
                            .then(contract_addr => 
                              {  
                                        if (contract_addr.length == 0) res.send();
                                        for (var i = 0 ; i < contract_addr.length ; i++) {  // Looping all the contract addresses
                                            var x =0;

                                            if (contract_addr[i]=='0x0000000000000000000000000000000000000000') 
                                                break;

                                            Pur.at(contract_addr[i]).then(inst => inst.getPurchaseInfo.call()).then(result=> {
                                                  details = {
                                                  purchase_addr : result[0],
                                                  buyer_name    : result[1],
                                                  buyer_address : result[2],
                                                  product       : result[3],
                                                  quantity      : result[4],
                                                  cost          : result[5],
                                                  order_accepted: result[6],
                                                  //filename      : result[7],
                                                  file_hash     : result[8]};
                                        
                                                  if (!details.order_accepted) {
                                                    details.order_accepted="Not confirmed by Seller";
                                                    details.filename = "----";
                                                    details.file_hash = "----";
                                                  }
                                                  else {
                                                    details.order_accepted="Confirmed by Seller";
                                                  }

                                                  DataArr.push(details);
                                                  x++;
                                        
                                                  if ( i == x) {
                                                      console.log(DataArr);
                                                      res.write(JSON.stringify(DataArr));
                                                      res.send();
                                                  }
                                                  }).catch(console.error);
                                        }
                              }
                        )})).catch(console.error);
                              seller_contract_addr = result;
                              console.log("End Get all the Purchases");
                            })));
});

/*******************************************************************
      Method name : approve purchase order
********************************************************************/
var __dirname = "/home/blockchain/tmp/";
app.post('/approve',jsonparser,function(req,res) {

 console.log(req.headers);

    console.log("Start approve purchase order");
    var seller_addr      = req.body.seller_addr;
    var buyer_addr       = req.body.buyer_addr;
    var purchase_addr    = req.body.purchase_addr;
    var filename         = req.body.uploadfile;
    var filehash;

    /* Approve request process */
    console.log("seller_addr:"+seller_addr);
    console.log("buyer_addr"+buyer_addr);
    console.log("dirname:"+__dirname);
    console.log("filename:"+filename);

    ipfs.util.addFromFs(path.join(__dirname,filename),(err, result)=>{

          if (err) {
            console.log("Upload file error to IPFS:" + err);
            res.status(500).send({error: err}); 
          }
      
          console.log("successfully uploaded the file to IPFS"); 
          fileHash = result[0].hash;
          console.log("Hash value of the file = " + fileHash ); 

          web3.eth.getAccountsPromise()
                              .then(accounts => Gov.deployed()
                              .then(instance => instance
                              .getSellerContractAddr.call(seller_addr)
                              .then(result => { web3.eth.getAccountsPromise()
                              .then(accounts => PurExec.deployed() //1
                              .then(instance => {                               
                               console.log("seller_contract_addr="+seller_contract_addr) ;

                               instance.approvePurchase.sendTransaction(seller_contract_addr,
                                                                        purchase_addr,
                                                                        buyer_addr,
                                                                        filename,
                                                                        fileHash,
                                                                        {from: seller_addr,gas:97000000}) //3 and end 3
                              .then(txHash => {console.log(txHash);res.write(txHash);res.send();}) // 4 and end 4
                                                  }) //end 2
                                  ).catch(console.error);
                              seller_contract_addr = result;
                                })))
         console.log("End approve purchase order");
    });
});

/*******************************************************************
      Method name : Get purchase agreement by Hash
********************************************************************/
app.post('/GetPurchaseAgreement',jsonparser, function(req,res) {

    console.log("Start Get Purchase agreement");
    __dirname ="/home/blockchain/output/";
    var fileId, fileHash,filename;

    fileHash = req.body.hash;
    filename = req.body.filename;
    
    console.log("fileHash:"+fileHash);
    console.log("filename:"+filename);
    console.log("dirname:"+__dirname);

    var filePath = path.join(__dirname, filename);
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    console.log(filePath);

    ipfs.files.cat(fileHash, function (err, stream) {

          var mimetype = mime.lookup(filePath);
          var writedoc = fs.createWriteStream(filePath,{'flags':'a'});
  
          res.setHeader('Content-disposition', 'attachment; filename=' + filename);
          res.setHeader('Content-type', mimetype);
    
          stream.on('data',function (chunk) {
              writedoc.write(chunk);
          });

          stream.on('error', function () {
              fs.unlinkSync(filePath);
              console.error('Error downloading file', err)
              res.status(500).send({error: err.toString()}); 
          });

          stream.on('end', function () {
            //var outfile = fs.createReadStream(filePath);
            //outfile.pipe(res);
          });
    
          res.end();
    })
  
  console.log("End Get Purchase agreement");

});


/*******************************************************************
      Method name : Request for Letter of Credit using Sale Agreement Hash
********************************************************************/
app.post('/requestLOC',jsonparser,function(req,res) {

  console.log("Start Request for LOC");

    var seller_addr      = req.body.seller_addr;
    var buyer_addr       = req.body.buyer_addr;
    var filehash         = req.body.filehash;
    var bank_addr        = req.body.bank_addr;
    var issbank_addr     = req.body.issbank_addr;

    var purchase_addr    = req.body.purchase_addr;

    console.log("seller_addr:"+seller_addr);
    console.log("buyer_addr:"+buyer_addr);
    console.log("filehash:"+filehash);
    console.log("bank_addr:"+bank_addr);
    console.log("purchase_addr:"+purchase_addr);
    console.log("issbank_addr:"+issbank_addr);

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getAdvBankContractAddr.call(bank_addr)
                            .then(result => { 
                              web3.eth.getAccountsPromise()
                              .then(accounts => LOCExec.deployed() //1
                              .then(instance => {                               

                               console.log("adv_bank_contract_addr="+bank_contract_addr) ;
                               instance.requestForLOC.sendTransaction(filehash,
                                                                        seller_addr,
                                                                        buyer_addr,
                                                                        bank_addr,
                                                                        issbank_addr,
                                                                        bank_contract_addr,
                                                                        purchase_addr,
                                                                        {from: buyer_addr,gas:97000000}) //3 and end 3
                              .then(txHash => {res.end();}) // 4 and end 4
                                                  }) //end 2
                    ).catch(console.error);
                              bank_contract_addr = result;
                              console.log("***"+bank_contract_addr);
                              console.log("End purchase");
                            })));

      console.log("End Request for LOC");

});



/*******************************************************************
      Method name : User requesting the status of LOC 
********************************************************************/

app.post('/getMyLocStatus',jsonparser,function(req,res) {

    console.log("Start Request for LOC");
    res.setHeader('Content-type','application/json');

    var filehash         = req.body.filehash;
    var bank_addr        = req.body.bank_addr;

    var DataArr = new Array();
    var details;


    console.log("Get my LOC status");
  
    console.log("filehash:"+filehash);
    console.log("bank_addr:"+bank_addr);

    web3.eth.getAccountsPromise()
                              .then(accounts => Gov.deployed()
                              .then(instance => instance
                              .getAdvBankContractAddr.call(bank_addr)
                              .then(result => { 
                               web3.eth.getAccountsPromise()
                              .then(accounts => LOCExec.deployed() //1
                              .then(instance => {                               
                                                  console.log("adv_bank_contract_addr="+bank_contract_addr) ;
                                                  instance.getMyLocIndex(filehash,bank_contract_addr)
                              .then(myresult => {
                                                  console.log("Index="+myresult);
                                                  web3.eth.getAccountsPromise()
                                                  .then(accounts => AdvBank.at(bank_contract_addr)
                                                  .then(instance => instance.getLocStatusByIndex(myresult)
                                                  .then (out => {   

                        details = {
                                                 sale_agreement : out[0],
                                                  buyer_addr    : out[2],
                                                  seller_addr : out[1],
                                                  issbank_addr       : out[3],
                                                  purchase_addr       : out[4],
                                                  loc_status      : out[5],
                                                  loc_hash          : out[6]
                                  };

                              if (!details.loc_status) {
                                                    details.loc_status="Not issued";
                                                  }
                                                  else {
                                                    details.loc_status="Issued";
                                                  }


                                                      DataArr.push(details);
                                                      console.log(DataArr);
                                                      res.write(JSON.stringify(DataArr));
                                                      res.send();
                                                })));
                                                });
                                                }) //end 2
                    ).catch(console.error);
                              bank_contract_addr = result;
                              console.log("End purchase");
                            })));
      console.log("End Request for LOC");
});


/*******************************************************************
      Method name : Banker requesting Letter of Credit
********************************************************************/

app.post('/getAllLocReq',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');

    console.log("Start Request for LOC");
    var bank_addr        = req.body.bank_addr;
    var DataArr = new Array();
    var details;


    console.log("Get my LOC status");
  
    console.log("bank_addr:"+bank_addr);

    web3.eth.getAccountsPromise()
                              .then(accounts => Gov.deployed()
                              .then(instance => instance
                              .getAdvBankContractAddr.call(bank_addr)
                              .then(result => { 
                               web3.eth.getAccountsPromise()
                              .then(accounts => LOCExec.deployed() //1
                              .then(instance => {                               
                                                  console.log("adv_bank_contract_addr="+bank_contract_addr) ;
                                                  instance.getAllLocStatus(bank_contract_addr)
                              .then(myresult => {
                                                  console.log("Index="+myresult);
                                                  web3.eth.getAccountsPromise()
                                                  .then(accounts => AdvBank.at(bank_contract_addr)
                                                  .then(instance => {
                                      for (var i = 0 ; i < myresult ; i++) {
                                            var x =0; 
                                            instance.getLocStatusByIndex(i).then (out => {  


                                              details = {
                                                  sale_agreement : out[0],
                                                  buyer_addr    : out[2],
                                                  seller_addr : out[1],
                                                  issbank_addr       : out[3],
                                                  purchase_addr       : out[4],
                                                  loc_status      : out[5],
                                                  loc_hash          : out[6]
                                                  };
                              if (!details.loc_status) {
                                                    details.loc_status="Not issued";
                                                  }
                                                  else {
                                                    details.loc_status="Issued";
                                                  }

                                            DataArr.push(details);
                                                  x++;
                                        
                                                  if ( i == x) {
                                                      console.log("###");
                                                      console.log(DataArr);
                                                      res.write(JSON.stringify(DataArr));
                                                      res.send();
                                                  }
                                                })}}));
                                                });
                                                }) //end 2
                    ).catch(console.error);
                              bank_contract_addr = result;
                              console.log("End purchase");
                            })));
      console.log("End Request for LOC");
});

/*******************************************************************
      Method name : Banker issuing Letter of Credit
********************************************************************/
var __dirname = "/home/blockchain/tmp/";
app.post('/issueLOC',jsonparser,function(req,res) {

    console.log("Start Issue LOC");

    var sale_agreement    = req.body.sale_agreement_hash;
    var buyer_addr        = req.body.buyer_addr;
    var seller_addr       = req.body.seller_addr;
    var adv_bank_addr     = req.body.adv_bank_addr;
    var iss_bank_addr     = req.body.iss_bank_addr;
    var purchase_addr     = req.body.purchase_addr;
    console.log("sale_agreement:"+sale_agreement);
    console.log("seller_addr:"+seller_addr);
    console.log("buyer_addr"+buyer_addr);
    console.log("adv_bank_addr"+adv_bank_addr);
    console.log("purchase_addr"+purchase_addr);
    var filename         = req.body.uploadfile;
    var filehash;

    ipfs.util.addFromFs(path.join(__dirname,filename),(err, result)=>{
    if (err) {
      console.log("Upload file error to IPFS:" + err);
      res.status(500).send({error: err}); 
    }
    filehash = result[0].hash;

    console.log("successfully uploaded the file to IPFS"); 
    console.log("Hash value of the file = " + filehash ); 

    console.log("dirname:"+__dirname);
    console.log("filename:"+filename);

    web3.eth.getAccountsPromise()
                              .then(accounts => Gov.deployed()
                              .then(instance => instance
                              .getAdvBankContractAddr.call(adv_bank_addr)
                              .then(result1 => { 
                                                 adv_bank_contract_addr = result1;
                                                 console.log(adv_bank_contract_addr);

                                                 web3.eth.getAccountsPromise()
                                                 .then(accounts => Gov.deployed()
                                                 .then(instance => instance
                                                 .getIssBankContractAddr.call(iss_bank_addr)
                                                 .then(result2 => {

                                                     iss_bank_contract_addr = result2;
                                                     console.log(iss_bank_contract_addr);

                                                     web3.eth.getAccountsPromise()
                                                    .then(accounts => LOCExec.deployed() //1
                                                    .then(instance =>                              
                                                                          {instance.issueLOC.sendTransaction(sale_agreement,
                                                                                                                   filehash,
                                                                                                                   buyer_addr,
                                                                                                                   seller_addr,
                                                                                                                   iss_bank_contract_addr,
                                                                                                                   adv_bank_contract_addr,
                                                                                                                   purchase_addr,
                                                                                                                   {from: adv_bank_addr,gas:97000000}) //3 and end 3 //3 and end 3
                                                                          .then(txHash => {console.log(txHash);res.end();}); // 4 and end 4
                                                                        
                                                                           console.log(sale_agreement);    
                                                                           console.log(filehash);                                                                          
                                                                           console.log(buyer_addr);                                                                          
                                                                           console.log(seller_addr);                                                                          
                                                                           console.log(iss_bank_contract_addr);                                                                          
                                                                           console.log(adv_bank_contract_addr);                                                                          
                                                                      
                                                                     }));//end 2

                                                  })));

                                              })));
    });
    console.log("End Issue LOC");
});


app.post('/getIssueLOC',jsonparser,function(req,res) {

    console.log("Start Request for Issued LOC");
    var bank_addr        = req.body.bank_addr;
    var DataArr = new Array();
    var details;

    console.log("Get my Issued LOC status");
    res.setHeader('Content-type','application/json');
    console.log("bank_addr:"+bank_addr);

    web3.eth.getAccountsPromise()
                              .then(accounts => Gov.deployed()
                              .then(instance => instance
                              .getIssBankContractAddr.call(bank_addr)
                              .then(result => { 
                               web3.eth.getAccountsPromise()
                              .then(accounts => LOCExec.deployed() //1
                              .then(instance => {                               
                                                  console.log("adv_bank_contract_addr="+bank_contract_addr) ;
                                                  instance.getAllIssuedLOCReq(bank_contract_addr)
                              .then(myresult => {
                                                  console.log("Index="+myresult);
                                                  web3.eth.getAccountsPromise()
                                                  .then(accounts => IssBank.at(bank_contract_addr)
                                                  .then(instance => {
                                      for (var i = 0 ; i < myresult ; i++) {
                                            var x =0; 
                                            instance.getIssuedLocStatusByIndex(i).then (out => {   
                                              details = {
                                                  saleDeedhash : out[0],
                                                  LOChash    : out[1],
                                                  seller_addr     : out[2],
                                                  buyer_addr      : out[3],
                                                  bank_addr     : out[4],
                                                  purchase_addr       : out[5]
                                                  };

                                            DataArr.push(details);
                                                  x++;
                                        
                                                  if ( i == x) {
                                                      console.log(DataArr);
                                                      res.write(JSON.stringify(DataArr));
                                                      res.send();
                                                  }
                                                })}}));
                                                });
                                                }) //end 2
                    ).catch(console.error);
                              bank_contract_addr = result;
                            })));
      console.log("End Request for Issued LOC");
});

/***********************************************************
      Method name : shareLOCWithSeller
************************************************************/
app.post('/shareLOCWithSeller',jsonparser,function(req,res) {

      var seller_addr      = req.body.seller_addr;
      var purchase_addr      = req.body.purchase_addr;
      var LOCHash          = req.body.loc_hash;

      console.log("Start shareLOCWithSeller");
      console.log("seller_addr:"+seller_addr);
      console.log("purchase_addr:"+purchase_addr);
      console.log("LOCHash:"+loc_hash);

      var seller_contract_addr;
      console.log("Get Seller Contract Address");

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                           

          Sell.at(contract_addr).then(inst => inst.shareLOC.sendTransaction(seller_addr,
                                                                            purchase_addr,
                                                                            loc_hash,
                                                                            {from: seller_addr,gas:97000000})
                              .then(txHash => {res.end();}))
                                                  }) //end 2
                    ))
    });

/***********************************************************
      Method name : Get shareLOCWithSeller
************************************************************/
app.post('/shareLOCwithSender',jsonparser,function(req,res) {

      var seller_addr      = req.body.seller_addr;
      var purchase_addr      = req.body.purchase_addr;
      var loc_hash      = req.body.loc_hash;

      console.log("Start shareLOCwithSender");
      console.log("seller_addr:"+seller_addr);
      console.log("purchase_addr:"+purchase_addr);
      console.log("LOCHash:"+loc_hash);

      var seller_contract_addr;
      console.log("Get Seller Contract Address");

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                           

          Sell.at(contract_addr).then(inst => inst.shareLOC.sendTransaction(seller_addr,
                                                                            purchase_addr,
                                                                            loc_hash,
                                                                            {from: seller_addr,gas:97000000})
                              .then(txHash => {res.end();}))
                                                  }) //end 2
                    ))
    });


/***********************************************************
      Method name : Get shareLOCWithSeller
************************************************************/
/*
app.post('/shareLOCwithSender',jsonparser,function(req,res) {

      var seller_addr      = req.body.seller_addr;
      var purchase_addr      = req.body.purchase_addr;
      var loc_hash      = req.body.loc_hash;

      console.log("Start shareLOCwithSender");
      console.log("seller_addr:"+seller_addr);
      console.log("purchase_addr:"+purchase_addr);
      console.log("LOCHash:"+loc_hash);

      var seller_contract_addr;
      console.log("Get Seller Contract Address");

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance
                            .getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                           

          Sell.at(contract_addr).then(inst => inst.shareLOC.sendTransaction(seller_addr,
                                                                            purchase_addr,
                                                                            loc_hash,
                                                                            {from: seller_addr,gas:97000000})
                              .then(txHash => {res.end();}))
                                                  }) //end 2
                    ))
});
*/

/***********************************************************
      Method name : retriveLOCForSeller
************************************************************/
app.post('/retriveLOCForSeller',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
      console.log("Start retriveLOCForSeller");
      var seller_addr   = req.body.seller_addr;
      console.log("seller_addr:"+seller_addr);

      var DataArr = new Array();
      var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();

                Sell.at(contract_addr).then(inst => inst.getLOC.call(0).then(result=> {
                          details = {
                                        purchase_addr: result[2],
                                        loc_hash: result[0],
                                     
                                     };
                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                            }));
                                                    }
                              )));
});  
          
/***********************************************************
      Method name : retriveLOCForSeller
************************************************************/
app.post('/retriveLOCForSeller',jsonparser,function(req,res) {

    res.setHeader('Content-type','application/json');
      console.log("Start retriveLOCForSeller");
      var seller_addr   = req.body.seller_addr;
      console.log("seller_addr:"+seller_addr);

   var DataArr = new Array();
   var details;

    web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();
                Sell.at(contract_addr).then(inst => inst.getLOC.call(0).then(result=> {
                          details = {
                                        purchase_addr: result[1],
                                        loc_hash: result[0],
                                     
                                     };
                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                            }));
                                                    }
                              )));
});  

/***********************************************************
      Method name : retriveLOCForSeller
************************************************************/
app.post('/reqShipment',jsonparser,function(req,res) {

      res.setHeader('Content-type','application/json');
      console.log("Start retriveLOCForSeller");
      var seller_addr    = req.body.seller_addr;
      var carrier_addr   = req.body.carrier_addr;
      var bank_addr      = req.body.bank_addr;
      var loc_hash       = req.body.loc_hash;

      console.log("seller_addr:"+seller_addr);
      console.log("carrier_addr:"+carrier_addr);
      console.log("loc_hash:"+loc_hash);
      console.log("bank_addr:"+bank_addr);

      var DataArr = new Array();
      var details;

      web3.eth.getAccountsPromise()
                            .then(accounts => ShipExec.deployed()
                            .then(instance => instance
                            .getCarrierContractAddr.call(carrier_addr)
                            .then(contract_addr => { 
      Car.at(contract_addr).then(inst => inst.shipReq.sendTransaction(loc_hash,
                                                                      seller_addr,
                                                                      bank_addr,
                                                                      {from: seller_addr,gas:97000000})
                              .then(txHash => {res.end();}))
                                                  })
                    ));
  });

/***********************************************************
      Method name : retriveLOCForSeller
************************************************************/
app.post('/retriveShippingDetails',jsonparser,function(req,res) {

      res.setHeader('Content-type','application/json');
      console.log("Start retriveShippingDetails");
      var carrier_addr   = req.body.carrier_addr;

      var DataArr = new Array();
      var details;

      web3.eth.getAccountsPromise()
                            .then(accounts => ShipExec.deployed()
                            .then(instance => instance.getCarrierContractAddr.call(carrier_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();
                Car.at(contract_addr).then(inst => inst.getShipStatusByIndex.call(0).then(result=> {
                          details = {
                                        loc_hash: result[0],
                                        seller_addr: result[1],
                                        bank_addr: result[2],
                                        status: result[3],
                                        bill: result[4],
                                     };

                                              if (!details.status) {
                                                    details.status="Not Shipped";
                                                  }
                                                  else {
                                                    details.status="Shippment Completed";
                                                  }

                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                                }));
                                                   }
                              )));
});  

/*******************************************************************
      Method name : approve purchase order
********************************************************************/
var __dirname = "/home/blockchain/tmp/";
app.post('/approveShipping',jsonparser,function(req,res) {

    console.log("Start approve shipping");
    var loc_hash          = req.body.loc_hash;
    var carrier_addr      = req.body.carrier_addr;

    var filename      = req.body.uploadfile;
    var filehash;

    /* Approve request process */
    console.log("filename"+filename);

    ipfs.util.addFromFs(path.join(__dirname,filename),(err, result)=>{

          if (err) {
            console.log("Upload file error to IPFS:" + err);
            res.status(500).send({error: err}); 
          }
      
          console.log("successfully uploaded the file to IPFS"); 
          fileHash = result[0].hash;
          console.log("loc_hash:"+loc_hash);
          console.log("Hash value of the file = " + fileHash ); 
          console.log("carrier_addr = " + carrier_addr ); 

          web3.eth.getAccountsPromise()
                            .then(accounts => ShipExec.deployed()
                            .then(instance => { instance.getCarrierContractAddr.call(carrier_addr)
                            .then(contract_addr => { Car.at(contract_addr)
                            .then(inst => { inst.approve.sendTransaction(loc_hash,
                                                                       fileHash,
                                                                       {from: carrier_addr,gas:97000000})
                            .then(txHash => {console.log(txHash);res.end();})})
                                    console.log(contract_addr);})
                                }))
    });
});  


/***********************************************************
      Method name : Get shareLOCWithSeller
************************************************************/
app.post('/shareBillWithSellerandBank',jsonparser,function(req,res) {

      var seller_addr       = req.body.seller_addr;
      var issbank_addr      = req.body.bank_addr;
      var loc_hash          = req.body.loc_hash;
      var carrier_addr      = req.body.carrier_addr;
      var bill_hash              = req.body.bill_hash;;
      console.log("Start - Share Bill of Lading information with Issuing Bank and Seller");
      console.log("Seller Address:"+seller_addr);
      console.log("Issuing Bank Address:"+issbank_addr);
      console.log("LOC Hash:"+loc_hash);

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => { instance.getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                                                      console.log("Seller Contract address : "+contract_addr);
                            
                            if (contract_addr!='0x0000000000000000000000000000000000000000') {
                                console.log("hello"+contract_addr);
                                  Sell.at(contract_addr).then(inst => inst.shareBOL.sendTransaction(loc_hash,
                                                                       bill_hash,
                                                                       {from: carrier_addr,gas:97000000}).then(txHash => {
                                                                                                                            console.log("Seller Txn Hash:"+txHash);
                                                                                                                          })
                                      )
                                } // End If
       
      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getIssBankContractAddr.call(issbank_addr)
                            .then(contract_addr => { 
                                                      console.log("Bank Contract address : "+contract_addr);
                            
                            if (contract_addr!='0x0000000000000000000000000000000000000000') {

                                  IssBank.at(contract_addr).then(inst => inst.shareBOL.sendTransaction(loc_hash,
                                                                       bill_hash,
                                                                       {from: carrier_addr,gas:97000000}).then(txHash => {
                                                                                                                            console.log("Issuing Bank Txn Hash:"+txHash);
                                                                                                                            res.end();
                                                                                                                          })
                                      )
                                } // End If
                              }))); // End of Issuing Bank send
                              
                              })

      console.log("End - Share Bill of Lading information with Issuing Bank and Seller");

                              })); // End of Seller send

    });

/***********************************************************
      Method name : retriveSellerBOLetails
************************************************************/
app.post('/retriveSellerBOLetails',jsonparser,function(req,res) {

      res.setHeader('Content-type','application/json');
      console.log("Start retriveShippingDetails");
      var seller_addr   = req.body.seller_addr;

      var DataArr = new Array();
      var details;

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getSellerContractAddr.call(seller_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();
                Sell.at(contract_addr).then(inst => inst.getBOL.call(0).then(result=> {
                          details = {
                                        loc_hash: result[0],
                                        bill: result[1],
                                     };

                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                                }));
                                                   }
                              )));
});  


/***********************************************************
      Method name : retriveIssBOLetails
************************************************************/
app.post('/retriveIssBOLetails',jsonparser,function(req,res) {

      res.setHeader('Content-type','application/json');
      console.log("Start retriveShippingDetails");
      var bank_addr   = req.body.bank_addr;

      var DataArr = new Array();
      var details;

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getIssBankContractAddr.call(bank_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();
                IssBank.at(contract_addr).then(inst => inst.getBOL.call(0).then(result=> {
                          details = {
                                        loc_hash: result[0],
                                        bill: result[1],
                                     };

                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                                }));
                                                   }
                              )));
});  


/***********************************************************
      Method name : Get shareLOCWithSeller
************************************************************/
app.post('/shareBOLwithAdvisingBank',jsonparser,function(req,res) {

      console.log("Start - Share Bill of Lading information with Advising Bank");

      var advbank_addr      = req.body.advbank_addr;
      var issbank_addr      = req.body.issbank_addr;
      var loc_hash          = req.body.loc_hash;
      var bill_hash         = req.body.bol_hash;;
      
      console.log("Advising Bank Address:"+advbank_addr);
      console.log("Issuing Bank Address:"+issbank_addr);
      console.log("LOC Agreementr:"+loc_hash);
      console.log("BOL Agreement:"+bill_hash);

       
      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getAdvBankContractAddr.call(advbank_addr)
                            .then(contract_addr => { 
                                                      console.log("Advising Bank Contract address : "+contract_addr);
                            
                            if (contract_addr!='0x0000000000000000000000000000000000000000') {

                                  AdvBank.at(contract_addr).then(inst => inst.shareBOL.sendTransaction(loc_hash,
                                                                       bill_hash,
                                                                       {from: issbank_addr,gas:97000000}).then(txHash => {
                                                                                                                            console.log("Issuing Bank Txn Hash:"+txHash);
                                                                                                                            res.end();
                                                                                                                          })
                                      )
                                }
                              })));
      console.log("End - Share Bill of Lading information with Advising Bank");
});


/***********************************************************
      Method name : Get Advising Bank's Bill of Lading requessts
************************************************************/
app.post('/getAdvBOLrequests',jsonparser,function(req,res) {

      res.setHeader('Content-type','application/json');
      console.log("Start Get Bill of Lading details for Advising Bank.");
      var bank_addr   = req.body.bank_addr;

      var DataArr = new Array();
      var details;

      web3.eth.getAccountsPromise()
                            .then(accounts => Gov.deployed()
                            .then(instance => instance.getAdvBankContractAddr.call(bank_addr)
                            .then(contract_addr => { 
                                                      console.log("***"+contract_addr);
                                                      if (contract_addr=='0x0000000000000000000000000000000000000000') 
                                                          res.send();
                AdvBank.at(contract_addr).then(inst => inst.getBOL.call(0).then(result=> {
                          details = {
                                        loc_hash: result[0],
                                        bill: result[1],
                                     };

                                        DataArr.push(details);
                                        console.log(DataArr);
                                        res.write(JSON.stringify(DataArr));
                                        res.send();
                                }));
                                                   }
                              )));
      console.log("Start Get Bill of Lading details for Advising Bank.");

});


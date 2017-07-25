// All links-related publications

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({

"registerAdvisingBank": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"registerIssuingBank": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"registerBuyer": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"registerSeller": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"registerCarrier": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"getAvailableAdvBanks": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.get );
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    params: params
   });
  return result.data;
},


"getAvailableIssBanks": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.get );
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    params: params
   });
  return result.data;
},

"getAllSellerDetails": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.get );
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    params: params
   });
  return result.data;
},

"getAvailableBuyers": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.get );
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    params: params
   });
  return result.data;
},


"getAvailableCarriers": function(url,params){ 

  var asyncFunc  = Meteor.wrapAsync( HTTP.get );
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    params: params
   });
  return result.data;
},

"purchase": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"getPurchaseDetail": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"getAllPurchases": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"approve": function(url,params,fileData) { 

  var fs = Npm.require("fs");
  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  console.log(input);
  console.log(fileData);
  fs.writeFile('/home/blockchain/tmp/test.txt', new Buffer(fileData), function (err) {
                console.log("file saved");
  });
   var result = asyncFunc( url,
   {
     headers: {
        'Content-Type': 'application/json'
       },
     content: input
    });
   console.log(result.data);
   return result.data;
},

"requestLOC": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"getAllLocReq": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"getMyLocStatus": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"issueLOC": function(url,params,fileData) { 

  var fs = Npm.require("fs");
  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  fs.writeFile('/home/blockchain/tmp/test2.txt', new Buffer(fileData), function (err) {
                console.log("file saved")
              });
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"getIssueLOC": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"shareLOCwithSender": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"shareBOLwithAdvisingBank": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},


"retriveLOCForSeller": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"reqShipment": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"approveShipping": function(url,params,fileData) { 

  var fs = Npm.require("fs");
  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  fs.writeFile('/home/blockchain/tmp/test3.txt', new Buffer(fileData), function (err) {
                console.log("file saved")
  });
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"retriveShippingDetails": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"shareBillWithSellerandBank": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"shareBOLwithBank": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result;
},

"getBOLrequests": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"getAdvBOLrequests": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},


"retriveSellerBOLetails": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
},

"retriveIssBOLetails": function(url,params) { 

  var asyncFunc  = Meteor.wrapAsync( HTTP.post )
  var input = JSON.stringify(params);
  var result = asyncFunc( url,
  {
    headers: {
        'Content-Type': 'application/json'
      },
    content: input
   });
  return result.data;
}


});
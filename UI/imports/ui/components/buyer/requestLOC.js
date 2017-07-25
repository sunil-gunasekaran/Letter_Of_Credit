import './requestLOC.html'
import { Meteor } from 'meteor/meteor';

Template['components_req_LOC'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_req_LOC'].events({

    "click #btnReqLocContract": function(event, template){ 

    TemplateVar.set(template,'state', {isMining: true});
    
    var sellerAddress    = template.find("#seller_addr").value;
    var buyeraddress     = template.find("#buyer_addr").value;
    var bankaddress      = template.find("#bank_addr").value;
    var issbankaddress      = template.find("#issbank_addr").value;
    var filehash         = template.find("#sale_agreement_hash").value;
    var purchaseaddress      = template.find("#purchase_addr").value;

    var data = {seller_addr:sellerAddress,buyer_addr:buyeraddress,filehash:filehash,bank_addr:bankaddress,purchase_addr:purchaseaddress,issbank_addr:issbankaddress}

    Meteor.call('requestLOC','http://localhost:8888/requestLOC',data,function(error, result){
    if (result)
    {
        console.log(result);
        return TemplateVar.set(template,'state',{isMined: true});
    }
});

}});


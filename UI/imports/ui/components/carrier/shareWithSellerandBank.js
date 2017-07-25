import './shareWithSellerandBank.html'
import { Meteor } from 'meteor/meteor';

Template['components_share_LOC_BL_with_issBank_seller'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_share_LOC_BL_with_issBank_seller'].events({

	"click #btnPurchaseContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var sellerAddress    = template.find("#seller_addr").value;
	var locHash         = template.find("#loc_hash").value;
	var billhash    = template.find("#bill_hash").value;
	var issbankaddr    = template.find("#bank_addr").value;
	var carrieraddr    = template.find("#carrier_addr").value;

	var data = {seller_addr:sellerAddress,loc_hash:locHash,bill_hash:billhash,bank_addr:issbankaddr,carrier_addr:carrieraddr}

	Meteor.call('shareBillWithSellerandBank','http://localhost:8888/shareBillWithSellerandBank',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


import './shareLOCwithSender.html'
import { Meteor } from 'meteor/meteor';

Template['components_share_LOC_with_sender'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_share_LOC_with_sender'].events({

	"click #btnPurchaseContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var sellerAddress    = template.find("#seller_addr").value;
	var locHash         = template.find("#loc_hash").value;
	var purchaseAddress    = template.find("#purchase_addr").value;

	var data = {seller_addr:sellerAddress,loc_hash:locHash,purchase_addr:purchaseAddress}

	Meteor.call('shareLOCwithSender','http://localhost:8888/shareLOCwithSender',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


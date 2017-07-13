import './purchase.html'
import { Meteor } from 'meteor/meteor';

Template['components_purchase'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_purchase'].events({

	"click #btnPurchaseContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var sellerAddress    = template.find("#seller_addr").value;
	var buyeraddress     = template.find("#buyer_addr").value;
	var buyername        = template.find("#buyer_name").value;
	var product         = template.find("#products").value;
	var qntity         = template.find("#quantity").value;

	var data = {buyer_name:buyername,buyer_addr:buyeraddress,seller_addr:sellerAddress,products:product,quantity:qntity}

	Meteor.call('purchase','http://localhost:8888/purchase',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


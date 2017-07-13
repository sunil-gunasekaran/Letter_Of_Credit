import './shippingRequest.html'
import { Meteor } from 'meteor/meteor';

Template['components_shipping_req'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_shipping_req'].events({

	"click #btnApproveContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var carriername = template.find("#carrier_addr").value;
	var LOChash    = template.find("#loc_hash").value;
	var selleraddr    = template.find("#seller_addr").value;
	var bankaddress    = template.find("#bank_addr").value;

	var data = {carrier_addr:carriername,loc_hash:LOChash,seller_addr:selleraddr,bank_addr:bankaddress}

	Meteor.call('reqShipment','http://localhost:8888/reqShipment',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


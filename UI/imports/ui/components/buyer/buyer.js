import './buyer.html'
import { Meteor } from 'meteor/meteor';

Template['components_buyer'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_buyer'].events({

	"click #btnBuyerContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var buyername    = template.find("#buyer_name").value;
	var buyeraddress = template.find("#buyer_addr").value;
	var bankaddress  = template.find("#bank_addr").value;

	var data = {buyer_name:buyername,buyer_addr:buyeraddress,bank_addr:bankaddress}

	Meteor.call('registerBuyer','http://localhost:8888/registerBuyer',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


import './seller.html'
import { Meteor } from 'meteor/meteor';

Template['components_seller'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_seller'].events({

	"click #btnSellerContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var sellername = template.find("#seller_name").value;
	var product = template.find("#seller_product").value;
	var selleraddress = template.find("#seller_addr").value;
	var bankaddress = template.find("#bank_addr").value;
	var costprice = template.find("#cost").value;

	var data = {seller_name:sellername,seller_product:product,seller_addr:selleraddress,bank_addr:bankaddress,cost:costprice}

	Meteor.call('registerSeller','http://localhost:8888/registerSeller',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


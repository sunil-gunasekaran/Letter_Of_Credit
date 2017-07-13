import './getpurchasedetail.html'
import { Meteor } from 'meteor/meteor';
	
var purchases = new ReactiveArray(); 

Template["components_purchase_detail"].onCreated(function(){
    TemplateVar.set('state', {isInactive: true});
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");
});

Template["components_purchase_detail"].events({

	"click #btnViewDetails": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: false});
	
	var sellerAddress    = template.find("#seller_addr").value;
	var buyeraddress     = template.find("#buyer_addr").value;

	var data = {buyer_addr:buyeraddress,seller_addr:sellerAddress}

	//var data = {address:Session.get('Issuer')};
	purchases.clear();

	Meteor.call('getPurchaseDetail','http://localhost:8888/getPurchaseDetail',data,function(error, result){

	console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			purchases.push(result[i]);
		}
	}
})
}
});

Template['components_purchase_detail'].helpers({

	"getPurchaseList": function()
	{
		return purchases.list();
	}
});




import './getShippingRequests.html'
import { Meteor } from 'meteor/meteor';
	
var locs = new ReactiveArray(); 

Template["components_get_shipping_req"].onCreated(function(){
    TemplateVar.set('state', {isInactive: true});
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");
});

Template["components_get_shipping_req"].events({

	"click #btnViewDetails": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: false});

	var carrierAddress    = template.find("#carrier_addr").value;

	var data = {carrier_addr:carrierAddress}

	//var data = {address:Session.get('Issuer')};
	locs.clear();

	Meteor.call('retriveShippingDetails','http://localhost:8888/retriveShippingDetails',data,function(error, result){

	console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			locs.push(result[i]);
		}
	}
})
}
});

Template['components_get_shipping_req'].helpers({

	"getLocList": function()
	{
		return locs.list();
	}
});




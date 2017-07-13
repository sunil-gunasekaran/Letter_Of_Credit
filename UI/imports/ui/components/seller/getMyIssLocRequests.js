import './getMyIssLocRequests.html'
import { Meteor } from 'meteor/meteor';
	
var locs = new ReactiveArray(); 

Template["components_get_my_iss_LOC_req"].onCreated(function(){
    TemplateVar.set('state', {isInactive: true});
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");
});

Template["components_get_my_iss_LOC_req"].events({

	"click #btnViewDetails": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: false});
	
	var sellerAddress    = template.find("#seller_addr").value;

	var data = {seller_addr:sellerAddress}

	//var data = {address:Session.get('Issuer')};
	locs.clear();

	Meteor.call('retriveLOCForSeller','http://localhost:8888/retriveLOCForSeller',data,function(error, result){

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

Template['components_get_my_iss_LOC_req'].helpers({

	"getLocList": function()
	{
		return locs.list();
	}
});




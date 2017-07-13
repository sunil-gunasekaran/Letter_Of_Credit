import './getLOCstatus.html'
import { Meteor } from 'meteor/meteor';
	
var locs = new ReactiveArray(); 

Template["components_get_my_LOC_req"].onCreated(function(){
    TemplateVar.set('state', {isInactive: true});
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");
});

Template["components_get_my_LOC_req"].events({

	"click #btnViewDetails": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: false});
	
	var fileHash    = template.find("#filehash").value;

	var bankAddress    = template.find("#bank_addr").value;

	var data = {bank_addr:bankAddress,filehash:fileHash}

	//var data = {address:Session.get('Issuer')};
	locs.clear();

	Meteor.call('getMyLocStatus','http://localhost:8888/getMyLocStatus',data,function(error, result){

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

Template['components_get_my_LOC_req'].helpers({

	"getLocList": function()
	{
		return locs.list();
	}
});




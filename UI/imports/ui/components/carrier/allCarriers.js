import './allCarriers.html'
import { Meteor } from 'meteor/meteor';
	
var carriers = new ReactiveArray(); 

Template["components_all_carriers"].onCreated(function(){
	var template = this;
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");

});

Template["components_all_carriers"].onRendered(function(){

	//var data = {address:Session.get('Issuer')};
	carriers.clear();
	Meteor.call('getAvailableCarriers','http://localhost:8888/getAvailableCarriers',function(error, result){

		console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			carriers.push(result[i]);
		}
	}
})
});

Template['components_all_carriers'].helpers({

	"getCarriersList": function()
	{
		return carriers.list();
	}
});




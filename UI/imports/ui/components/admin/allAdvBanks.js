import './allAdvBanks.html'
import { Meteor } from 'meteor/meteor';
	
var advBanks = new ReactiveArray(); 

Template["components_all_adv_banks"].onCreated(function(){
	var template = this;
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");

});

Template["components_all_adv_banks"].onRendered(function(){

	//var data = {address:Session.get('Issuer')};
	advBanks.clear();
	console.log("From UI - Start getAvailableAdvBanks");
	Meteor.call('getAvailableAdvBanks','http://localhost:8888/getAvailableAdvBanks',function(error, result){

		console.log(result);
	if (typeof result != 'undefined') 
	{
		for(var i=0;i<result.length;i++)
		{
			advBanks.push(result[i]);
		}
	}

	})
	console.log("From UI - End getAvailableAdvBanks");
});

Template['components_all_adv_banks'].helpers({

	"getadvBanksList": function()
	{
		return advBanks.list();
	}
});




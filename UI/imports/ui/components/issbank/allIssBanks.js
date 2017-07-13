import './allIssBanks.html'
import { Meteor } from 'meteor/meteor';
	
var iss_banks = new ReactiveArray(); 

Template["components_all_iss_banks"].onCreated(function(){
	var template = this;
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");

});

Template["components_all_iss_banks"].onRendered(function(){

	//var data = {address:Session.get('Issuer')};
	iss_banks.clear();
	Meteor.call('getAvailableIssBanks','http://localhost:8888/getAvailableIssBanks',function(error, result){

		console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			iss_banks.push(result[i]);
		}
	}
})
});

Template['components_all_iss_banks'].helpers({

	"getIssBanksList": function()
	{
		return iss_banks.list();
	}
});




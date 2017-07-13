import './allBuyers.html'
import { Meteor } from 'meteor/meteor';
	
var buyers = new ReactiveArray(); 

Template["components_all_buyers"].onCreated(function(){
	var template = this;
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");

});

Template["components_all_buyers"].onRendered(function(){

	//var data = {address:Session.get('Issuer')};
	buyers.clear();
	Meteor.call('getAvailableBuyers','http://localhost:8888/getAvailableBuyers',function(error, result){

		console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			buyers.push(result[i]);
		}
	}
})
});

Template['components_all_buyers'].helpers({

	"getBuyersList": function()
	{
		return buyers.list();
	}
});




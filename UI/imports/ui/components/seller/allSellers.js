import './allSellers.html'
import { Meteor } from 'meteor/meteor';
	
var sellers = new ReactiveArray(); 

Template["components_all_sellers"].onCreated(function(){
	var template = this;
	//TemplateVar.set(template,'showBuyers',{show:false});
	//Session.set("Issuer","0x7e6f0f885d0c7060bf4e78ec4d02aec49affeac8");

});

Template["components_all_sellers"].onRendered(function(){

	//var data = {address:Session.get('Issuer')};
	sellers.clear();
	Meteor.call('getAllSellerDetails','http://localhost:8888/getAllSellerDetails',function(error, result){

		console.log(result);
	if (result) 
	{
		for(var i=0;i<result.length;i++)
		{
			sellers.push(result[i]);
		}
	}
})
});

Template['components_all_sellers'].helpers({

	"getSellersList": function()
	{
		return sellers.list();
	}
});




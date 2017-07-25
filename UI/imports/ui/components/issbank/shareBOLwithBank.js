import './shareBOLwithBank.html'
import { Meteor } from 'meteor/meteor';

Template['components_share_BOL_with_bank'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_share_BOL_with_bank'].events({

	"click #btnPurchaseContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var advbankAddress    	 = template.find("#advbank_addr").value;
	var issbankAddress    	 = template.find("#issbank_addr").value;
	var locHash    		 	 = template.find("#loc_hash").value;
	var bolHash    	      	 = template.find("#bol_hash").value;

	var data = {advbank_addr:advbankAddress,issbank_addr:issbankAddress,loc_hash:locHash,bol_hash:bolHash}

	Meteor.call('shareBOLwithAdvisingBank','http://localhost:8888/shareBOLwithAdvisingBank',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


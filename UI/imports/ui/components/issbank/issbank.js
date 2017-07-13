import './issbank.html'
import { Meteor } from 'meteor/meteor';

Template['components_issuing_bank'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_issuing_bank'].events({

	"click #btnIssBankContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var bankname    = template.find("#bank_name").value;
	var bankaddress = template.find("#bank_addr").value;

	var data = {bank_name:bankname,bank_addr:bankaddress}

	Meteor.call('registerIssuingBank','http://localhost:8888/registerIssuingBank',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


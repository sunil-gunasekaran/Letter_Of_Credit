import './admin.html'
import { Meteor } from 'meteor/meteor';

Template['components_admin'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_admin'].events({

	"click #btnAdvBankContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var bankname = template.find("#bank_name").value;
	var bankaddress = template.find("#bank_addr").value;

	var data = {bank_name:bankname,bank_addr:bankaddress}

	Meteor.call('registerAdvisingBank','http://localhost:8888/registerAdvisingBank',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


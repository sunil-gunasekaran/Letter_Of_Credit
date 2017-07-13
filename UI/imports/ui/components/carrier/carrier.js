import './carrier.html'
import { Meteor } from 'meteor/meteor';

Template['components_carrier'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_carrier'].events({

	"click #btnCarrierContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var carriername = template.find("#carrier_name").value;
	var carrieraddress = template.find("#carrier_addr").value;
    var bankaddress = template.find("#bank_addr").value;


	var data = {carrier_name:carriername,carrier_addr:carrieraddress,bank_addr:bankaddress}

	Meteor.call('registerCarrier','http://localhost:8888/registerCarrier',data,function(error, result){
	if (result)
	{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	}
});

}});


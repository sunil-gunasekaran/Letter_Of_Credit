import './issueLOC.html'
import { Meteor } from 'meteor/meteor';

Template['components_approve_loc'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});

Template['components_approve_loc'].events({

	"click #btnApproveContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var selleraddr = template.find("#seller_addr").value;
	var buyeraddr  = template.find("#buyer_addr").value;
	var salehash  = template.find("#sale_agreement_hash").value;
	var adv_bankAddress  = template.find("#adv_bank_addr").value;
	var iss_bankAddress  = template.find("#iss_bank_addr").value;
	var purchase_address  = template.find("#purchase_addr").value;
	
	var filename   = template.find("#uploadfile").files[0].name;;

	var reader = new FileReader();
	reader.onload = function(event){          
    var filedata = new Uint8Array(reader.result);

	var data = {purchase_addr:purchase_address,seller_addr:selleraddr,buyer_addr:buyeraddr,sale_agreement_hash:salehash,adv_bank_addr:adv_bankAddress,iss_bank_addr:iss_bankAddress,uploadfile:filename}

	Meteor.call('issueLOC','http://localhost:8888/issueLOC',data,filedata,function(error, result){
	//if (result)
	//{
		console.log(result);
		return TemplateVar.set(template,'state',{isMined: true});
	//}
		});
	}
		reader.readAsArrayBuffer(template.find("#uploadfile").files[0]);

}

});

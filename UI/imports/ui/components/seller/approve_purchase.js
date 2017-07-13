import './approve_purchase.html'
import { Meteor } from 'meteor/meteor';

Template['components_approve_purchase'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_approve_purchase'].events({

	"click #btnApproveContract": function(event, template){ 

	TemplateVar.set(template,'state', {isMining: true});
	
	var sellername = template.find("#seller_addr").value;
	var buyeraddr  = template.find("#buyer_addr").value;
	var purchaseaddr  = template.find("#purchase_addr").value;
	var filename   = template.find("#uploadfile").files[0].name;

	var reader = new FileReader();
	reader.onload = function(event){          
    var filedata = new Uint8Array(reader.result);
    var data = {seller_addr:sellername,buyer_addr:buyeraddr,purchase_addr:purchaseaddr,uploadfile:filename}
   	 
   	console.log(filename);
    Meteor.call('approve','http://localhost:8888/approve',data,filedata,function(error, result){
		// if (result)
		// {
			
			return TemplateVar.set(template,'state',{isMined: true});
		// }

		});
}
		reader.readAsArrayBuffer(template.find("#uploadfile").files[0]);

}

});

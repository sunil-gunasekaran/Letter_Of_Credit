import './approve_shipping.html'
import { Meteor } from 'meteor/meteor';

Template['components_approve_shipping'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_approve_shipping'].events({

	"click #btnApproveContract": function(event, template){ 
	TemplateVar.set(template,'state', {isMining: true});
	
	var LOCHash = template.find("#loc_hash").value;
	var filename   = template.find("#uploadfile").files[0].name;

	var reader = new FileReader();
	reader.onload = function(event){          
    var filedata = new Uint8Array(reader.result);
    var data = {loc_hash:LOCHash,uploadfile:filename}
   	 
   	console.log(filename);
    Meteor.call('approveShipping','http://localhost:8888/approveShipping',data,filedata,function(error, result){
		 if (result)
		 {
			
			return TemplateVar.set(template,'state',{isMined: true});
		 }

		});
	}
		reader.readAsArrayBuffer(template.find("#uploadfile").files[0]);


}

});

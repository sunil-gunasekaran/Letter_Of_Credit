/**
Template Controllers

@module Templates
*/

/**
The view1 template

@class [template] views_view1
@constructor
*/
import './view2.html';
import '../../components/issbank/issbank.js';
import '../../components/issbank/allIssBanks.js';
import '../../components/issbank/getIssLocRequests.js';
import '../../components/issbank/shareLOCwithSender.js';



//import '../../components/admin/admin_list.js';

Template['views_view2'].helpers({
    /**
    Get the name

    @method (name)
    */

  /*  'name': function(){
        return this.name || TAPi18n.__('dapp.view1.defaultName');
    }*/
});

// When the template is created
Template['views_view2'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});

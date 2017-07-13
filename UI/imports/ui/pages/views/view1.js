/**
Template Controllers

@module Templates
*/

/**
The view1 template

@class [template] views_view1
@constructor
*/
import './view1.html';
import '../../components/admin/admin.js';
import '../../components/admin/allAdvBanks.js';
import '../../components/admin/getAllLocRequests.js';
import '../../components/admin/issueLOC.js';


//import '../../components/admin/admin_list.js';

Template['views_view1'].helpers({
    /**
    Get the name

    @method (name)
    */

  /*  'name': function(){
        return this.name || TAPi18n.__('dapp.view1.defaultName');
    }*/
});

// When the template is created
Template['views_view1'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});

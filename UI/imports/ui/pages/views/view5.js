/**
Template Controllers

@module Templates
*/

/**
The view1 template

@class [template] views_view1
@constructor
*/
import './view5.html';
import '../../components/carrier/carrier.js';
import '../../components/carrier/allCarriers.js';
import '../../components/carrier/approve_shipping.js';
import '../../components/carrier/getShippingRequests.js';

//import '../../components/admin/admin_list.js';

Template['views_view5'].helpers({
    /**
    Get the name

    @method (name)
    */

  /*  'name': function(){
        return this.name || TAPi18n.__('dapp.view1.defaultName');
    }*/
});

// When the template is created
Template['views_view5'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});

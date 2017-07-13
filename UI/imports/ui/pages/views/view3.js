/**
Template Controllers

@module Templates
*/

/**
The view1 template

@class [template] views_view1
@constructor
*/
import './view3.html';
import '../../components/seller/seller.js';
import '../../components/seller/getAllPurchases.js';
import '../../components/seller/approve_purchase.js';
import '../../components/seller/getMyIssLocRequests.js';
import '../../components/seller/shippingRequest.js';

//import '../../components/admin/admin_list.js';

Template['views_view3'].helpers({
    /**
    Get the name

    @method (name)
    */

  /*  'name': function(){
        return this.name || TAPi18n.__('dapp.view1.defaultName');
    }*/
});

// When the template is created
Template['views_view3'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});

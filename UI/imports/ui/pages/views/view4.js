/**
Template Controllers

@module Templates
*/

/**
The view1 template

@class [template] views_view1
@constructor
*/
import './view4.html';
import '../../components/buyer/buyer.js';
import '../../components/seller/allSellers.js';
import '../../components/buyer/allBuyers.js';
import '../../components/buyer/purchase.js';
import '../../components/buyer/getpurchasedetail.js';
import '../../components/buyer/requestLOC.js';
import '../../components/buyer/getLOCstatus.js';


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
Template['views_view4'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});

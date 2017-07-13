import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/header/header.js';
import '../../ui/layouts/footer/footer.js';
import '../../ui/pages/views/view1.js';
import '../../ui/pages/views/view2.js';
import '../../ui/pages/views/view3.js';
import '../../ui/pages/views/view4.js';
import '../../ui/pages/views/view5.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
	BlazeLayout.render('App_body', { top:'header', main: 'views_view1', footer:'footer' });
  },
});

FlowRouter.route('/View1', {
  name: 'App.view1',
  action() {
    BlazeLayout.render('App_body', { top:'header', main: 'views_view1', footer:'footer' });
  },
});

FlowRouter.route('/View2', {
  name: 'App.view2',
  action() {
    BlazeLayout.render('App_body', { top:'header', main: 'views_view2', footer:'footer' });
  },
});

FlowRouter.route('/View3', {
  name: 'App.view3',
  action() {
    BlazeLayout.render('App_body', { top:'header', main: 'views_view3', footer:'footer' });
  },
});

FlowRouter.route('/View4', {
  name: 'App.view4',
  action() {
    BlazeLayout.render('App_body', { top:'header', main: 'views_view4', footer:'footer' });
  },
});

FlowRouter.route('/View5', {
  name: 'App.view5',
  action() {
    BlazeLayout.render('App_body', { top:'header', main: 'views_view5', footer:'footer' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout','utilityPlugin'],
  function(ko, Context, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, KnockoutTemplateUtils) {

     function ControllerViewModel() {

        this.KnockoutTemplateUtils = KnockoutTemplateUtils;

        // Handle announcements sent when pages change, for Accessibility.
        this.isConnected = ko.observable("false");
        this.manner = ko.observable('polite');
        this.message = ko.observable();

        announcementHandler = (event) => {
          this.message(event.detail.message);
          this.manner(event.detail.manner);
      };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      let navData = [
        { path: '', redirect: 'login' },
        { path: 'login', detail: { label: 'Login', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'dashboard', detail: { label: 'Dashboard', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'incidents', detail: { label: 'Incidents', iconClass: 'oj-ux-ico-fire' } },
        { path: 'customers', detail: { label: 'Customers', iconClass: 'oj-ux-ico-contact-group' } },
        { path: 'about', detail: { label: 'About', iconClass: 'oj-ux-ico-information-s' } }
      ];
      // Router setup
      this.router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      this.router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(this.router);

      this.selection = new KnockoutRouterAdapter(this.router);

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"});

      this.goToPage = function(page){
        this.router.go({path:page})
        .then(() =>{
          this.navigated = true;
        })
        .catch((error) => {
          console.log("Error occured "+error);
        })
      }

      this.signOut = function(event){
        this.isConnected(false);
        JET.Utils.deleteSession('username');
        this.goToPage('login');
        
      };

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("Wealth Manager");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("");

      // Footer
     
     }

     // release the application bootstrap busy state
     Context.getPageContext().getBusyContext().applicationBootstrapComplete();

     return new ControllerViewModel();
  }
);

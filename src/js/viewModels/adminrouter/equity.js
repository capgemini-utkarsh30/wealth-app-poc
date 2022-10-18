/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */

define([
  "../accUtils",
  "ojs/ojrestdataprovider",
  "ojs/ojtable",
  "ojs/ojknockoutrouteradapter",
  "ojs/ojmodulerouter-adapter",
  "ojs/ojarraydataprovider",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojknockout",
], function (
  accUtils,
  RESTDataProvider,
  KnockoutRouterAdapter,
  ModuleRouterAdapter,
  ArrayDataProvider,
  ko,
  ojbootstrap_1
) {
  class EquityViewModel {
    constructor(args) {
      this.dataprovider = new RESTDataProvider({
        keyAttributes: this.keyAttributes,
        url: "http://localhost:3000/equityData",

        transforms: {
          fetchFirst: {
            request: async (options) => {
              const url = new URL(options.url);
            //   const { size, offset } = options.fetchParameters;
            //   url.searchParams.set("limit", String(size));
            //   url.searchParams.set("offset", String(offset));
              return new Request(url.href);
            },
            response: async ({ body }) => {
                const { items } = body;

                console.log(items)
                // If the response body returns, for example, "items". 
                // We need to assign "items" to "data"
                return { data: items };
            },
          },
        },
      });
    }
  }

  return EquityViewModel;
});

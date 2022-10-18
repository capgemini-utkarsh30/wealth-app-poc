/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([
  "../accUtils",
  "knockout",
  "appController",
  "ojs/ojarraydataprovider",
  "ojs/ojasyncvalidator-regexp",
  "ojs/ojconverterutils-i18n",
  "ojs/ojbootstrap",
  "ojs/ojknockout",
  "ojs/ojactioncard",
  "ojs/ojlabel",
  "ojs/ojinputtext",
  "ojs/ojformlayout",
  "ojs/ojinputnumber",
  "ojs/ojdatetimepicker",
  "ojs/ojbutton",
  "ojs/ojselectsingle",
  "ojs/ojradioset",
  "ojs/ojcheckboxset",
  "ojs/ojselectcombobox",
  "ojs/ojcorerouter",
  "ojs/ojmodulerouter-adapter",
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojknockout",
  "ojs/ojcheckboxset",
  "ojs/ojvalidationgroup",
], function (
  accUtils,
  ko,
  app,
  ArrayDataProvider,
  AsyncRegExpValidator,
  require,
  exports,
  ojbootstrap_1
) {
  function LoginViewModel() {
    this.checkValue = ko.observableArray();
    this.isSignInButtonDisabled = ko.observable(true);
    this.groupValid = ko.observable("invalidHidden");
    this.dircolumn = ko.pureComputed(() => {
      return !!(
        typeof this.checkValue()[0] !== "undefined" &&
        this.checkValue()[0] != null &&
        this.checkValue()[0] === "dirColumn"
      );
    });

    this.username = ko.observable("");
    this.password = ko.observable();
    this.userData = ko.observableArray();

    this._checkValidationGroup = () => {
      var tracker = document.getElementById("tracker");
      if (tracker.valid === "valid") {
        return true;
      } else {
        // show messages on all the components
        // that have messages hidden.
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    };

    this.loginButton = async (event) => {
      let valid = this._checkValidationGroup();
      if (valid) {
        let res = await JET.Utils.getDataFromJSON(
          `http://localhost:3000/userData?username=${this.username()}&password=${this.password()}`
        ).then((result) => {
          this.userData(result);
        });
      } else {
        alert("Pleae Enter a valid username and password");
      }

      console.log(this.userData())
      for (let i = 0; i < this.userData().length; i++) {
        console.log(this.userData().userData[i].username, this.username());
        if (
          this.userData().userData[i].username == this.username() &&
          this.userData().userData[i].password == this.password()
        ) {
          app.goToPage("incidents");
          sessionStorage.setItem(
            "userData",
            JSON.stringify(this.userData().userData[i])
          );
        }
      }
      app.isConnected(true);
    };

    //jscode for forgot password
    this.newPassword = ko.observable("");
    this.confirmPassword = ko.observable("");

    //jscode for registration popup
    this.registerUserName = ko.observable("");
    this.registerPassword = ko.observable("");
    this.registerConfirmPassword = ko.observable("");
    this.registerEmail = ko.observable("");
    this.roleData = ko.observable("US");
    this.validators = [
      new AsyncRegExpValidator({
        pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
        label: "Password",
        hint: "Enter at least 6 characters including a number, one uppercase and lowercase letter.",
        messageSummary: "{label} too Weak",
        messageDetail:
          "Enter at least 6 characters including a number, one uppercase and lowercase letter.",
      }),
    ];
    this.emailPatternValidator = ko.observableArray([
      new AsyncRegExpValidator({
        pattern:
          "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        hint: "enter a valid email format",
        messageDetail: "Not a valid email format",
      }),
    ]);
    this.forgotButton = (event) => {
      try {
        let popup = document.getElementById("forgotPasswordDetail");
        popup.open("forgotButton");
      } catch (ex) {}
    };
    this.forgotPwdCancelListener = (event) => {
      let popup = document.getElementById("forgotPasswordDetail");
      popup.close();
    };

    this.registerButton = (event) => {
      let popup = document.getElementById("registration");
      popup.open("registerButton");
    };
    this.cancelListener = (event) => {
      let popup = document.getElementById("registration");
      popup.close();
    };
     this.submitButton = async (event) => {
      let userObj= {
        id: this.registerUserName(),
        username: this.registerUserName(),
        password: this.registerPassword()
      }
      console.log(userObj);

      let res = await JET.Utils.updateJSON(
        "http://localhost:3000/userData" , userObj
      ).then((result) => {
        // this.userData(result);
      });
      console.log("Submit Button clicked" , res);
    };
    this.changePwdButton = (event) => {
      console.log(this.userData())
    };
  }
  return LoginViewModel;
});

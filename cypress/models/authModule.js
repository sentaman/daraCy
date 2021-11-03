import data from "../fixtures/data.json"
import sidebarModule from "../models/sidebarModule"
import navigationBarModule from "../models/navigationBarModule"

module.exports = {
    get loginModal() {
        return cy.get(".vs-c-auth-modal__body");
    },

    get emailInput() {
        return cy.get("input[type='email']");
    },

    get passwordInput() {
        return cy.get("input[type='password']");
    },

    get loginSubmitBtn() {
        return cy.get("button[type='submit']");
    },

    get forgotPasswordLink() {
        return cy.get("a[href='/forgot-password']")
    },

    get backToHomeLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com']")
    },

    get loginWithGpBtn() {
        return cy.get("button.vs-c-btn--gp")
    },

    get loginWithFbBtn() {
        return cy.get("button.vs-c-btn--fb")
    },

    get loginWithTwBtn() {
        return cy.get("button.vs-c-btn--tw")
    },

    get loginWithRegzenBtn() {
        return cy.get("button.vs-c-btn--regzen")
    },

    get goToSignUpLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com/pricing']")
    },

    login({ email = data.user.email, password = data.user.password }) {
        if (email == "") {                                                  
          this.passwordInput.should("be.visible").clear().type(password);
          this.loginSubmitBtn.click();
        } else if (password == "") {
          this.emailInput.should("be.visible").clear().type(email);
          this.loginSubmitBtn.click();
        } else {
          cy.intercept("POST", "**/api/v2/login").as("login");
          this.emailInput.should("be.visible").clear().type(email);
          this.passwordInput.should("be.visible").clear().type(password);
          this.loginSubmitBtn.click();
          if (email == data.user.email && password == data.user.password) {
            cy.wait("@login").then((intercept) => {
              expect(intercept.response.statusCode).to.eq(200);
            });
          }
        }
      },

    logOut() {
        cy.intercept('POST', '**/api/v2/logout').as("logOut")
        sidebarModule.avatarIcon.should('be.visible').click()
        sidebarModule.profileLink.should('be.visible').click()
        navigationBarModule.logoutBtn.click()
        cy.wait("@logOut").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201)
        })
    }
}
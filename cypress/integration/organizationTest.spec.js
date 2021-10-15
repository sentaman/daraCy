/// <reference types="cypress" />

import sidebar from "../fixtures/sidebar.json"
import createOrganization from "../fixtures/organization.json"
import login from "../fixtures/login.json"
import data from "../fixtures/data.json"

describe('Create, edit and delete organization', () => {

    it('Visit vivify scrum site - login page', () => {
        cy.visit('/login');
    });
    
    it('Login a user', () => {
        cy.get(login.emailInput).clear().type(data.user.email)
        cy.get(login.passwordInput).clear().type(data.user.password)
        cy.get(login.loginSubmitBtn).click()
    });

    it('Open New organization modal', () => {
        cy.get(sidebar.mainSidebar.hitAddNew).click()
        cy.get(sidebar.mainSidebar.hitAddNewOrganization).click()
    });

    it('Add organization name and submit the form', () => {
        cy.get(createOrganization.createOrganizationFlow.organizationNameInput).type(data.user.organizationName)
        cy.get(createOrganization.createOrganizationFlow.createOrganizationBtn).click()
    });

    it('Upload organization image (optionally) and create organization', () => {
        cy.get(createOrganization.createOrganizationFlow.createOrganizationBtn).click()
    });

    it("Cloase info Board modal and hit the configuration link (settings page)", () => {
        cy.get(createOrganization.createOrganizationFlow.xBtnNewOrganizationModal).click()
        cy.get(sidebar.myOrganizationSidebar.configurationLink).click()
    });

    it("Update organization name", () => {
        cy.get(createOrganization.configuration.organizationNameInput).clear().type(data.user.newOrganizationName)
        cy.get(createOrganization.configuration.updateOrganizationNameButton).click()
    });

    it('Clear the organization name input field and submit the form', () => {
        cy.get(createOrganization.configuration.organizationNameInput).clear()
        cy.get(createOrganization.configuration.updateOrganizationNameButton).click()
    });

    it('Add more then 255 char in the organization name input field and submit the form', () => {
        cy.get(createOrganization.configuration.organizationNameInput).clear().type(data.user.maxCharOrganization)
        cy.get(createOrganization.configuration.updateOrganizationNameButton).click()
    })

    it('Add incorect password and submit the form in the Confirm Your Action modal', () => {
        cy.get(createOrganization.configuration.deleteOrganizationButton).click()
        cy.get(createOrganization.configuration.confirmYourActionModal.passwordInput).clear().type(data.user.invalidPassword)
        cy.get(createOrganization.configuration.confirmYourActionModal.yesButton).click()
        cy.get(createOrganization.configuration.confirmYourActionModal.xButton).click()
    });

    it("Delete created organization", () => {
        cy.get(createOrganization.configuration.deleteOrganizationButton).click()
        cy.get(createOrganization.configuration.confirmYourActionModal.passwordInput).type(data.user.password)
        cy.get(createOrganization.configuration.confirmYourActionModal.yesButton).click()
    });

});
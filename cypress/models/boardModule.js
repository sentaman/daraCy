import data from "../fixtures/data.json"
import sidebarModule from "../models/sidebarModule"

module.exports = {
    get boardModalTitle() {
        return cy.get(".vs-c-modal__header")
    },

    get boardTitleInput() {
        return cy.get("input[name='name']")
    },

    get newBoardOrganizationDropdown() {
        return cy.get(".el-input__inner")
    },

    get nextStep() {
        return cy.get("button[name='next_btn']")
    },

    get checkScrumBtn() {
        return cy.get("span[name='type_scrum']")
    },

    get checkKanbanBtn() {
        return cy.get("span[name='type_kanban']")
    },

    get boardDescriptionInput() {
        return cy.get("textarea[name='description']")
    },

    get updateButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap']")
    },

    get boardTitleErrorMessage() {
        return cy.get(":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get boardTitleMaxCharErrorMessage() {
        return cy.get(":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get deleteBoardButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']")
    },

    get yesButton() {
        return cy.get("button[name='save-btn']")
    },

    get boardModalOkButton() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn")
    },

    get boardConfigurationBtn() {
        return cy.get("[data-cy=board-configuration] > span > div > .vs-c-site-logo")
    },

    createBoard(modalTitle) {
        cy.createBoard(modalTitle)
    },

    deleteBoard() {
        cy.deleteBoard()
    },

    openNewBoardModal() {
        cy.openNewBoardModal()
    },

    nextStepBoard() {
        this.nextStep.click()
    }
}
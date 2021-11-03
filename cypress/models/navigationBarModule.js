module.exports = {
    get logoutBtn() {
        return cy.get("div[class='vs-c-logout']")
    },

    get hitSelectedOrganization() {
        return cy.get("div[class='vs-c-img--avatar vs-u-cursor--pointer']")
    },

    get siteLogo() {
        return cy.get("div[class='vs-c-site-logo vs-u-cursor--pointer']")
    },

    get hitCyBoard() {
        return cy.get("h1[title='CyBoard']")
    },

    get hitSearchBtn() {
        return cy.get("div[class='vs-c-project-search']")
    },

    get searchInput() {
        return cy.get("input[type='text']")
    },

    get showFinishedSprintsBtn() {
        return cy.get("button[name='show_finished_sprints']")
    },

    get showTableView() {
        return cy.get("div[class='vs-c-sprint-info']> button:nth-of-type(2)")
    },

    get hitMoreOptions() {
        return cy.get("div[class='el-dropdown']")
    },

    get hitShowFilter() {
        return cy.get("div[class='vs-c-dropdown-wrapper vs-c-filter']")
    },

    get hitShowNotification() {
        return cy.get("div[class='vs-c-dropdown-wrapper vs-c-notification']")
    },

    get hitHowItWorks() {
        return cy.get(".vs-l-project__options > .el-tooltip.vs-c-btn.vs-c-btn--link")
    }
}
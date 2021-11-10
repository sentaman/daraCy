module.exports = {
    get avatarIcon() {
        return cy.get("img[class='vs-u-img--round vs-c-user-avatar']")
    },

    get profileLink() {
        return cy.get("a[href='/account/settings']")
    },

    get hitAddNew() {
        return cy.get(".el-tooltip.vs-c-list-btn--new-workspace.vs-c-list__btn")
    },

    get hitAddBoard() {
        return cy.get("li:nth-of-type(2) > a > span")
    },

    get rhcpBoardLink() {
        return cy.get(".vs-c-list__btn > :nth-child(3)")
    },

    get settingsLink() {
        return cy.get("[data-cy=board-configuration] > span > div > .vs-c-site-logo")
    },

    get wholeSidebar() {
        return cy.get(".vb-content")
    }
}
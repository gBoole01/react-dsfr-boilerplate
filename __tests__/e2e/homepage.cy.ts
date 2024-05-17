describe('Homepage', () => {
    it('should display the Title', () => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
        cy.visit('http://localhost:5173');
        cy.contains('h1', 'Hello World!');
    });
});

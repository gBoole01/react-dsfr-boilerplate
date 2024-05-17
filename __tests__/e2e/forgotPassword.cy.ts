describe('Forgot Password', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
        cy.visit('http://localhost:5173/mot-de-passe-oublie');
    });

    it('should display the Title', () => {
        cy.contains('h1', "Récupération de mot de passe sur NomDeL'App");
    });

    it('should display the Form', () => {
        cy.get('[data-testid="forgot-password-form"]').should('exist');
        cy.get('[data-testid="email-input"]').should('exist');
        cy.get('[data-testid="submit-button"]').should('exist');
    });

    it('should display an error when email is invalid', () => {
        cy.get('[data-testid="email-input"] > input')
            .type('email-invalid')
            .blur();
        cy.get('[data-testid="email-input"] > input').should(
            'have.attr',
            'aria-invalid',
            'true'
        );
        cy.get('[data-testid="email-input"] > .fr-error-text').contains(
            'Adresse email invalide'
        );
    });

    it('should display an alert when a server error occurs', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/forgot-password', {
            statusCode: 500,
            body: {},
        }).as('forgotPasswordError');
        cy.get('[data-testid="email-input"] > input').type('user@test.com');
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@forgotPasswordError');
        cy.get('[data-testid="reset-password-error-alert"]').contains(
            'Une erreur est survenue. Veuillez réessayer ultérieurement.'
        );
    });

    it('should display a success message when the form is submitted', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/forgot-password', {
            statusCode: 200,
            body: {},
        }).as('forgotPasswordSuccess');
        cy.get('[data-testid="email-input"] > input').type('user@test.io');
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@forgotPasswordSuccess');
        cy.get('[data-testid="forgot-password-success-alert"]').contains(
            'Votre demande de récupération de mot de passe a été transmise. Vous recevrez un courriel dans quelques instants.'
        );
    });
});

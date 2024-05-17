describe('Register', () => {
    Cypress.on('uncaught:exception', () => {
        return false;
    });

    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
        cy.visit('http://localhost:5173/inscription');
    });

    it('should display the register form', () => {
        cy.get('[data-testid="register-form"]').should('exist');
        cy.get('[data-testid="email-input"]').should('exist');
        cy.get('[data-testid="password-input"]').should('exist');
        cy.get('[data-testid="confirm-password-input"]').should('exist');
        cy.get('[data-testid="birthdate-input"]').should('exist');
        cy.get('[data-testid="consent-checkbox"]').should('exist');
        cy.get('[data-testid="submit-button"]').should('exist');
    });

    it('should display an error message when email is invalid', () => {
        cy.get('[data-testid="email-input"] > input')
            .type('invalid-email')
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

    it('should display an error message when password have invalid length', () => {
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('1234@Aa')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '12 caractères minimum'
        );
    });

    it('should display an error message when password have no special character', () => {
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('1234567890Aa')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '1 caractère spécial minimum'
        );
    });

    it('should display an error message when password have no number', () => {
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('xxxxxxxxx@xx')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '1 chiffre minimum'
        );
    });

    it('should display an error message when confirm password is different from password', () => {
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'xxx1@@xx012345'
        );
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        )
            .type('xxx1@@xx')
            .blur();
        cy.get(
            '[data-testid="confirm-password-input"] .fr-message--error'
        ).contains('Les mots de passe ne correspondent pas');
    });

    it('should display an error message when age is under 16', () => {
        cy.get('[data-testid="birthdate-input"] > input')
            .type('2023-01-01')
            .blur();
        cy.get('[data-testid="birthdate-input"] > .fr-error-text').contains(
            'Vous devez avoir plus de 16 ans pour créer un compte'
        );
    });

    it('should display an error message when consent is not checked', () => {
        cy.get('[data-testid="submit-button"]').click();
        cy.get('[data-testid="consent-checkbox"] .fr-message--error').contains(
            'Vous devez accepter les conditions d’utilisation'
        );
    });

    it('should display an error message when client error occurs', () => {
        cy.get('[data-testid="submit-button"]').click();
        cy.get('[data-testid="register-client-error-alert"]').should('exist');
    });

    it('should display an error message when server error occurs', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {
            statusCode: 500,
            body: {},
        }).as('register');
        cy.get('[data-testid="email-input"] > input').type('user@example.org');
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'Azertyuiop0$'
        );
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).type('Azertyuiop0$');
        cy.get('[data-testid="birthdate-input"] > input').type('2001-01-01');
        cy.get('[data-testid="consent-checkbox"] [name="user-consent"]').check({
            force: true,
        });
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@register');
        cy.get('[data-testid="register-server-error-alert"]').should('exist');
    });

    it('should redirect to success page', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {
            statusCode: 200,
            body: {},
        }).as('register');
        cy.get('[data-testid="email-input"] > input').type('user@example.org');
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'Azertyuiop0$'
        );
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).type('Azertyuiop0$');
        cy.get('[data-testid="birthdate-input"] > input').type('2000-01-01');
        cy.get('[data-testid="consent-checkbox"] [name="user-consent"]').check({
            force: true,
        });
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@register');
        cy.url().should('eq', 'http://localhost:5173/inscription-reussie');
        cy.get('[data-testid="register-success-alert"]').should('exist');
    });
});

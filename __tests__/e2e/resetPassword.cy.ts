const goToResetPasswordPage = () => {
    cy.intercept(
        'POST',
        'http://localhost:8080/api/auth/verify-token/validToken',
        {
            statusCode: 200,
            body: {},
        }
    ).as('verifyTokenSuccess');
    cy.visit('http://localhost:5173/reinitialisation-mot-de-passe/validToken');
    cy.wait('@verifyTokenSuccess');
};

describe('Reset Password', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
    });

    it('should display an error when token is invalid', () => {
        cy.intercept(
            'POST',
            'http://localhost:8080/api/auth/verify-token/invalidToken',
            {
                statusCode: 400,
                body: {},
            }
        ).as('verifyTokenError');
        cy.visit(
            'http://localhost:5173/reinitialisation-mot-de-passe/invalidToken'
        );
        cy.wait('@verifyTokenError');
        cy.get('[data-testid="reset-password-invalid-token-alert"]').contains(
            'Le lien de réinitialisation de mot de passe est invalide ou a expiré.'
        );
    });

    it('should display the Title', () => {
        goToResetPasswordPage();
        cy.contains('h1', "Réinitialisation de mot de passe sur NomDeL'App");
    });

    it('should display the Form', () => {
        goToResetPasswordPage();
        cy.get('[data-testid="reset-password-form"]').should('exist');
        cy.get('[data-testid="password-input"]').should('exist');
        cy.get('[data-testid="confirm-password-input"]').should('exist');
        cy.get('[data-testid="submit-button"]').should('exist');
    });

    it('should display an error message when password have invalid length', () => {
        goToResetPasswordPage();
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('1234@Aa')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '12 caractères minimum'
        );
    });

    it('should display an error message when password have no special character', () => {
        goToResetPasswordPage();
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('1234567890Aa')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '1 caractère spécial minimum'
        );
    });

    it('should display an error message when password have no number', () => {
        goToResetPasswordPage();
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input')
            .type('xxxxxxxxx@xx')
            .blur();
        cy.get('[data-testid="password-input"] .fr-message--error').contains(
            '1 chiffre minimum'
        );
    });

    it('should display an error message when confirm password is different from password', () => {
        goToResetPasswordPage();

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

    it('should display an error when a client error occurs', () => {
        goToResetPasswordPage();

        cy.get('[data-testid="submit-button"]').click();
        cy.get('[data-testid="reset-password-client-error-alert"]').contains(
            'Veuillez vérifier les informations saisies.'
        );
    });

    it('should display an alert when a server error occurs', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/reset-password', {
            statusCode: 500,
            body: {},
        }).as('resetPasswordError');
        goToResetPasswordPage();

        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'xxx1@@xx012345'
        );
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).type('xxx1@@xx012345');
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@resetPasswordError');
        cy.get('[data-testid="reset-password-server-error-alert"]').contains(
            'Merci de réessayer ultérieurement. Veuillez nous excuser pour la gêne occasionnée.'
        );
    });

    it('should display a success message when the form is submitted', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/reset-password', {
            statusCode: 200,
            body: {},
        }).as('resetPasswordSuccess');
        goToResetPasswordPage();

        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'xxx1@@xx012345'
        );
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).type('xxx1@@xx012345');
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@resetPasswordSuccess');
        cy.get('[data-testid="reset-password-success-alert"]').contains(
            'Votre mot de passe a été réinitialisé avec succès.'
        );
    });
});

describe('Login', () => {
    Cypress.on('uncaught:exception', () => {
        return false;
    });

    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
        cy.visit('http://localhost:5173/connexion');
    });

    it('should display the login form', () => {
        cy.get('[data-testid="login-form"]').should('exist');
        cy.get('[data-testid="email-input"]').should('exist');
        cy.get('[data-testid="password-input"]').should('exist');
        cy.get('[data-testid="remember-me-checkbox"]').should('exist');
        cy.get('[data-testid="submit-button"]').should('exist');
    });

    it('should display the register link', () => {
        cy.get('[data-testid="register-link"]').should('exist');
    });

    it('should display the forgot password link', () => {
        cy.get('[data-testid="forgot-password-link"]').should('exist');
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

    it('should display an error message when credentials are incorrect', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
            statusCode: 401,
            body: {
                type: 'https://tools.ietf.org/html/rfc9110#section-15.5.2',
                title: 'Unauthorized',
                status: 401,
                traceId:
                    '00-851716cad7c89009d1f030e0bd41f210-fcf380533bd92744-00',
            },
        }).as('unauthorizedLogin');
        cy.get('[data-testid="email-input"] > input').type('email@example.org');
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'password'
        );
        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@unauthorizedLogin').then(() => {
            cy.get('[data-testid="login-error-alert"]').contains(
                'Identifiant/mot de passe incorrect'
            );
        });
    });

    it('should redirect to the home page when login is successful', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
            statusCode: 200,
            body: {},
        }).as('login');
        cy.get('[data-testid="email-input"] > input').type('email@example.org');
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'password'
        );
        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@login');
        cy.url().should('eq', 'http://localhost:5173/');
    });
});

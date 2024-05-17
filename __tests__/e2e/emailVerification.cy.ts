describe('Email Verification', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
    });

    it('should display an error message when token is invalid', () => {
        cy.intercept(
            'POST',
            'http://localhost:8080/api/auth/verify-email/invalid-token',
            {
                statusCode: 400,
                body: {
                    type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
                    title: 'Bad Request',
                    status: 400,
                    traceId:
                        '00-851716cad7c89009d1f030e0bd41f210-fcf380533bd92744-00',
                },
            }
        ).as('verifyEmail');
        cy.visit('http://localhost:5173/verification-email/invalid-token');
        cy.wait('@verifyEmail');
        cy.get('[data-testid="email-verified-error-alert"]').contains(
            'Le lien de vérification est invalide ou a expiré.'
        );
    });

    it('should display success message when email has been verified', () => {
        cy.intercept(
            'POST',
            'http://localhost:8080/api/auth/verify-email/valid-token',
            {
                statusCode: 200,
                body: {},
            }
        ).as('verifyEmail');
        cy.visit('http://localhost:5173/verification-email/valid-token');
        cy.wait('@verifyEmail');
        cy.get('[data-testid="email-verified-success-alert"] > p').contains(
            "Votre compte a bien été activé. Vous pouvez dès maintenant commencer à l'utiliser."
        );
    });
});

describe('Profile', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            '@codegouvfr/react-dsfr finalityConsent ',
            '{"isFullConsent":false}'
        );
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
            statusCode: 200,
            fixture: 'login.json',
        }).as('login');
        cy.intercept('OPTIONS', 'http://localhost:8080/api/users', (req) => {
            req.reply({
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }).as('optionsUser');
        cy.visit('http://localhost:5173/connexion');
        cy.get('[data-testid="email-input"] > input').type('email@example.org');
        cy.get('[data-testid="password-input"] > .fr-input-wrap > input').type(
            'password'
        );
        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@login');
        cy.url().should('eq', 'http://localhost:5173/');
        cy.visit('http://localhost:5173/profil');
    });

    it('should display the profile page', () => {
        cy.get('[data-testid="profile-page"]').should('exist');
    });

    it('should display the profile section', () => {
        cy.get('section[data-testid="profile-section"]').should('exist');
        cy.get('[data-testid="profile-picture"]').should('exist');
        cy.get('[data-testid="profile-name"]').contains('johndoe');
    });

    it('should display the info section', () => {
        cy.get('section[data-testid="info-section"]').should('exist');
        cy.get('[data-testid="edit-info-button-0"]').should('exist');
        cy.get('[data-testid="gender-select"] > select')
            .should('have.value', 'M')
            .should('be.disabled');
        cy.get('[data-testid="birthdate-input"] > input')
            .should('have.value', '2000-01-01')
            .should('be.disabled');
        cy.get('[data-testid="email-input"] > input')
            .should('have.value', 'john-doe@example.org')
            .should('be.disabled');
        cy.get('[data-testid="phone-input"] > input')
            .should('have.value', '0123456789')
            .should('be.disabled');
        cy.get('[data-testid="username-input"] > input')
            .should('have.value', 'johndoe')
            .should('be.disabled');
        cy.get('[data-testid="firstname-input"] > input')
            .should('have.value', 'John')
            .should('be.disabled');
        cy.get('[data-testid="lastname-input"] > input')
            .should('have.value', 'Doe')
            .should('be.disabled');
        cy.get('[data-testid="commune-input"] > input')
            .should('have.value', 'Paris')
            .should('be.disabled');
        cy.get('[data-testid="postal-code-input"] > input')
            .should('have.value', '75008')
            .should('be.disabled');
        cy.get('[data-testid="address-input"] > input')
            .should('have.value', '1 rue de Rivoli')
            .should('be.disabled');
        cy.get('[data-testid="profession-input"] > input')
            .should('have.value', 'Rentier')
            .should('be.disabled');
    });

    it('should enable the editing mode when clicking the edit button', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="birthdate-input"] > input')
            .should('have.value', '2000-01-01')
            .should('be.disabled');
        cy.get('[data-testid="email-input"] > input')
            .should('have.value', 'john-doe@example.org')
            .should('be.disabled');
        cy.get('[data-testid="gender-select"] > select')
            .should('have.value', 'M')
            .should('not.be.disabled');
        cy.get('[data-testid="phone-input"] > input')
            .should('have.value', '0123456789')
            .should('not.be.disabled');
        cy.get('[data-testid="username-input"] > input')
            .should('have.value', 'johndoe')
            .should('not.be.disabled');
        cy.get('[data-testid="firstname-input"] > input')
            .should('have.value', 'John')
            .should('not.be.disabled');
        cy.get('[data-testid="lastname-input"] > input')
            .should('have.value', 'Doe')
            .should('not.be.disabled');
        cy.get('[data-testid="commune-input"] > input')
            .should('have.value', 'Paris')
            .should('not.be.disabled');
        cy.get('[data-testid="postal-code-input"] > input')
            .should('have.value', '75008')
            .should('not.be.disabled');
        cy.get('[data-testid="address-input"] > input')
            .should('have.value', '1 rue de Rivoli')
            .should('not.be.disabled');
        cy.get('[data-testid="profession-input"] > input')
            .should('have.value', 'Rentier')
            .should('not.be.disabled');
    });

    it('should display an error message when phone is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="phone-input"] > input').clear().blur();
        cy.get('[data-testid="phone-input"] > .fr-error-text').contains(
            'Veuillez renseigner un numéro de téléphone valide'
        );
    });

    it('should display an error message when phone is invalid', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="phone-input"] > input')
            .clear()
            .type('123')
            .blur();
        cy.get('[data-testid="phone-input"] > .fr-error-text').contains(
            'Veuillez renseigner un numéro de téléphone valide'
        );
    });

    it('should display an error message when username is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="username-input"] > input').clear().blur();
        cy.get('[data-testid="username-input"] > .fr-error-text').contains(
            "Veuillez saisir un nom d'utilisateur"
        );
    });

    it('should display an error message when firstName is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="firstname-input"] > input').clear().blur();
        cy.get('[data-testid="firstname-input"] > .fr-error-text').contains(
            'Veuillez saisir un prénom'
        );
    });

    it('should display an error message when lastName is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="lastname-input"] > input').clear().blur();
        cy.get('[data-testid="lastname-input"] > .fr-error-text').contains(
            'Veuillez saisir un nom'
        );
    });

    it('should display an error message when commune is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="commune-input"] > input').clear().blur();
        cy.get('[data-testid="commune-input"] > .fr-error-text').contains(
            'Veuillez saisir une commune'
        );
    });

    it('should display an error message when postal code is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="postal-code-input"] > input').clear().blur();
        cy.get('[data-testid="postal-code-input"] > .fr-error-text').contains(
            'Veuillez saisir un code postal'
        );
    });

    it('should display an error message when address is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="address-input"] > input').clear().blur();
        cy.get('[data-testid="address-input"] > .fr-error-text').contains(
            'Veuillez saisir une adresse'
        );
    });

    it('should display an error message when profession is empty', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="profession-input"] > input').clear().blur();
        cy.get('[data-testid="profession-input"] > .fr-error-text').contains(
            'Veuillez saisir une profession'
        );
    });

    it('should display an error message when client validation failed', () => {
        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="firstname-input"] > input').clear().blur();
        cy.get('[data-testid="submit-edit-info-button"]').click();
        cy.get('[data-testid="edit-profile-client-error-alert"]').contains(
            'Veuillez vérifier les informations saisies.'
        );
    });

    it('should display an error when server response is an error', () => {
        cy.intercept('PUT', 'http://localhost:8080/api/users', {
            statusCode: 500,
        }).as('updateProfile');

        cy.get('[data-testid="edit-info-button-0"]').click();
        cy.get('[data-testid="submit-edit-info-button"]').click();
        cy.wait('@optionsUser');
        cy.wait('@updateProfile');
        cy.get('[data-testid="edit-profile-server-error-alert"]').contains(
            'Merci de réessayer ultérieurement. Veuillez nous excuser pour la gêne occasionnée.'
        );
    });

    it('should display the change password section', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get('section[data-testid="change-password-section"]').should(
            'exist'
        );
        cy.get(
            '[data-testid="current-password-input"] > .fr-input-wrap > input'
        ).should('exist');
        cy.get(
            '[data-testid="new-password-input"] > .fr-input-wrap > input'
        ).should('exist');
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).should('exist');
        cy.get('[data-testid="submit-change-password-button"]').should('exist');
    });

    it('should display an error message when current password is empty', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get(
            '[data-testid="current-password-input"] > .fr-input-wrap > input'
        )
            .type('abcd')
            .clear()
            .blur();
        cy.get(
            '[data-testid="current-password-input"] > .fr-messages-group > .fr-message--error'
        ).contains('Veuillez saisir votre mot de passe actuel');
    });

    it('should display an error message when password have invalid length', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get('[data-testid="new-password-input"] > .fr-input-wrap > input')
            .type('1234@Aa')
            .blur();
        cy.get(
            '[data-testid="new-password-input"] .fr-message--error'
        ).contains('12 caractères minimum');
    });

    it('should display an error message when password have no special character', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get('[data-testid="new-password-input"] > .fr-input-wrap > input')
            .type('1234567890Aa')
            .blur();
        cy.get(
            '[data-testid="new-password-input"] .fr-message--error'
        ).contains('1 caractère spécial minimum');
    });

    it('should display an error message when password have no number', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get('[data-testid="new-password-input"] > .fr-input-wrap > input')
            .type('xxxxxxxxx@xx')
            .blur();
        cy.get(
            '[data-testid="new-password-input"] .fr-message--error'
        ).contains('1 chiffre minimum');
    });

    it('should display an error message when confirm password is different from password', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get(
            '[data-testid="new-password-input"] > .fr-input-wrap > input'
        ).type('xxx1@@xx012345');
        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        )
            .type('xxx1@@xx')
            .blur();
        cy.get(
            '[data-testid="confirm-password-input"] .fr-message--error'
        ).contains('Les mots de passe ne correspondent pas');
    });

    it('should display an error message when client validation failed', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.get('[data-testid="submit-change-password-button"]').click();
        cy.get('[data-testid="change-password-client-error-alert"]').contains(
            'Veuillez vérifier les informations saisies.'
        );
    });

    it('should display an error message when server response is an error', () => {
        cy.get('[data-testid="password-tab"]').click();
        cy.intercept('POST', 'http://localhost:8080/api/auth/change-password', {
            statusCode: 500,
        }).as('changePassword');

        cy.get(
            '[data-testid="current-password-input"] > .fr-input-wrap > input'
        ).type('Azertyuiop0$');

        cy.get(
            '[data-testid="new-password-input"] > .fr-input-wrap > input'
        ).type('Azertyuiop0$');

        cy.get(
            '[data-testid="confirm-password-input"] > .fr-input-wrap > input'
        ).type('Azertyuiop0$');

        cy.get('[data-testid="submit-change-password-button"]').click();
        cy.wait('@changePassword');
        cy.get('[data-testid="change-password-server-error-alert"]').contains(
            'Merci de réessayer ultérieurement. Veuillez nous excuser pour la gêne occasionnée.'
        );
    });
});

import Button from '@codegouvfr/react-dsfr/Button';
import SingleColumnLayout from '@layout/SingleColumnLayout';
import { Typography } from '@mui/material';
import { ROUTES } from '@router/routes';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
    return (
        <SingleColumnLayout>
            <Typography component="h1" variant="h2">
                Erreur
            </Typography>
            <Button onClick={() => navigate(ROUTES.HOME)}>
                Retour à l'acceuil
            </Button>
        </SingleColumnLayout>
    );
}

export default Error;

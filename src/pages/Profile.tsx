import { Grid } from '@mui/material';
import ProfileSection from '@src/components/Profile/ProfileSection';
import ProfileTabs from '@src/components/Profile/ProfileTabs';
import { selectIsLoggedIn } from '@src/features/auth/authSlice';
import { ROUTES } from '@src/router/routes';
import { useAppSelector } from '@src/store/hooks';
import { Navigate } from 'react-router-dom';

function Profile() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} />;
    }
    return (
        <Grid container data-testid="profile-page">
            <Grid item xs={12} sm={4}>
                <ProfileSection />
            </Grid>
            <Grid item xs={12} sm={8}>
                <ProfileTabs />
            </Grid>
        </Grid>
    );
}

export default Profile;

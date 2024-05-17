import { Avatar, Box, Typography } from '@mui/material';
import { selectCurrentUser } from '@src/features/auth/authSlice';
import { useAppSelector } from '@src/store/hooks';

function ProfileSection() {
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <Box
            data-testid="profile-section"
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                position: 'sticky',
                top: 10,
            }}
        >
            <Avatar
                variant="square"
                alt="Profile picture"
                data-testid="profile-picture"
                sx={{ width: 80, height: 80 }}
            >
                {currentUser?.username?.slice(0, 4)}
            </Avatar>
            <Typography variant="h2" component="h1" data-testid="profile-name">
                {currentUser?.username}
            </Typography>
        </Box>
    );
}

export default ProfileSection;

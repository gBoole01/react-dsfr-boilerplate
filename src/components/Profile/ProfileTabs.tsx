import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useState } from 'react';
import ChangePasswordSection from './ChangePasswordSection';
import InfoSection from './InfoSection';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProfileTabs() {
    const [value, setValue] = useState(0);
    const handleChange = (_e: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="profile section tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab
                        data-testid="info-tab"
                        label="Infos personnelles"
                        {...a11yProps(0)}
                    />
                    <Tab
                        data-testid="password-tab"
                        label="Mot de passe"
                        {...a11yProps(0)}
                    />
                    <Tab
                        data-testid="preferences-tab"
                        label="Préferences"
                        {...a11yProps(1)}
                    />
                    <Tab
                        data-testid="statistics-tab"
                        label="Statistiques"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <InfoSection />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ChangePasswordSection />
            </TabPanel>
        </Box>
    );
}

export default ProfileTabs;

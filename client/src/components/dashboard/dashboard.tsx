import * as React from 'react';
import { Grid, Paper, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
const Dashboard: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 8 }}>
                    <Item>xs=6 md=8</Item>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid size={{ xs: 6, md: 8 }}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;

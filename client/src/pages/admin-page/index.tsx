import { AppBar, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackSharp";
import { useContext, useEffect } from "react";
import { AdminPageContext } from "./admin-page-store";
import tabs from "./tabs";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import { ROUTE_INDEX } from "pages/routes/constants";

const AdminPage = () => {
    const navigate = useNavigate();
    const { selectedTab, setTab, reset } = useContext(AdminPageContext);

    useEffect(() => reset, [reset]);

    const TabToDisplay = tabs[selectedTab].component;

    return <>
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <IconButton
                    title="Back"
                    color="inherit"
                    size="small"
                    onClick={() => navigate(ROUTE_INDEX)}>
                    <ArrowBackIcon />
                </IconButton>
                <Tabs
                    indicatorColor="secondary"
                    textColor="inherit"
                    value={selectedTab}
                    onChange={(_, value) => setTab(value)}>
                    {tabs.map(({ label }, index) => (
                        <Tab key={index} color="inherit" label={label} />
                    ))}
                </Tabs>
            </Toolbar>
        </AppBar>
        <Toolbar />
        <TabToDisplay />
    </>;
}

export default observer(AdminPage);
import { AppBar, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackSharp";
import { useContext, useEffect } from "react";
import { AdminPageContext } from "./admin-page-store";
import tabs from "./tabs";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";

const AdminPage = () => {
    const navigate = useNavigate();
    const { selectedTab, setTab, reset } = useContext(AdminPageContext);

    useEffect(() => reset, [reset]);

    const TabToDisplay = tabs[selectedTab].component;

    return <>
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <IconButton color="inherit" size="small" onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                </IconButton>
                <Tabs
                    indicatorColor="secondary"
                    textColor="inherit"
                    value={selectedTab}
                    onChange={(_, value) => setTab(value)}>
                    {tabs.map(({ label }) => (
                        <Tab color="inherit" label={label} />
                    ))}
                </Tabs>
            </Toolbar>
        </AppBar>
        <Toolbar />
        <TabToDisplay />
    </>;
}

export default observer(AdminPage);
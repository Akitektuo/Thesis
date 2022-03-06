import { Button, Container } from "@mui/material";
import { CenterLayout, Text, TextInput } from "components";
import { navigationService, useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { ROUTE_REGISTER } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { LoginPageContext } from "./login-page-store";
import styles from "./login-page.module.scss";

const LoginPage = () => {
    useForceUpdate();

    const {
        user,
        validator,
        setEmail,
        setPassword,
        onSubmit,
        reset
    } = useContext(LoginPageContext);

    useEffect(() => reset, [reset]);

    return (
        <CenterLayout>
            <Container className={styles.container}>
                <Text className={styles.header} variant="h3">Login</Text>
                <TextInput
                    validator={validator}
                    fieldName="email"
                    className={styles.textInput}
                    label="Email"
                    value={user.email}
                    onChange={setEmail}
                    type="email"
                    autoComplete="email" />
                <TextInput
                    validator={validator}
                    fieldName="password"
                    className={styles.textInput}
                    label="Password"
                    value={user.password}
                    onChange={setPassword}
                    type="password"
                    autoComplete="current-password" />
                <div className={styles.buttonsContainer}>
                    <Button onClick={() => navigationService.to(ROUTE_REGISTER)}>
                        Create account
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        disabled={validator.isSubmitDisabled()}>Login</Button>
                </div>
            </Container>
        </CenterLayout>
    );
}

export default observer(LoginPage);
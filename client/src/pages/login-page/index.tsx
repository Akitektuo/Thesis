import { Button, Container } from "@mui/material";
import { Text, TextInput } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { LoginPageContext } from "./login-page-store";
import styles from "./login-page.module.scss";

const LoginPage = () => {
    const { user, validator, setEmail, setPassword, onSubmit, reset } = useContext(LoginPageContext);

    useEffect(() => reset, [reset]);

    return (
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
                <Button>Create account</Button>
                <Button variant="contained" onClick={onSubmit}>Login</Button>
            </div>
        </Container>
    );
}

export default observer(LoginPage);
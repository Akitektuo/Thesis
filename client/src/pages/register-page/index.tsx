import { Button, Container } from "@mui/material";
import { navigationService, useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { RegisterPageContext } from "./register-page-store";
import { CenterLayout, Text, TextInput } from "components";
import styles from "./register-page.module.scss";

const RegisterPage = () => {
    useForceUpdate();

    const {
        user,
        validator,
        setEmail,
        setPassword,
        setConfirmPassword,
        onSubmit,
        reset
    } = useContext(RegisterPageContext);

    useEffect(() => reset, [reset]);

    return (
        <CenterLayout>
            <Container className={styles.container}>
                <Text className={styles.header} variant="h3">Create account</Text>
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
                    autoComplete="new-password" />
                <TextInput
                    validator={validator}
                    fieldName="confirmPassword"
                    className={styles.textInput}
                    label="Confirm password"
                    value={user.confirmPassword}
                    onChange={setConfirmPassword}
                    type="password"
                    autoComplete="new-password" />
                <div className={styles.buttonsContainer}>
                    <Button onClick={() => navigationService.to("/login")}>
                        Already have an account
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        disabled={validator.isSubmitDisabled()}>Create account</Button>
                </div>
            </Container>
        </CenterLayout>
    );
}

export default observer(RegisterPage);
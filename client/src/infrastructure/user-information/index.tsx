import { useContext, useEffect } from "react";
import { UserInformationContext } from "./user-information-store";

const UserInformation = () => {
    const { fetchUserInformation } = useContext(UserInformationContext);

    useEffect(() => {
        fetchUserInformation();
    }, [fetchUserInformation]);

    return null;
}

export default UserInformation;
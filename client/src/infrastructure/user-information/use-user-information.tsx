import { useContext } from "react";
import { UserInformationContext } from "./user-information-store";

const useUserInformation = () => {
    const { userInformation } = useContext(UserInformationContext);

    return userInformation;
}

export default useUserInformation;
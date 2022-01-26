import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { NavigationServiceContext } from "./navigation-service-store";

const NavigationService = () => {
    const navigate = useNavigate();

    const { initialize } = useContext(NavigationServiceContext);

    useEffect(() => {
        initialize(navigate);
    }, [navigate, initialize]);

    return null;
}

export default NavigationService;
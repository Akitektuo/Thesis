import { toJS } from "mobx";
import { useContext } from "react"
import { ForceUpdateContext } from "./force-update-store";

const useForceUpdate = () => {
    const { toggle } = useContext(ForceUpdateContext);

    toJS(toggle);
}

export default useForceUpdate;
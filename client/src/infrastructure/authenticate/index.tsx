import { useContext } from "react"
import { AuthenticateContext } from "./authenticate-store"

const useAuthentication = () => useContext(AuthenticateContext);

export default useAuthentication;
import AchievementPopup from "./achievement-popup";
import LoadingOverlay from "./loading-overlay";
import ToastService from "./toast-service";
import UserInformation from "./user-information";

const Services = () => <>
    <LoadingOverlay />
    <ToastService />
    <UserInformation />
    <AchievementPopup />
</>;

export default Services;
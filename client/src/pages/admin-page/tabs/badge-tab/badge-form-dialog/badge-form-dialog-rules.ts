import { InputPlainBadgeType } from "shared/types/badge-types";
import { RulesType } from "validation";

const MINIMUM_POINTS = 50;

const BadgeFormDialogRules: RulesType<InputPlainBadgeType> = {
    name: {
        required: "The name is required!"
    },
    image: {
        required: "The image is required!"
    },
    points: {
        required: "The number of points is required!",
        range: {
            min: MINIMUM_POINTS,
            message: `The number of points should be at least ${MINIMUM_POINTS}!`
        }
    }
}

export default BadgeFormDialogRules;
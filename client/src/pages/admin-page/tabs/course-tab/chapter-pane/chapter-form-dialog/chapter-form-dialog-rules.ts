import { InputPlainChapterType } from "shared/types/chapter-types";
import { RulesType } from "validation";

const MINIMUM_POINTS = 50;
const MINIMUM_LEVEL = 1;

const ChapterFormDialogRules: RulesType<InputPlainChapterType> = {
    name: {
        required: "The name is required!"
    },
    points: {
        required: "The number of points is required!",
        range: {
            min: MINIMUM_POINTS,
            message: `The number of points should be at least ${MINIMUM_POINTS}!`
        }
    },
    level: {
        required: "The level is required!",
        range: {
            min: MINIMUM_LEVEL,
            message: `The level should be at least ${MINIMUM_LEVEL}!`
        }
    }
}

export default ChapterFormDialogRules;
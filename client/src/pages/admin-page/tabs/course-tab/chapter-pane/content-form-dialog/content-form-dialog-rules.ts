import { PlainContentType } from "shared/types/content-types";
import { RulesType } from "validation";

const ContentFormDialogRules: RulesType<PlainContentType> = {
    text: {
        required: "The content text is required!"
    }
}

export default ContentFormDialogRules;
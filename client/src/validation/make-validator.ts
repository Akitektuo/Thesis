import { RulesType } from "./types";
import Validator from "./validator";

const makeValidator = <T extends object>(model: T, rules: RulesType<T>) => 
    new Validator(model, rules);

export default makeValidator;
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * A value that indicates the amount of time that the customer used the app.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/playtime playTime}
 */
export var PlayTime;
(function (PlayTime) {
    PlayTime[PlayTime["UNDECLARED"] = 0] = "UNDECLARED";
    PlayTime[PlayTime["ZERO_TO_FIVE_MINUTES"] = 1] = "ZERO_TO_FIVE_MINUTES";
    PlayTime[PlayTime["FIVE_TO_SIXTY_MINUTES"] = 2] = "FIVE_TO_SIXTY_MINUTES";
    PlayTime[PlayTime["ONE_TO_SIX_HOURS"] = 3] = "ONE_TO_SIX_HOURS";
    PlayTime[PlayTime["SIX_HOURS_TO_TWENTY_FOUR_HOURS"] = 4] = "SIX_HOURS_TO_TWENTY_FOUR_HOURS";
    PlayTime[PlayTime["ONE_DAY_TO_FOUR_DAYS"] = 5] = "ONE_DAY_TO_FOUR_DAYS";
    PlayTime[PlayTime["FOUR_DAYS_TO_SIXTEEN_DAYS"] = 6] = "FOUR_DAYS_TO_SIXTEEN_DAYS";
    PlayTime[PlayTime["OVER_SIXTEEN_DAYS"] = 7] = "OVER_SIXTEEN_DAYS";
})(PlayTime || (PlayTime = {}));
export class PlayTimeValidator extends NumberValidator {
}

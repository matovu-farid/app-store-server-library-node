// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * A value that indicates the dollar amount of refunds the customer has received in your app, since purchasing the app, across all platforms.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/lifetimedollarsrefunded lifetimeDollarsRefunded}
 */
export var LifetimeDollarsRefunded;
(function (LifetimeDollarsRefunded) {
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["UNDECLARED"] = 0] = "UNDECLARED";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["ZERO_DOLLARS"] = 1] = "ZERO_DOLLARS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["ONE_CENT_TO_FORTY_NINE_DOLLARS_AND_NINETY_NINE_CENTS"] = 2] = "ONE_CENT_TO_FORTY_NINE_DOLLARS_AND_NINETY_NINE_CENTS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["FIFTY_DOLLARS_TO_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS"] = 3] = "FIFTY_DOLLARS_TO_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["ONE_HUNDRED_DOLLARS_TO_FOUR_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS"] = 4] = "ONE_HUNDRED_DOLLARS_TO_FOUR_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["FIVE_HUNDRED_DOLLARS_TO_NINE_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS"] = 5] = "FIVE_HUNDRED_DOLLARS_TO_NINE_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["ONE_THOUSAND_DOLLARS_TO_ONE_THOUSAND_NINE_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS"] = 6] = "ONE_THOUSAND_DOLLARS_TO_ONE_THOUSAND_NINE_HUNDRED_NINETY_NINE_DOLLARS_AND_NINETY_NINE_CENTS";
    LifetimeDollarsRefunded[LifetimeDollarsRefunded["TWO_THOUSAND_DOLLARS_OR_GREATER"] = 7] = "TWO_THOUSAND_DOLLARS_OR_GREATER";
})(LifetimeDollarsRefunded || (LifetimeDollarsRefunded = {}));
export class LifetimeDollarsRefundedValidator extends NumberValidator {
}

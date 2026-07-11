// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The age of the customer’s account.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/accounttenure accountTenure}
 */
export var AccountTenure;
(function (AccountTenure) {
    AccountTenure[AccountTenure["UNDECLARED"] = 0] = "UNDECLARED";
    AccountTenure[AccountTenure["ZERO_TO_THREE_DAYS"] = 1] = "ZERO_TO_THREE_DAYS";
    AccountTenure[AccountTenure["THREE_DAYS_TO_TEN_DAYS"] = 2] = "THREE_DAYS_TO_TEN_DAYS";
    AccountTenure[AccountTenure["TEN_DAYS_TO_THIRTY_DAYS"] = 3] = "TEN_DAYS_TO_THIRTY_DAYS";
    AccountTenure[AccountTenure["THIRTY_DAYS_TO_NINETY_DAYS"] = 4] = "THIRTY_DAYS_TO_NINETY_DAYS";
    AccountTenure[AccountTenure["NINETY_DAYS_TO_ONE_HUNDRED_EIGHTY_DAYS"] = 5] = "NINETY_DAYS_TO_ONE_HUNDRED_EIGHTY_DAYS";
    AccountTenure[AccountTenure["ONE_HUNDRED_EIGHTY_DAYS_TO_THREE_HUNDRED_SIXTY_FIVE_DAYS"] = 6] = "ONE_HUNDRED_EIGHTY_DAYS_TO_THREE_HUNDRED_SIXTY_FIVE_DAYS";
    AccountTenure[AccountTenure["GREATER_THAN_THREE_HUNDRED_SIXTY_FIVE_DAYS"] = 7] = "GREATER_THAN_THREE_HUNDRED_SIXTY_FIVE_DAYS";
})(AccountTenure || (AccountTenure = {}));
export class AccountTenureValidator extends NumberValidator {
}

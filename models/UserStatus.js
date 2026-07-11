// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The status of a customer’s account within your app.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/userstatus userStatus}
 */
export var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["UNDECLARED"] = 0] = "UNDECLARED";
    UserStatus[UserStatus["ACTIVE"] = 1] = "ACTIVE";
    UserStatus[UserStatus["SUSPENDED"] = 2] = "SUSPENDED";
    UserStatus[UserStatus["TERMINATED"] = 3] = "TERMINATED";
    UserStatus[UserStatus["LIMITED_ACCESS"] = 4] = "LIMITED_ACCESS";
})(UserStatus || (UserStatus = {}));
export class UserStatusValidator extends NumberValidator {
}

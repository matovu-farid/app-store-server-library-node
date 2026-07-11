// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The server environment, either sandbox or production.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/environment environment}
 */
export var Environment;
(function (Environment) {
    Environment["SANDBOX"] = "Sandbox";
    Environment["PRODUCTION"] = "Production";
    Environment["XCODE"] = "Xcode";
    Environment["LOCAL_TESTING"] = "LocalTesting";
})(Environment || (Environment = {}));
export class EnvironmentValidator extends StringValidator {
}

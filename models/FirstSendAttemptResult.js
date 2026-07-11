// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * An error or result that the App Store server receives when attempting to send an App Store server notification to your server.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/firstsendattemptresult firstSendAttemptResult}
 */
export var FirstSendAttemptResult;
(function (FirstSendAttemptResult) {
    FirstSendAttemptResult["SUCCESS"] = "SUCCESS";
    FirstSendAttemptResult["TIMED_OUT"] = "TIMED_OUT";
    FirstSendAttemptResult["TLS_ISSUE"] = "TLS_ISSUE";
    FirstSendAttemptResult["CIRCULAR_REDIRECT"] = "CIRCULAR_REDIRECT";
    FirstSendAttemptResult["NO_RESPONSE"] = "NO_RESPONSE";
    FirstSendAttemptResult["SOCKET_ISSUE"] = "SOCKET_ISSUE";
    FirstSendAttemptResult["UNSUPPORTED_CHARSET"] = "UNSUPPORTED_CHARSET";
    FirstSendAttemptResult["INVALID_RESPONSE"] = "INVALID_RESPONSE";
    FirstSendAttemptResult["PREMATURE_CLOSE"] = "PREMATURE_CLOSE";
    FirstSendAttemptResult["UNSUCCESSFUL_HTTP_RESPONSE_CODE"] = "UNSUCCESSFUL_HTTP_RESPONSE_CODE";
    FirstSendAttemptResult["OTHER"] = "OTHER";
})(FirstSendAttemptResult || (FirstSendAttemptResult = {}));
export class FirstSendAttemptResultValidator extends StringValidator {
}

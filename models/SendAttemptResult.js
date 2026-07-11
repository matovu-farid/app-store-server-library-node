// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The success or error information the App Store server records when it attempts to send an App Store server notification to your server.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/sendattemptresult sendAttemptResult}
 */
export var SendAttemptResult;
(function (SendAttemptResult) {
    SendAttemptResult["SUCCESS"] = "SUCCESS";
    SendAttemptResult["TIMED_OUT"] = "TIMED_OUT";
    SendAttemptResult["TLS_ISSUE"] = "TLS_ISSUE";
    SendAttemptResult["CIRCULAR_REDIRECT"] = "CIRCULAR_REDIRECT";
    SendAttemptResult["NO_RESPONSE"] = "NO_RESPONSE";
    SendAttemptResult["SOCKET_ISSUE"] = "SOCKET_ISSUE";
    SendAttemptResult["UNSUPPORTED_CHARSET"] = "UNSUPPORTED_CHARSET";
    SendAttemptResult["INVALID_RESPONSE"] = "INVALID_RESPONSE";
    SendAttemptResult["PREMATURE_CLOSE"] = "PREMATURE_CLOSE";
    SendAttemptResult["UNSUCCESSFUL_HTTP_RESPONSE_CODE"] = "UNSUCCESSFUL_HTTP_RESPONSE_CODE";
    SendAttemptResult["OTHER"] = "OTHER";
})(SendAttemptResult || (SendAttemptResult = {}));
export class SendAttemptResultValidator extends StringValidator {
}

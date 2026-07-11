// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
//import jsonwebtoken = require('jsonwebtoken');
import * as jose from "jose";
import { Environment } from "./models/Environment";
import { JWSTransactionDecodedPayloadValidator, } from "./models/JWSTransactionDecodedPayload";
import { ResponseBodyV2DecodedPayloadValidator, } from "./models/ResponseBodyV2DecodedPayload";
import { JWSRenewalInfoDecodedPayloadValidator, } from "./models/JWSRenewalInfoDecodedPayload";
import { DecodedRealtimeRequestBodyValidator, } from "./models/DecodedRealtimeRequestBody";
import { AppTransactionValidator, } from "./models/AppTransaction";
const MAX_SKEW = 60000;
/**
 * A class providing utility methods for verifying and decoding App Store signed data.
 *
 * Example Usage:
 * ```ts
 * const verifier = new SignedDataVerifier([appleRoot, appleRoot2], true, Environment.SANDBOX, "com.example")
 *
 * try {
 *     const decodedNotification = verifier.verifyAndDecodeNotification("ey...")
 *     console.log(decodedNotification)
 * } catch (e) {
 *     console.error(e)
 * }
 * ```
 */
export class SignedDataVerifier {
    JWSRenewalInfoDecodedPayloadValidator = new JWSRenewalInfoDecodedPayloadValidator();
    JWSTransactionDecodedPayloadValidator = new JWSTransactionDecodedPayloadValidator();
    responseBodyV2DecodedPayloadValidator = new ResponseBodyV2DecodedPayloadValidator();
    appTransactionValidator = new AppTransactionValidator();
    decodedRealtimeRequestBodyValidator = new DecodedRealtimeRequestBodyValidator();
    bundleId;
    appAppleId;
    environment;
    /**
     *
     * @param appleRootCertificates A list of DER-encoded root certificates
     * @param enableOnlineChecks Whether to enable revocation checking and check expiration using the current date
     * @param environment The App Store environment to target for checks
     * @param bundleId The app's bundle identifier
     * @param appAppleId The app's identifier, omitted in the sandbox environment
     */
    constructor(environment, bundleId, appAppleId) {
        this.bundleId = bundleId;
        this.environment = environment;
        this.appAppleId = appAppleId;
        if (environment === Environment.PRODUCTION && appAppleId === undefined) {
            throw new Error("appAppleId is required when the environment is Production");
        }
    }
    /**
     * Verifies and decodes a signedTransaction obtained from the App Store Server API, an App Store Server Notification, or from a device
     * See {@link https://developer.apple.com/documentation/appstoreserverapi/jwstransaction JWSTransaction}
     *
     * @param signedTransaction The signedTransaction field
     * @return The decoded transaction info after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeTransaction(signedTransactionInfo) {
        const decodedJWT = await this.verifyJWT(signedTransactionInfo, this.JWSTransactionDecodedPayloadValidator, this.extractSignedDate);
        if (decodedJWT.bundleId !== this.bundleId) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (decodedJWT.environment !== this.environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedJWT;
    }
    /**
     * Verifies and decodes a signedRenewalInfo obtained from the App Store Server API, an App Store Server Notification, or from a device
     * See {@link https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfo JWSRenewalInfo}
     *
     * @param signedRenewalInfo The signedRenewalInfo field
     * @return The decoded renewal info after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeRenewalInfo(signedRenewalInfo) {
        const decodedRenewalInfo = await this.verifyJWT(signedRenewalInfo, this.JWSRenewalInfoDecodedPayloadValidator, this.extractSignedDate);
        const environment = decodedRenewalInfo.environment;
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedRenewalInfo;
    }
    /**
     * Verifies and decodes an App Store Server Notification signedPayload
     * See {@link https://developer.apple.com/documentation/appstoreservernotifications/signedpayload signedPayload}
     *
     * @param signedPayload The payload received by your server
     * @return The decoded payload after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeNotification(signedPayload) {
        const decodedJWT = await this.verifyJWT(signedPayload, this.responseBodyV2DecodedPayloadValidator, this.extractSignedDate);
        let appAppleId;
        let bundleId;
        let environment;
        if (decodedJWT.data) {
            appAppleId = decodedJWT.data.appAppleId;
            bundleId = decodedJWT.data.bundleId;
            environment = decodedJWT.data.environment;
        }
        else if (decodedJWT.summary) {
            appAppleId = decodedJWT.summary.appAppleId;
            bundleId = decodedJWT.summary.bundleId;
            environment = decodedJWT.summary.environment;
        }
        else if (decodedJWT.externalPurchaseToken) {
            appAppleId = decodedJWT.externalPurchaseToken.appAppleId;
            bundleId = decodedJWT.externalPurchaseToken.bundleId;
            if (decodedJWT.externalPurchaseToken.externalPurchaseId &&
                decodedJWT.externalPurchaseToken.externalPurchaseId.startsWith("SANDBOX")) {
                environment = Environment.SANDBOX;
            }
            else {
                environment = Environment.PRODUCTION;
            }
        }
        else if (decodedJWT.appData) {
            appAppleId = decodedJWT.appData.appAppleId;
            bundleId = decodedJWT.appData.bundleId;
            environment = decodedJWT.appData.environment;
        }
        this.verifyNotification(bundleId, appAppleId, environment);
        return decodedJWT;
    }
    verifyNotification(bundleId, appAppleId, environment) {
        if (this.bundleId !== bundleId ||
            (this.environment === Environment.PRODUCTION &&
                this.appAppleId !== appAppleId)) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
    }
    /**
     * Verifies and decodes a signed AppTransaction
     * See {@link https://developer.apple.com/documentation/storekit/apptransaction AppTransaction}
     *
     * @param signedAppTransaction The signed AppTransaction
     * @returns The decoded AppTransaction after validation
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeAppTransaction(signedAppTransaction) {
        const decodedAppTransaction = await this.verifyJWT(signedAppTransaction, this.appTransactionValidator, (t) => t.receiptCreationDate === undefined
            ? new Date()
            : new Date(t.receiptCreationDate));
        const environment = decodedAppTransaction.receiptType;
        if (this.bundleId !== decodedAppTransaction.bundleId ||
            (this.environment === Environment.PRODUCTION &&
                this.appAppleId !== decodedAppTransaction.appAppleId)) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedAppTransaction;
    }
    /**
     * Verifies and decodes a Retention Messaging API signedPayload
     * See {@link https://developer.apple.com/documentation/retentionmessaging/signedpayload signedPayload}
     *
     * @param signedPayload The payload received by your server
     * @returns The decoded payload after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeRealtimeRequest(signedPayload) {
        const decodedRequest = await this.verifyJWT(signedPayload, this.decodedRealtimeRequestBodyValidator, this.extractSignedDate);
        if (this.environment === Environment.PRODUCTION &&
            this.appAppleId !== decodedRequest.appAppleId) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (this.environment !== decodedRequest.environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedRequest;
    }
    async verifyJWT(jwt, validator, signedDateExtractor) {
        try {
            // 1. Decode without verification
            const decodedJWT = jose.decodeJwt(jwt);
            // 2. Schema validation
            if (!validator.validate(decodedJWT)) {
                throw new VerificationException(VerificationStatus.FAILURE);
            }
            // 3. Skip verification in local/test environments
            if (this.environment === Environment.XCODE ||
                this.environment === Environment.LOCAL_TESTING) {
                return decodedJWT;
            }
            // 4. JWKS verification (Apple)
            const JWKS = jose.createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));
            const { payload } = await jose.jwtVerify(jwt, JWKS, {
                issuer: "https://appleid.apple.com",
                audience: this.bundleId,
            });
            const verifiedJWT = payload;
            // 5. Date validation (kept from your logic)
            const effectiveDate = signedDateExtractor(verifiedJWT);
            if (effectiveDate.getTime() > Date.now() + MAX_SKEW) {
                throw new VerificationException(VerificationStatus.FAILURE);
            }
            return verifiedJWT;
        }
        catch (error) {
            if (error instanceof VerificationException) {
                throw error;
            }
            // JOSE error handling (clean + minimal)
            throw new VerificationException(VerificationStatus.VERIFICATION_FAILURE, error instanceof Error ? error : undefined);
        }
    }
    extractSignedDate(decodedJWT) {
        return decodedJWT.signedDate === undefined
            ? new Date()
            : new Date(decodedJWT.signedDate);
    }
}
export var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus[VerificationStatus["OK"] = 0] = "OK";
    VerificationStatus[VerificationStatus["VERIFICATION_FAILURE"] = 1] = "VERIFICATION_FAILURE";
    VerificationStatus[VerificationStatus["RETRYABLE_VERIFICATION_FAILURE"] = 2] = "RETRYABLE_VERIFICATION_FAILURE";
    VerificationStatus[VerificationStatus["INVALID_APP_IDENTIFIER"] = 3] = "INVALID_APP_IDENTIFIER";
    VerificationStatus[VerificationStatus["INVALID_ENVIRONMENT"] = 4] = "INVALID_ENVIRONMENT";
    VerificationStatus[VerificationStatus["INVALID_CHAIN_LENGTH"] = 5] = "INVALID_CHAIN_LENGTH";
    VerificationStatus[VerificationStatus["INVALID_CERTIFICATE"] = 6] = "INVALID_CERTIFICATE";
    VerificationStatus[VerificationStatus["FAILURE"] = 7] = "FAILURE";
})(VerificationStatus || (VerificationStatus = {}));
export class VerificationException extends Error {
    status;
    cause;
    constructor(status, cause) {
        super();
        this.status = status;
        this.cause = cause;
    }
}

// Copyright (c) 2023 Apple Inc. Licensed under MIT License.

//import jsonwebtoken = require('jsonwebtoken');
import * as jose from "jose";

import { Environment } from "./models/Environment";
import {
  JWSTransactionDecodedPayload,
  JWSTransactionDecodedPayloadValidator,
} from "./models/JWSTransactionDecodedPayload";
import {
  ResponseBodyV2DecodedPayload,
  ResponseBodyV2DecodedPayloadValidator,
} from "./models/ResponseBodyV2DecodedPayload";
import {
  JWSRenewalInfoDecodedPayload,
  JWSRenewalInfoDecodedPayloadValidator,
} from "./models/JWSRenewalInfoDecodedPayload";
import {
  DecodedRealtimeRequestBody,
  DecodedRealtimeRequestBodyValidator,
} from "./models/DecodedRealtimeRequestBody";
import { Validator } from "./models/Validator";
import { DecodedSignedData } from "./models/DecodedSignedData";
import {
  AppTransaction,
  AppTransactionValidator,
} from "./models/AppTransaction";

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
  private JWSRenewalInfoDecodedPayloadValidator =
    new JWSRenewalInfoDecodedPayloadValidator();
  private JWSTransactionDecodedPayloadValidator =
    new JWSTransactionDecodedPayloadValidator();
  private responseBodyV2DecodedPayloadValidator =
    new ResponseBodyV2DecodedPayloadValidator();
  private appTransactionValidator = new AppTransactionValidator();
  private decodedRealtimeRequestBodyValidator =
    new DecodedRealtimeRequestBodyValidator();

  protected bundleId: string;
  protected appAppleId?: number;
  protected environment: Environment;

  /**
   *
   * @param appleRootCertificates A list of DER-encoded root certificates
   * @param enableOnlineChecks Whether to enable revocation checking and check expiration using the current date
   * @param environment The App Store environment to target for checks
   * @param bundleId The app's bundle identifier
   * @param appAppleId The app's identifier, omitted in the sandbox environment
   */
  constructor(environment: Environment, bundleId: string, appAppleId?: number) {
    this.bundleId = bundleId;
    this.environment = environment;
    this.appAppleId = appAppleId;
    if (environment === Environment.PRODUCTION && appAppleId === undefined) {
      throw new Error(
        "appAppleId is required when the environment is Production",
      );
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
  async verifyAndDecodeTransaction(
    signedTransactionInfo: string,
  ): Promise<JWSTransactionDecodedPayload> {
    const decodedJWT: JWSTransactionDecodedPayload = await this.verifyJWT(
      signedTransactionInfo,
      this.JWSTransactionDecodedPayloadValidator,
      this.extractSignedDate,
    );
    if (decodedJWT.bundleId !== this.bundleId) {
      throw new VerificationException(
        VerificationStatus.INVALID_APP_IDENTIFIER,
      );
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
  async verifyAndDecodeRenewalInfo(
    signedRenewalInfo: string,
  ): Promise<JWSRenewalInfoDecodedPayload> {
    const decodedRenewalInfo: JWSRenewalInfoDecodedPayload =
      await this.verifyJWT(
        signedRenewalInfo,
        this.JWSRenewalInfoDecodedPayloadValidator,
        this.extractSignedDate,
      );
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
  async verifyAndDecodeNotification(
    signedPayload: string,
  ): Promise<ResponseBodyV2DecodedPayload> {
    const decodedJWT: ResponseBodyV2DecodedPayload = await this.verifyJWT(
      signedPayload,
      this.responseBodyV2DecodedPayloadValidator,
      this.extractSignedDate,
    );
    let appAppleId: number | undefined;
    let bundleId: string | undefined;
    let environment: string | undefined;
    if (decodedJWT.data) {
      appAppleId = decodedJWT.data.appAppleId;
      bundleId = decodedJWT.data.bundleId;
      environment = decodedJWT.data.environment;
    } else if (decodedJWT.summary) {
      appAppleId = decodedJWT.summary.appAppleId;
      bundleId = decodedJWT.summary.bundleId;
      environment = decodedJWT.summary.environment;
    } else if (decodedJWT.externalPurchaseToken) {
      appAppleId = decodedJWT.externalPurchaseToken.appAppleId;
      bundleId = decodedJWT.externalPurchaseToken.bundleId;
      if (
        decodedJWT.externalPurchaseToken.externalPurchaseId &&
        decodedJWT.externalPurchaseToken.externalPurchaseId.startsWith(
          "SANDBOX",
        )
      ) {
        environment = Environment.SANDBOX;
      } else {
        environment = Environment.PRODUCTION;
      }
    } else if (decodedJWT.appData) {
      appAppleId = decodedJWT.appData.appAppleId;
      bundleId = decodedJWT.appData.bundleId;
      environment = decodedJWT.appData.environment;
    }
    this.verifyNotification(bundleId, appAppleId, environment);
    return decodedJWT;
  }

  protected verifyNotification(
    bundleId?: string,
    appAppleId?: number,
    environment?: string,
  ) {
    if (
      this.bundleId !== bundleId ||
      (this.environment === Environment.PRODUCTION &&
        this.appAppleId !== appAppleId)
    ) {
      throw new VerificationException(
        VerificationStatus.INVALID_APP_IDENTIFIER,
      );
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
  async verifyAndDecodeAppTransaction(
    signedAppTransaction: string,
  ): Promise<AppTransaction> {
    const decodedAppTransaction: AppTransaction = await this.verifyJWT(
      signedAppTransaction,
      this.appTransactionValidator,
      (t) =>
        t.receiptCreationDate === undefined
          ? new Date()
          : new Date(t.receiptCreationDate),
    );
    const environment = decodedAppTransaction.receiptType;
    if (
      this.bundleId !== decodedAppTransaction.bundleId ||
      (this.environment === Environment.PRODUCTION &&
        this.appAppleId !== decodedAppTransaction.appAppleId)
    ) {
      throw new VerificationException(
        VerificationStatus.INVALID_APP_IDENTIFIER,
      );
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
  async verifyAndDecodeRealtimeRequest(
    signedPayload: string,
  ): Promise<DecodedRealtimeRequestBody> {
    const decodedRequest: DecodedRealtimeRequestBody = await this.verifyJWT(
      signedPayload,
      this.decodedRealtimeRequestBodyValidator,
      this.extractSignedDate,
    );
    if (
      this.environment === Environment.PRODUCTION &&
      this.appAppleId !== decodedRequest.appAppleId
    ) {
      throw new VerificationException(
        VerificationStatus.INVALID_APP_IDENTIFIER,
      );
    }
    if (this.environment !== decodedRequest.environment) {
      throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
    }
    return decodedRequest;
  }

  protected async verifyJWT<T>(
    jwt: string,
    validator: Validator<T>,
    signedDateExtractor: (decodedJWT: T) => Date,
  ): Promise<T> {
    try {
      // 1. Decode without verification
      const decodedJWT = jose.decodeJwt(jwt) as T;

      // 2. Schema validation
      if (!validator.validate(decodedJWT)) {
        throw new VerificationException(VerificationStatus.FAILURE);
      }

      // 3. Skip verification in local/test environments
      if (
        this.environment === Environment.XCODE ||
        this.environment === Environment.LOCAL_TESTING
      ) {
        return decodedJWT;
      }

      // 4. JWKS verification (Apple)
      const JWKS = jose.createRemoteJWKSet(
        new URL("https://appleid.apple.com/auth/keys"),
      );

      const { payload } = await jose.jwtVerify(jwt, JWKS, {
        issuer: "https://appleid.apple.com",
        audience: this.bundleId,
      });

      const verifiedJWT = payload as T;

      // 5. Date validation (kept from your logic)
      const effectiveDate = signedDateExtractor(verifiedJWT);

      if (effectiveDate.getTime() > Date.now() + MAX_SKEW) {
        throw new VerificationException(VerificationStatus.FAILURE);
      }

      return verifiedJWT;
    } catch (error) {
      if (error instanceof VerificationException) {
        throw error;
      }

      // JOSE error handling (clean + minimal)
      throw new VerificationException(
        VerificationStatus.VERIFICATION_FAILURE,
        error instanceof Error ? error : undefined,
      );
    }
  }

  private extractSignedDate(decodedJWT: DecodedSignedData): Date {
    return decodedJWT.signedDate === undefined
      ? new Date()
      : new Date(decodedJWT.signedDate);
  }
}

export enum VerificationStatus {
  OK,
  VERIFICATION_FAILURE,
  RETRYABLE_VERIFICATION_FAILURE,
  INVALID_APP_IDENTIFIER,
  INVALID_ENVIRONMENT,
  INVALID_CHAIN_LENGTH,
  INVALID_CERTIFICATE,
  FAILURE,
}

export class VerificationException extends Error {
  status: VerificationStatus;
  cause?: Error;

  constructor(status: VerificationStatus, cause?: Error) {
    super();
    this.status = status;
    this.cause = cause;
  }
}

// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { CheckTestNotificationResponseValidator, } from "./models/CheckTestNotificationResponse";
import { DefaultConfigurationResponseValidator, } from "./models/DefaultConfigurationResponse";
import { Environment } from "./models/Environment";
import { ExtendRenewalDateResponseValidator, } from "./models/ExtendRenewalDateResponse";
import { GetImageListResponseValidator, } from "./models/GetImageListResponse";
import { GetMessageListResponseValidator, } from "./models/GetMessageListResponse";
import { HistoryResponseValidator, } from "./models/HistoryResponse";
import { MassExtendRenewalDateResponseValidator, } from "./models/MassExtendRenewalDateResponse";
import { MassExtendRenewalDateStatusResponseValidator, } from "./models/MassExtendRenewalDateStatusResponse";
import { OrderLookupResponseValidator, } from "./models/OrderLookupResponse";
import { RefundHistoryResponseValidator, } from "./models/RefundHistoryResponse";
import { SendTestNotificationResponseValidator, } from "./models/SendTestNotificationResponse";
import { StatusResponseValidator, } from "./models/StatusResponse";
import { TransactionInfoResponseValidator, } from "./models/TransactionInfoResponse";
import { PerformanceTestResponseValidator, } from "./models/PerformanceTestResponse";
import { PerformanceTestResultResponseValidator, } from "./models/PerformanceTestResultResponse";
import { RealtimeUrlResponseValidator, } from "./models/RealtimeUrlResponse";
export { SignedDataVerifier, VerificationException, VerificationStatus, } from "./jws_verification";
export { ReceiptUtility } from "./receipt_utility";
export { AccountTenure } from "./models/AccountTenure";
export { AutoRenewStatus } from "./models/AutoRenewStatus";
export { ConsumptionStatus } from "./models/ConsumptionStatus";
export { DeliveryStatus } from "./models/DeliveryStatus";
export { DeliveryStatusV1 } from "./models/DeliveryStatusV1";
export { Environment } from "./models/Environment";
export { ExpirationIntent } from "./models/ExpirationIntent";
export { ExtendReasonCode } from "./models/ExtendReasonCode";
export { HeaderPosition } from "./models/HeaderPosition";
export { SendAttemptResult } from "./models/SendAttemptResult";
export { ImageState } from "./models/ImageState";
export { ImageSize } from "./models/ImageSize";
export { InAppOwnershipType } from "./models/InAppOwnershipType";
export { LifetimeDollarsPurchased } from "./models/LifetimeDollarsPurchased";
export { LifetimeDollarsRefunded } from "./models/LifetimeDollarsRefunded";
export { MessageState } from "./models/MessageState";
export { NotificationTypeV2 } from "./models/NotificationTypeV2";
export { OfferType } from "./models/OfferType";
export { OfferDiscountType } from "./models/OfferDiscountType";
export { OrderLookupStatus } from "./models/OrderLookupStatus";
export { PerformanceTestStatus } from "./models/PerformanceTestStatus";
export { Platform } from "./models/Platform";
export { PlayTime } from "./models/PlayTime";
export { PriceIncreaseStatus } from "./models/PriceIncreaseStatus";
export { PurchasePlatform } from "./models/PurchasePlatform";
export { RefundPreference } from "./models/RefundPreference";
export { RefundPreferenceV1 } from "./models/RefundPreferenceV1";
export { RevocationType } from "./models/RevocationType";
export { RevocationReason } from "./models/RevocationReason";
export { Status } from "./models/Status";
export { Subtype } from "./models/Subtype";
export { Order, ProductType, } from "./models/TransactionHistoryRequest";
export { TransactionReason } from "./models/TransactionReason";
export { Type } from "./models/Type";
export { UserStatus } from "./models/UserStatus";
export { PromotionalOfferSignatureCreator } from "./promotional_offer";
export { PromotionalOfferV2SignatureCreator, AdvancedCommerceInAppSignatureCreator, IntroductoryOfferEligibilitySignatureCreator, } from "./jws_signature_creator";
export { AdvancedCommerceReason } from "./models/AdvancedCommerceReason";
export { AdvancedCommerceEffective } from "./models/AdvancedCommerceEffective";
export { AdvancedCommercePeriod } from "./models/AdvancedCommercePeriod";
export { AdvancedCommerceOfferPeriod } from "./models/AdvancedCommerceOfferPeriod";
export { AdvancedCommerceOfferReason } from "./models/AdvancedCommerceOfferReason";
export { AdvancedCommerceRefundReason } from "./models/AdvancedCommerceRefundReason";
export { AdvancedCommerceRefundType } from "./models/AdvancedCommerceRefundType";
export { AdvancedCommercePriceIncreaseInfoStatus } from "./models/AdvancedCommercePriceIncreaseInfoStatus";
export { BillingPlanType } from "./models/BillingPlanType";
export { RenewalBillingPlanType } from "./models/RenewalBillingPlanType";
import * as jose from "jose";
import { AppTransactionInfoResponseValidator, } from "./models/AppTransactionInfoResponse";
import { NotificationHistoryResponseValidator, } from "./models/NotificationHistoryResponse";
import { URLSearchParams } from "url";
export class AppStoreServerAPIClient {
    static PRODUCTION_URL = "https://api.storekit.apple.com";
    static SANDBOX_URL = "https://api.storekit-sandbox.apple.com";
    static LOCAL_TESTING_URL = "https://local-testing-base-url";
    static USER_AGENT = "app-store-server-library/node/3.1.0";
    issuerId;
    keyId;
    signingKey;
    bundleId;
    urlBase;
    /**
     * Create an App Store Server API client
     * @param signingKey Your private key downloaded from App Store Connect
     * @param keyId Your private key ID from App Store Connect
     * @param issuerId Your issuer ID from the Keys page in App Store Connect
     * @param bundleId Your app’s bundle ID
     * @param environment The environment to target
     */
    constructor(signingKey, keyId, issuerId, bundleId, environment) {
        this.issuerId = issuerId;
        this.keyId = keyId;
        this.bundleId = bundleId;
        this.signingKey = signingKey;
        switch (environment) {
            case Environment.XCODE:
                throw new Error("Xcode is not a supported environment for an AppStoreServerAPIClient");
            case Environment.PRODUCTION:
                this.urlBase = AppStoreServerAPIClient.PRODUCTION_URL;
                break;
            case Environment.LOCAL_TESTING:
                this.urlBase = AppStoreServerAPIClient.LOCAL_TESTING_URL;
                break;
            case Environment.SANDBOX:
                this.urlBase = AppStoreServerAPIClient.SANDBOX_URL;
                break;
        }
    }
    async makeRequest(path, method, queryParameters, body, validator, contentType) {
        const headers = {
            "User-Agent": AppStoreServerAPIClient.USER_AGENT,
            Authorization: "Bearer " + (await this.createBearerToken()),
            Accept: "application/json",
        };
        const parsedQueryParameters = new URLSearchParams();
        for (const queryParam in queryParameters) {
            for (const queryVal of queryParameters[queryParam]) {
                parsedQueryParameters.append(queryParam, queryVal);
            }
        }
        let requestBody = undefined;
        if (body instanceof Buffer) {
            requestBody = body;
            if (contentType) {
                headers["Content-Type"] = contentType;
            }
        }
        else if (body != null) {
            requestBody = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }
        const response = await this.makeFetchRequest(path, parsedQueryParameters, method, requestBody, headers);
        if (response.ok) {
            // Success
            if (validator == null) {
                return null;
            }
            const responseBody = await response.json();
            if (!validator.validate(responseBody)) {
                throw new Error("Unexpected response body format");
            }
            return responseBody;
        }
        try {
            const responseBody = await response.json();
            const errorCode = responseBody["errorCode"];
            const errorMessage = responseBody["errorMessage"];
            if (errorCode) {
                throw new APIException(response.status, errorCode, errorMessage);
            }
            throw new APIException(response.status);
        }
        catch (e) {
            if (e instanceof APIException) {
                throw e;
            }
            throw new APIException(response.status);
        }
    }
    async makeFetchRequest(path, parsedQueryParameters, method, requestBody, headers) {
        return await fetch(this.urlBase + path + "?" + parsedQueryParameters, {
            method: method,
            body: requestBody,
            headers: headers,
        });
    }
    /**
     * Uses a subscription’s product identifier to extend the renewal date for all of its eligible active subscribers.
     *
     * @param massExtendRenewalDateRequest The request body for extending a subscription renewal date for all of its active subscribers.
     * @return A response that indicates the server successfully received the subscription-renewal-date extension request.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/extend_subscription_renewal_dates_for_all_active_subscribers Extend Subscription Renewal Dates for All Active Subscribers}
     */
    async extendRenewalDateForAllActiveSubscribers(massExtendRenewalDateRequest) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/mass", "POST", {}, massExtendRenewalDateRequest, new MassExtendRenewalDateResponseValidator(), "application/json");
    }
    /**
     * Extends the renewal date of a customer’s active subscription using the original transaction identifier.
     *
     * @param originalTransactionId    The original transaction identifier of the subscription receiving a renewal date extension.
     * @param extendRenewalDateRequest The request body containing subscription-renewal-extension data.
     * @return A response that indicates whether an individual renewal-date extension succeeded, and related details.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/extend_a_subscription_renewal_date Extend a Subscription Renewal Date}
     */
    async extendSubscriptionRenewalDate(originalTransactionId, extendRenewalDateRequest) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/" + originalTransactionId, "PUT", {}, extendRenewalDateRequest, new ExtendRenewalDateResponseValidator(), "application/json");
    }
    /**
     * Get the statuses for all of a customer’s auto-renewable subscriptions in your app.
     *
     * @param anyTransactionId Any transactionId, originalTransactionId, or appTransactionId that belongs to the customer for your app.
     * @param status An optional filter that indicates the status of subscriptions to include in the response. Your query may specify more than one status query parameter.
     * @return A response that contains status information for all of a customer’s auto-renewable subscriptions in your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_all_subscription_statuses Get All Subscription Statuses}
     */
    async getAllSubscriptionStatuses(anyTransactionId, status = undefined) {
        const queryParameters = {};
        if (status != null) {
            queryParameters["status"] = status.map((s) => s.toString());
        }
        return await this.makeRequest("/inApps/v1/subscriptions/" + anyTransactionId, "GET", queryParameters, null, new StatusResponseValidator(), undefined);
    }
    /**
     * Get a paginated list of all of a customer’s refunded in-app purchases for your app.
     *
     * @param anyTransactionId Any transactionId, originalTransactionId, or appTransactionId that belongs to the customer for your app.
     * @param revision              A token you provide to get the next set of up to 20 transactions. All responses include a revision token. Use the revision token from the previous RefundHistoryResponse.
     * @return A response that contains status information for all of a customer’s auto-renewable subscriptions in your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_refund_history Get Refund History}
     */
    async getRefundHistory(anyTransactionId, revision) {
        const queryParameters = {};
        if (revision !== null) {
            queryParameters["revision"] = [revision];
        }
        return await this.makeRequest("/inApps/v2/refund/lookup/" + anyTransactionId, "GET", queryParameters, null, new RefundHistoryResponseValidator(), undefined);
    }
    /**
     * Checks whether a renewal date extension request completed, and provides the final count of successful or failed extensions.
     *
     * @param requestIdentifier The UUID that represents your request to the Extend Subscription Renewal Dates for All Active Subscribers endpoint.
     * @param productId         The product identifier of the auto-renewable subscription that you request a renewal-date extension for.
     * @return A response that indicates the current status of a request to extend the subscription renewal date to all eligible subscribers.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_status_of_subscription_renewal_date_extensions Get Status of Subscription Renewal Date Extensions}
     */
    async getStatusOfSubscriptionRenewalDateExtensions(requestIdentifier, productId) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/mass/" +
            productId +
            "/" +
            requestIdentifier, "GET", {}, null, new MassExtendRenewalDateStatusResponseValidator(), undefined);
    }
    /**
     * Check the status of the test App Store server notification sent to your server.
     *
     * @param testNotificationToken The test notification token received from the Request a Test Notification endpoint
     * @return A response that contains the contents of the test notification sent by the App Store server and the result from your server.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_test_notification_status Get Test Notification Status}
     */
    async getTestNotificationStatus(testNotificationToken) {
        return await this.makeRequest("/inApps/v1/notifications/test/" + testNotificationToken, "GET", {}, null, new CheckTestNotificationResponseValidator(), undefined);
    }
    /**
     * Get a list of notifications that the App Store server attempted to send to your server.
     *
     * @param paginationToken An optional token you use to get the next set of up to 20 notification history records. All responses that have more records available include a paginationToken. Omit this parameter the first time you call this endpoint.
     * @param notificationHistoryRequest The request body that includes the start and end dates, and optional query constraints.
     * @return A response that contains the App Store Server Notifications history for your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_notification_history Get Notification History}
     */
    async getNotificationHistory(paginationToken, notificationHistoryRequest) {
        const queryParameters = {};
        if (paginationToken != null) {
            queryParameters["paginationToken"] = [paginationToken];
        }
        return await this.makeRequest("/inApps/v1/notifications/history", "POST", queryParameters, notificationHistoryRequest, new NotificationHistoryResponseValidator(), "application/json");
    }
    /**
     * Get a customer’s in-app purchase transaction history for your app.
     *
     * @param anyTransactionId Any transactionId, originalTransactionId, or appTransactionId that belongs to the customer for your app.
     * @param revision              A token you provide to get the next set of up to 20 transactions. All responses include a revision token. Note: For requests that use the revision token, include the same query parameters from the initial request. Use the revision token from the previous HistoryResponse.
     * @param version The version of the Get Transaction History endpoint to use. V2 is recommended.
     * @return A response that contains the customer’s transaction history for an app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_history Get Transaction History}
     */
    async getTransactionHistory(anyTransactionId, revision, transactionHistoryRequest, version = GetTransactionHistoryVersion.V1) {
        const queryParameters = {};
        if (revision != null) {
            queryParameters["revision"] = [revision];
        }
        if (transactionHistoryRequest.startDate) {
            queryParameters["startDate"] = [
                transactionHistoryRequest.startDate.toString(),
            ];
        }
        if (transactionHistoryRequest.endDate) {
            queryParameters["endDate"] = [
                transactionHistoryRequest.endDate.toString(),
            ];
        }
        if (transactionHistoryRequest.productIds) {
            queryParameters["productId"] = transactionHistoryRequest.productIds;
        }
        if (transactionHistoryRequest.productTypes) {
            queryParameters["productType"] = transactionHistoryRequest.productTypes;
        }
        if (transactionHistoryRequest.sort) {
            queryParameters["sort"] = [transactionHistoryRequest.sort];
        }
        if (transactionHistoryRequest.subscriptionGroupIdentifiers) {
            queryParameters["subscriptionGroupIdentifier"] =
                transactionHistoryRequest.subscriptionGroupIdentifiers;
        }
        if (transactionHistoryRequest.inAppOwnershipType) {
            queryParameters["inAppOwnershipType"] = [
                transactionHistoryRequest.inAppOwnershipType,
            ];
        }
        if (transactionHistoryRequest.revoked !== undefined) {
            queryParameters["revoked"] = [
                transactionHistoryRequest.revoked.toString(),
            ];
        }
        return await this.makeRequest("/inApps/" + version + "/history/" + anyTransactionId, "GET", queryParameters, null, new HistoryResponseValidator(), undefined);
    }
    /**
     * Get information about a single transaction for your app.
     *
     * @param transactionId The identifier of a transaction that belongs to the customer, and which may be an original transaction identifier.
     * @return A response that contains signed transaction information for a single transaction.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_info Get Transaction Info}
     */
    async getTransactionInfo(transactionId) {
        return await this.makeRequest("/inApps/v1/transactions/" + transactionId, "GET", {}, null, new TransactionInfoResponseValidator(), undefined);
    }
    /**
     * Get a customer’s in-app purchases from a receipt using the order ID.
     *
     * @param orderId The order ID for in-app purchases that belong to the customer.
     * @return A response that includes the order lookup status and an array of signed transactions for the in-app purchases in the order.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/look_up_order_id Look Up Order ID}
     */
    async lookUpOrderId(orderId) {
        return await this.makeRequest("/inApps/v1/lookup/" + orderId, "GET", {}, null, new OrderLookupResponseValidator(), undefined);
    }
    /**
     * Ask App Store Server Notifications to send a test notification to your server.
     *
     * @return A response that contains the test notification token.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/request_a_test_notification Request a Test Notification}
     */
    async requestTestNotification() {
        return await this.makeRequest("/inApps/v1/notifications/test", "POST", {}, null, new SendTestNotificationResponseValidator(), undefined);
    }
    /**
     * Send consumption information about a consumable in-app purchase to the App Store after your server receives a consumption request notification.
     *
     * @param transactionId The transaction identifier for which you're providing consumption information. You receive this identifier in the CONSUMPTION_REQUEST notification the App Store sends to your server.
     * @param consumptionRequest    The request body containing consumption information.
     * @throws APIException If a response was returned indicating the request could not be processed
     * @deprecated Use {@link sendConsumptionInformation} instead
     * {@link https://developer.apple.com/documentation/appstoreserverapi/send-consumption-information-v1 Send Consumption Information}
     */
    async sendConsumptionData(transactionId, consumptionRequest) {
        await this.makeRequest("/inApps/v1/transactions/consumption/" + transactionId, "PUT", {}, consumptionRequest, null, "application/json");
    }
    /**
     * Send consumption information about an In-App Purchase to the App Store after your server receives a consumption request notification.
     *
     * @param transactionId The transaction identifier for which you're providing consumption information. You receive this identifier in the CONSUMPTION_REQUEST notification the App Store sends to your server's App Store Server Notifications V2 endpoint.
     * @param consumptionRequest The request body containing consumption information.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/send-consumption-information Send Consumption Information}
     */
    async sendConsumptionInformation(transactionId, consumptionRequest) {
        await this.makeRequest("/inApps/v2/transactions/consumption/" + transactionId, "PUT", {}, consumptionRequest, null, "application/json");
    }
    /**
     * Sets the app account token value for a purchase the customer makes outside your app, or updates its value in an existing transaction.
     *
     * @param originalTransactionId The original transaction identifier of the transaction to receive the app account token update.
     * @param updateAppAccountTokenRequest The request body that contains a valid app account token value.
     * @throws APIException If a response was returned indicating the request could not be processed.
     * {@link https://developer.apple.com/documentation/appstoreserverapi/set-app-account-token Set App Account Token}
     */
    async setAppAccountToken(originalTransactionId, updateAppAccountTokenRequest) {
        await this.makeRequest("/inApps/v1/transactions/" + originalTransactionId + "/appAccountToken", "PUT", {}, updateAppAccountTokenRequest, null, "application/json");
    }
    /**
     * Upload an image to use for retention messaging.
     *
     * @param imageIdentifier A UUID you provide to uniquely identify the image you upload. Must be lowercase.
     * @param image The image file to upload.
     * @param imageSize The size of the image you upload.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/upload-image Upload Image}
     */
    async uploadImage(imageIdentifier, image, imageSize) {
        const queryParameters = {};
        if (imageSize != null) {
            queryParameters["imageSize"] = [imageSize];
        }
        await this.makeRequest("/inApps/v1/messaging/image/" + imageIdentifier, "PUT", queryParameters, image, null, "image/png");
    }
    /**
     * Delete a previously uploaded image.
     *
     * @param imageIdentifier The identifier of the image to delete.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/delete-image Delete Image}
     */
    async deleteImage(imageIdentifier) {
        await this.makeRequest("/inApps/v1/messaging/image/" + imageIdentifier, "DELETE", {}, null, null, undefined);
    }
    /**
     * Get the image identifier and state for all uploaded images.
     *
     * @return A response that contains status information for all images.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/get-image-list Get Image List}
     */
    async getImageList() {
        return await this.makeRequest("/inApps/v1/messaging/image/list", "GET", {}, null, new GetImageListResponseValidator(), undefined);
    }
    /**
     * Upload a message to use for retention messaging.
     *
     * @param messageIdentifier A UUID you provide to uniquely identify the message you upload. Must be lowercase.
     * @param uploadMessageRequestBody The message text to upload.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/upload-message Upload Message}
     */
    async uploadMessage(messageIdentifier, uploadMessageRequestBody) {
        await this.makeRequest("/inApps/v1/messaging/message/" + messageIdentifier, "PUT", {}, uploadMessageRequestBody, null, "application/json");
    }
    /**
     * Delete a previously uploaded message.
     *
     * @param messageIdentifier The identifier of the message to delete.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/delete-message Delete Message}
     */
    async deleteMessage(messageIdentifier) {
        await this.makeRequest("/inApps/v1/messaging/message/" + messageIdentifier, "DELETE", {}, null, null, undefined);
    }
    /**
     * Get the message identifier and state of all uploaded messages.
     *
     * @return A response that contains status information for all messages.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/get-message-list Get Message List}
     */
    async getMessageList() {
        return await this.makeRequest("/inApps/v1/messaging/message/list", "GET", {}, null, new GetMessageListResponseValidator(), undefined);
    }
    /**
     * Configure a default message for a specific product in a specific locale.
     *
     * @param productId The product identifier for the default configuration.
     * @param locale The locale for the default configuration.
     * @param defaultConfigurationRequest The request body that includes the message identifier to configure as the default message.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/configure-default-message Configure Default Message}
     */
    async configureDefaultMessage(productId, locale, defaultConfigurationRequest) {
        await this.makeRequest("/inApps/v1/messaging/default/" + productId + "/" + locale, "PUT", {}, defaultConfigurationRequest, null, "application/json");
    }
    /**
     * Delete a default message for a product in a locale.
     *
     * @param productId The product ID of the default message configuration.
     * @param locale The locale of the default message configuration.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/delete-default-message Delete Default Message}
     */
    async deleteDefaultMessage(productId, locale) {
        await this.makeRequest("/inApps/v1/messaging/default/" + productId + "/" + locale, "DELETE", {}, null, null, undefined);
    }
    /**
     * Gets the default message for a specific product in a specific locale, if it’s configured.
     *
     * @param productId The product identifier of the message.
     * @param locale The locale of the message.
     * @return The response body that contains the default configuration information.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/get-default-message Get Default Message}
     */
    async getDefaultMessage(productId, locale) {
        return await this.makeRequest("/inApps/v1/messaging/default/" + productId + "/" + locale, "GET", {}, null, new DefaultConfigurationResponseValidator(), undefined);
    }
    /**
     * Configures the URL for your Get Retention Message endpoint in the sandbox and production environments.
     *
     * @param realtimeUrlRequest The request body that includes your endpoint’s URL.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/configure-realtime-url Configure Realtime URL}
     */
    async configureRealtimeURL(realtimeUrlRequest) {
        await this.makeRequest("/inApps/v1/messaging/realtime/url", "PUT", {}, realtimeUrlRequest, null, "application/json");
    }
    /**
     * Deletes the URL for your Get Retention Message endpoint, in the sandbox or production environments.
     *
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/delete-realtime-url Delete Realtime URL}
     */
    async deleteRealtimeURL() {
        await this.makeRequest("/inApps/v1/messaging/realtime/url", "DELETE", {}, null, null, undefined);
    }
    /**
     * Gets the URL for real-time messages that points to your Get Retention Message endpoint, which you previously configured.
     *
     * @return The response body that contains the URL for your Get Retention Message endpoint.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/get-realtime-url Get Realtime URL}
     */
    async getRealtimeURL() {
        return await this.makeRequest("/inApps/v1/messaging/realtime/url", "GET", {}, null, new RealtimeUrlResponseValidator(), undefined);
    }
    /**
     * Initiates a performance test of your Get Retention Message endpoint in the sandbox environment.
     *
     * @param performanceTestRequest The request body which specifies a transaction identifier of an In-App Purchase to use for this test.
     * @return The performance test response object.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/initiate-performance-test Initiate Performance Test}
     */
    async initiatePerformanceTest(performanceTestRequest) {
        return await this.makeRequest("/inApps/v1/messaging/performanceTest", "POST", {}, performanceTestRequest, new PerformanceTestResponseValidator(), "application/json");
    }
    /**
     * Gets the results of the performance test for the specified identifier.
     *
     * @param requestId The ID of the performance test to return, which you receive in the PerformanceTestResponse when you call Initiate Performance Test.
     * @return An object the API returns that describes the performance test results.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/retentionmessaging/get-performance-test-results Get Performance Test Results}
     */
    async getPerformanceTestResults(requestId) {
        return await this.makeRequest("/inApps/v1/messaging/performanceTest/result/" + requestId, "GET", {}, null, new PerformanceTestResultResponseValidator(), undefined);
    }
    /**
     * Get a customer's app transaction information for your app.
     *
     * @param anyTransactionId Any transactionId, originalTransactionId, or appTransactionId that belongs to the customer for your app.
     * @return A response that contains signed app transaction information for a customer.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get-app-transaction-info Get App Transaction Info}
     */
    async getAppTransactionInfo(anyTransactionId) {
        return await this.makeRequest("/inApps/v1/transactions/appTransactions/" + anyTransactionId, "GET", {}, null, new AppTransactionInfoResponseValidator(), undefined);
    }
    /**
     * Notifies the App Store server that your system has finished processing the customer's transaction.
     *
     * @param transactionId The transaction identifier of the transaction to mark as finished.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/finish-transaction Finish Transaction}
     */
    async finishTransaction(transactionId) {
        await this.makeRequest("/inApps/v1/transactions/" + transactionId + "/finish", "POST", {}, null, null, undefined);
    }
    async createBearerToken() {
        const payload = {
            bid: this.bundleId,
        };
        // return jsonwebtoken.sign(payload, this.signingKey, {
        //   algorithm: "ES256",
        //   keyid: this.keyId,
        //   issuer: this.issuerId,
        //   audience: "appstoreconnect-v1",
        //   expiresIn: "5m",
        // });
        const key = await jose.importPKCS8(this.signingKey, "ES256");
        return await new jose.SignJWT(payload)
            .setProtectedHeader({
            alg: "ES256",
            kid: this.keyId,
            typ: "JWT",
        })
            .setIssuer(this.issuerId)
            .setAudience("appstoreconnect-v1")
            .setIssuedAt()
            .setExpirationTime("5m")
            .sign(key);
    }
}
export class APIException extends Error {
    httpStatusCode;
    apiError;
    errorMessage;
    constructor(httpStatusCode, apiError = null, errorMessage = null) {
        super();
        this.httpStatusCode = httpStatusCode;
        this.apiError = apiError;
        this.errorMessage = errorMessage;
    }
}
/**
 * Error codes that App Store Server API responses return.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/error_codes Error codes}
 */
export var APIError;
(function (APIError) {
    /**
     * An error that indicates an invalid request.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalbadrequesterror GeneralBadRequestError}
     */
    APIError[APIError["GENERAL_BAD_REQUEST"] = 4000000] = "GENERAL_BAD_REQUEST";
    /**
     * An error that indicates an invalid app identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidappidentifiererror InvalidAppIdentifierError}
     */
    APIError[APIError["INVALID_APP_IDENTIFIER"] = 4000002] = "INVALID_APP_IDENTIFIER";
    /**
     * An error that indicates an invalid request revision.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrequestrevisionerror InvalidRequestRevisionError}
     */
    APIError[APIError["INVALID_REQUEST_REVISION"] = 4000005] = "INVALID_REQUEST_REVISION";
    /**
     * An error that indicates an invalid transaction identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactioniderror InvalidTransactionIdError}
     */
    APIError[APIError["INVALID_TRANSACTION_ID"] = 4000006] = "INVALID_TRANSACTION_ID";
    /**
     * An error that indicates an invalid original transaction identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidoriginaltransactioniderror InvalidOriginalTransactionIdError}
     */
    APIError[APIError["INVALID_ORIGINAL_TRANSACTION_ID"] = 4000008] = "INVALID_ORIGINAL_TRANSACTION_ID";
    /**
     * An error that indicates an invalid extend-by-days value.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidextendbydayserror InvalidExtendByDaysError}
     */
    APIError[APIError["INVALID_EXTEND_BY_DAYS"] = 4000009] = "INVALID_EXTEND_BY_DAYS";
    /**
     * An error that indicates an invalid reason code.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidextendreasoncodeerror InvalidExtendReasonCodeError}
     */
    APIError[APIError["INVALID_EXTEND_REASON_CODE"] = 4000010] = "INVALID_EXTEND_REASON_CODE";
    /**
     * An error that indicates an invalid request identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrequestidentifiererror InvalidRequestIdentifierError}
     */
    APIError[APIError["INVALID_REQUEST_IDENTIFIER"] = 4000011] = "INVALID_REQUEST_IDENTIFIER";
    /**
     * An error that indicates that the start date is earlier than the earliest allowed date.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/startdatetoofarinpasterror StartDateTooFarInPastError}
     */
    APIError[APIError["START_DATE_TOO_FAR_IN_PAST"] = 4000012] = "START_DATE_TOO_FAR_IN_PAST";
    /**
     * An error that indicates that the end date precedes the start date, or the two dates are equal.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/startdateafterenddateerror StartDateAfterEndDateError}
     */
    APIError[APIError["START_DATE_AFTER_END_DATE"] = 4000013] = "START_DATE_AFTER_END_DATE";
    /**
     * An error that indicates the pagination token is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidpaginationtokenerror InvalidPaginationTokenError}
     */
    APIError[APIError["INVALID_PAGINATION_TOKEN"] = 4000014] = "INVALID_PAGINATION_TOKEN";
    /**
     * An error that indicates the start date is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstartdateerror InvalidStartDateError}
     */
    APIError[APIError["INVALID_START_DATE"] = 4000015] = "INVALID_START_DATE";
    /**
     * An error that indicates the end date is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidenddateerror InvalidEndDateError}
     */
    APIError[APIError["INVALID_END_DATE"] = 4000016] = "INVALID_END_DATE";
    /**
     * An error that indicates the pagination token expired.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/paginationtokenexpirederror PaginationTokenExpiredError}
     */
    APIError[APIError["PAGINATION_TOKEN_EXPIRED"] = 4000017] = "PAGINATION_TOKEN_EXPIRED";
    /**
     * An error that indicates the notification type or subtype is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidnotificationtypeerror InvalidNotificationTypeError}
     */
    APIError[APIError["INVALID_NOTIFICATION_TYPE"] = 4000018] = "INVALID_NOTIFICATION_TYPE";
    /**
     * An error that indicates the request is invalid because it has too many constraints applied.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/multiplefilterssuppliederror MultipleFiltersSuppliedError}
     */
    APIError[APIError["MULTIPLE_FILTERS_SUPPLIED"] = 4000019] = "MULTIPLE_FILTERS_SUPPLIED";
    /**
     * An error that indicates the test notification token is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtestnotificationtokenerror InvalidTestNotificationTokenError}
     */
    APIError[APIError["INVALID_TEST_NOTIFICATION_TOKEN"] = 4000020] = "INVALID_TEST_NOTIFICATION_TOKEN";
    /**
     * An error that indicates an invalid sort parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsorterror InvalidSortError}
     */
    APIError[APIError["INVALID_SORT"] = 4000021] = "INVALID_SORT";
    /**
     * An error that indicates an invalid product type parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidproducttypeerror InvalidProductTypeError}
     */
    APIError[APIError["INVALID_PRODUCT_TYPE"] = 4000022] = "INVALID_PRODUCT_TYPE";
    /**
     * An error that indicates the product ID parameter is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidproductiderror InvalidProductIdError}
     */
    APIError[APIError["INVALID_PRODUCT_ID"] = 4000023] = "INVALID_PRODUCT_ID";
    /**
     * An error that indicates an invalid subscription group identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsubscriptiongroupidentifiererror InvalidSubscriptionGroupIdentifierError}
     */
    APIError[APIError["INVALID_SUBSCRIPTION_GROUP_IDENTIFIER"] = 4000024] = "INVALID_SUBSCRIPTION_GROUP_IDENTIFIER";
    /**
     * An error that indicates the query parameter exclude-revoked is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidexcluderevokederror InvalidExcludeRevokedError}
     *
     * @deprecated
     */
    APIError[APIError["INVALID_EXCLUDE_REVOKED"] = 4000025] = "INVALID_EXCLUDE_REVOKED";
    /**
     * An error that indicates an invalid in-app ownership type parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidinappownershiptypeerror InvalidInAppOwnershipTypeError}
     */
    APIError[APIError["INVALID_IN_APP_OWNERSHIP_TYPE"] = 4000026] = "INVALID_IN_APP_OWNERSHIP_TYPE";
    /**
     * An error that indicates a required storefront country code is empty.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidemptystorefrontcountrycodelisterror InvalidEmptyStorefrontCountryCodeListError}
     */
    APIError[APIError["INVALID_EMPTY_STOREFRONT_COUNTRY_CODE_LIST"] = 4000027] = "INVALID_EMPTY_STOREFRONT_COUNTRY_CODE_LIST";
    /**
     * An error that indicates a storefront code is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstorefrontcountrycodeerror InvalidStorefrontCountryCodeError}
     */
    APIError[APIError["INVALID_STOREFRONT_COUNTRY_CODE"] = 4000028] = "INVALID_STOREFRONT_COUNTRY_CODE";
    /**
     * An error that indicates the revoked parameter contains an invalid value.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrevokederror InvalidRevokedError}
     */
    APIError[APIError["INVALID_REVOKED"] = 4000030] = "INVALID_REVOKED";
    /**
     * An error that indicates the status parameter is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstatuserror InvalidStatusError}
     */
    APIError[APIError["INVALID_STATUS"] = 4000031] = "INVALID_STATUS";
    /**
     * An error that indicates the value of the account tenure field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidaccounttenureerror InvalidAccountTenureError}
     */
    APIError[APIError["INVALID_ACCOUNT_TENURE"] = 4000032] = "INVALID_ACCOUNT_TENURE";
    /**
     * An error that indicates the value of the app account token field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidappaccounttokenerror InvalidAppAccountTokenError}
     */
    APIError[APIError["INVALID_APP_ACCOUNT_TOKEN"] = 4000033] = "INVALID_APP_ACCOUNT_TOKEN";
    /**
     * An error that indicates the value of the consumption status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidconsumptionstatuserror InvalidConsumptionStatusError}
     */
    APIError[APIError["INVALID_CONSUMPTION_STATUS"] = 4000034] = "INVALID_CONSUMPTION_STATUS";
    /**
     * An error that indicates the customer consented field is invalid or doesn’t indicate that the customer consented.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidcustomerconsentederror InvalidCustomerConsentedError}
     */
    APIError[APIError["INVALID_CUSTOMER_CONSENTED"] = 4000035] = "INVALID_CUSTOMER_CONSENTED";
    /**
     * An error that indicates the value in the delivery status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invaliddeliverystatuserror InvalidDeliveryStatusError}
     */
    APIError[APIError["INVALID_DELIVERY_STATUS"] = 4000036] = "INVALID_DELIVERY_STATUS";
    /**
     * An error that indicates the value in the lifetime dollars purchased field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidlifetimedollarspurchasederror InvalidLifetimeDollarsPurchasedError}
     */
    APIError[APIError["INVALID_LIFETIME_DOLLARS_PURCHASED"] = 4000037] = "INVALID_LIFETIME_DOLLARS_PURCHASED";
    /**
     * An error that indicates the value in the lifetime dollars refunded field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidlifetimedollarsrefundederror InvalidLifetimeDollarsRefundedError}
     */
    APIError[APIError["INVALID_LIFETIME_DOLLARS_REFUNDED"] = 4000038] = "INVALID_LIFETIME_DOLLARS_REFUNDED";
    /**
     * An error that indicates the value in the platform field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidplatformerror InvalidPlatformError}
     */
    APIError[APIError["INVALID_PLATFORM"] = 4000039] = "INVALID_PLATFORM";
    /**
     * An error that indicates the value in the playtime field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidplaytimeerror InvalidPlayTimeError}
     */
    APIError[APIError["INVALID_PLAY_TIME"] = 4000040] = "INVALID_PLAY_TIME";
    /**
     * An error that indicates the value in the sample content provided field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsamplecontentprovidederror InvalidSampleContentProvidedError}
     */
    APIError[APIError["INVALID_SAMPLE_CONTENT_PROVIDED"] = 4000041] = "INVALID_SAMPLE_CONTENT_PROVIDED";
    /**
     * An error that indicates the value in the user status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invaliduserstatuserror InvalidUserStatusError}
     */
    APIError[APIError["INVALID_USER_STATUS"] = 4000042] = "INVALID_USER_STATUS";
    /**
     * An error that indicates the transaction identifier doesn’t represent a consumable in-app purchase.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactionnotconsumableerror InvalidTransactionNotConsumableError}
     *
     * @deprecated
     */
    APIError[APIError["INVALID_TRANSACTION_NOT_CONSUMABLE"] = 4000043] = "INVALID_TRANSACTION_NOT_CONSUMABLE";
    /**
     * An error that indicates the transaction identifier represents an unsupported in-app purchase type.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactiontypenotsupportederror InvalidTransactionTypeNotSupportedError}
     */
    APIError[APIError["INVALID_TRANSACTION_TYPE_NOT_SUPPORTED"] = 4000047] = "INVALID_TRANSACTION_TYPE_NOT_SUPPORTED";
    /**
     * An error that indicates the endpoint doesn't support an app transaction ID.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/apptransactionidnotsupportederror AppTransactionIdNotSupportedError}
     */
    APIError[APIError["APP_TRANSACTION_ID_NOT_SUPPORTED_ERROR"] = 4000048] = "APP_TRANSACTION_ID_NOT_SUPPORTED_ERROR";
    /**
     * An error that indicates the image that's uploading is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/invalidimageerror InvalidImageError}
     */
    APIError[APIError["INVALID_IMAGE"] = 4000161] = "INVALID_IMAGE";
    /**
     * An error that indicates the header text is too long.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/headertoolongerror HeaderTooLongError}
     */
    APIError[APIError["HEADER_TOO_LONG"] = 4000162] = "HEADER_TOO_LONG";
    /**
     * An error that indicates the body text is too long.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/bodytoolongerror BodyTooLongError}
     */
    APIError[APIError["BODY_TOO_LONG"] = 4000163] = "BODY_TOO_LONG";
    /**
     * An error that indicates the locale is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/invalidlocaleerror InvalidLocaleError}
     */
    APIError[APIError["INVALID_LOCALE"] = 4000164] = "INVALID_LOCALE";
    /**
     * An error that indicates the alternative text for an image is too long.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/alttexttoolongerror AltTextTooLongError}
     */
    APIError[APIError["ALT_TEXT_TOO_LONG"] = 4000175] = "ALT_TEXT_TOO_LONG";
    /**
     * An error that indicates the app account token value is not a valid UUID.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidappaccounttokenuuiderror InvalidAppAccountTokenUUIDError}
     */
    APIError[APIError["INVALID_APP_ACCOUNT_TOKEN_UUID_ERROR"] = 4000183] = "INVALID_APP_ACCOUNT_TOKEN_UUID_ERROR";
    /**
     * An error that indicates the transaction is for a product the customer obtains through Family Sharing, which the endpoint doesn’t support.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/familytransactionnotsupportederror FamilyTransactionNotSupportedError}
     */
    APIError[APIError["FAMILY_TRANSACTION_NOT_SUPPORTED_ERROR"] = 4000185] = "FAMILY_TRANSACTION_NOT_SUPPORTED_ERROR";
    /**
     * An error that indicates the endpoint expects an original transaction identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/transactionidisnotoriginaltransactioniderror TransactionIdIsNotOriginalTransactionIdError}
     */
    APIError[APIError["TRANSACTION_ID_IS_NOT_ORIGINAL_TRANSACTION_ID_ERROR"] = 4000187] = "TRANSACTION_ID_IS_NOT_ORIGINAL_TRANSACTION_ID_ERROR";
    /**
     * An error the API returns that indicates the performance test request is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/invalidperformancetestrequesterror InvalidPerformanceTestRequestError}
     */
    APIError[APIError["INVALID_PERFORMANCE_TEST_REQUEST"] = 4000211] = "INVALID_PERFORMANCE_TEST_REQUEST";
    /**
     * An error that indicates the request ID is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/invalidrequestiderror InvalidRequestIdError}
     */
    APIError[APIError["INVALID_REQUEST_ID"] = 4000212] = "INVALID_REQUEST_ID";
    /**
     * An error that indicates an error with an existing test.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/existingperformancetestrunerror ExistingPerformanceTestRunError}
     */
    APIError[APIError["EXISTING_PERFORMANCE_TEST_RUN"] = 4000213] = "EXISTING_PERFORMANCE_TEST_RUN";
    /**
     * An error that indicates the URL is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/badrequestreaaltimeurlerror BadRequestRealtimeUrlError}
     */
    APIError[APIError["BAD_REQUEST_REALTIME_URL"] = 4000215] = "BAD_REQUEST_REALTIME_URL";
    /**
     * An error that indicates the image size provided is invalid.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/badrequestimagesizeerror BadRequestImageSizeError}
     */
    APIError[APIError["BAD_REQUEST_IMAGE_SIZE"] = 4000216] = "BAD_REQUEST_IMAGE_SIZE";
    /**
     * An error that indicates there are too many bullet points.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/badrequesttoomanybulletpointserror BadRequestTooManyBulletPointsError}
     */
    APIError[APIError["BAD_REQUEST_TOO_MANY_BULLET_POINTS"] = 4000218] = "BAD_REQUEST_TOO_MANY_BULLET_POINTS";
    /**
     * An error that indicates the text for a bullet point is too long.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/badrequestbulletpointtexttoolongerror BadRequestBulletPointTextTooLongError}
     */
    APIError[APIError["BAD_REQUEST_BULLET_POINT_TEXT_TOO_LONG"] = 4000219] = "BAD_REQUEST_BULLET_POINT_TEXT_TOO_LONG";
    /**
     * An error that indicates that no image object is included, but the request indicates that the header should be placed above the image.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/badrequestaboveimageerequiresanimageerror BadRequestAboveImageRequiresAnImageError}
     */
    APIError[APIError["BAD_REQUEST_ABOVE_IMAGE_REQUIRES_AN_IMAGE"] = 4000224] = "BAD_REQUEST_ABOVE_IMAGE_REQUIRES_AN_IMAGE";
    /**
     * An error that indicates the subscription doesn't qualify for a renewal-date extension due to its subscription state.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptionextensionineligibleerror SubscriptionExtensionIneligibleError}
     */
    APIError[APIError["SUBSCRIPTION_EXTENSION_INELIGIBLE"] = 4030004] = "SUBSCRIPTION_EXTENSION_INELIGIBLE";
    /**
     * An error that indicates the subscription doesn’t qualify for a renewal-date extension because it has already received the maximum extensions.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptionmaxextensionerror SubscriptionMaxExtensionError}
     */
    APIError[APIError["SUBSCRIPTION_MAX_EXTENSION"] = 4030005] = "SUBSCRIPTION_MAX_EXTENSION";
    /**
     * An error that indicates a subscription isn't directly eligible for a renewal date extension because the user obtained it through Family Sharing.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/familysharedsubscriptionextensionineligibleerror FamilySharedSubscriptionExtensionIneligibleError}
     */
    APIError[APIError["FAMILY_SHARED_SUBSCRIPTION_EXTENSION_INELIGIBLE"] = 4030007] = "FAMILY_SHARED_SUBSCRIPTION_EXTENSION_INELIGIBLE";
    /**
     * An error that indicates when you reach the maximum number of uploaded images.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/maximumnumberofimagesreachederror MaximumNumberOfImagesReachedError}
     */
    APIError[APIError["MAXIMUM_NUMBER_OF_IMAGES_REACHED"] = 4030014] = "MAXIMUM_NUMBER_OF_IMAGES_REACHED";
    /**
     * An error that indicates when you reach the maximum number of uploaded messages.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/maximumnumberofmessagesreachederror MaximumNumberOfMessagesReachedError}
     */
    APIError[APIError["MAXIMUM_NUMBER_OF_MESSAGES_REACHED"] = 4030016] = "MAXIMUM_NUMBER_OF_MESSAGES_REACHED";
    /**
     * An error that indicates the message isn't in the approved state, so you can't configure it as a default message.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/messagenotapprovederror MessageNotApprovedError}
     */
    APIError[APIError["MESSAGE_NOT_APPROVED"] = 4030017] = "MESSAGE_NOT_APPROVED";
    /**
     * An error that indicates the image isn't in the approved state, so you can't configure it as part of a default message.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/imagenotapprovederror ImageNotApprovedError}
     */
    APIError[APIError["IMAGE_NOT_APPROVED"] = 4030018] = "IMAGE_NOT_APPROVED";
    /**
     * An error that indicates the image is currently in use as part of a message, so you can't delete it.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/imageinuseerror ImageInUseError}
     */
    APIError[APIError["IMAGE_IN_USE"] = 4030019] = "IMAGE_IN_USE";
    /**
     * An error that indicates that passing a performance test is required before you can set a URL for the production environment.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/forbiddennopassingtesterror ForbiddenNoPassingTestError}
     */
    APIError[APIError["FORBIDDEN_NO_PASSING_TEST"] = 4030026] = "FORBIDDEN_NO_PASSING_TEST";
    /**
     * An error that indicates the App Store account wasn't found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/accountnotfounderror AccountNotFoundError}
     */
    APIError[APIError["ACCOUNT_NOT_FOUND"] = 4040001] = "ACCOUNT_NOT_FOUND";
    /**
     * An error response that indicates the App Store account wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/accountnotfoundretryableerror AccountNotFoundRetryableError}
     */
    APIError[APIError["ACCOUNT_NOT_FOUND_RETRYABLE"] = 4040002] = "ACCOUNT_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates the app wasn’t found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/appnotfounderror AppNotFoundError}
     */
    APIError[APIError["APP_NOT_FOUND"] = 4040003] = "APP_NOT_FOUND";
    /**
     * An error response that indicates the app wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/appnotfoundretryableerror AppNotFoundRetryableError}
     */
    APIError[APIError["APP_NOT_FOUND_RETRYABLE"] = 4040004] = "APP_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates an original transaction identifier wasn't found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/originaltransactionidnotfounderror OriginalTransactionIdNotFoundError}
     */
    APIError[APIError["ORIGINAL_TRANSACTION_ID_NOT_FOUND"] = 4040005] = "ORIGINAL_TRANSACTION_ID_NOT_FOUND";
    /**
     * An error response that indicates the original transaction identifier wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/originaltransactionidnotfoundretryableerror OriginalTransactionIdNotFoundRetryableError}
     */
    APIError[APIError["ORIGINAL_TRANSACTION_ID_NOT_FOUND_RETRYABLE"] = 4040006] = "ORIGINAL_TRANSACTION_ID_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates that the App Store server couldn’t find a notifications URL for your app in this environment.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/servernotificationurlnotfounderror ServerNotificationUrlNotFoundError}
     */
    APIError[APIError["SERVER_NOTIFICATION_URL_NOT_FOUND"] = 4040007] = "SERVER_NOTIFICATION_URL_NOT_FOUND";
    /**
     * An error that indicates that the test notification token is expired or the test notification status isn’t available.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/testnotificationnotfounderror TestNotificationNotFoundError}
     */
    APIError[APIError["TEST_NOTIFICATION_NOT_FOUND"] = 4040008] = "TEST_NOTIFICATION_NOT_FOUND";
    /**
     * An error that indicates the server didn't find a subscription-renewal-date extension request for the request identifier and product identifier you provided.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/statusrequestnotfounderror StatusRequestNotFoundError}
     */
    APIError[APIError["STATUS_REQUEST_NOT_FOUND"] = 4040009] = "STATUS_REQUEST_NOT_FOUND";
    /**
     * An error that indicates a transaction identifier wasn't found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/transactionidnotfounderror TransactionIdNotFoundError}
     */
    APIError[APIError["TRANSACTION_ID_NOT_FOUND"] = 4040010] = "TRANSACTION_ID_NOT_FOUND";
    /**
     * An error that indicates the system can't find the image identifier.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/imagenotfounderror ImageNotFoundError}
     */
    APIError[APIError["IMAGE_NOT_FOUND"] = 4040014] = "IMAGE_NOT_FOUND";
    /**
     * An error that indicates the system can't find the message identifier.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/messagenotfounderror MessageNotFoundError}
     */
    APIError[APIError["MESSAGE_NOT_FOUND"] = 4040015] = "MESSAGE_NOT_FOUND";
    /**
     * An error the API returns if the service can’t find the specified test run.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/performancetestrunnotfounderror PerformanceTestRunNotFoundError}
     */
    APIError[APIError["PERFORMANCE_TEST_RUN_NOT_FOUND"] = 4040018] = "PERFORMANCE_TEST_RUN_NOT_FOUND";
    /**
     * An error response that indicates an app transaction doesn’t exist for the specified customer.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/apptransactiondoesnotexisterror AppTransactionDoesNotExistError}
     */
    APIError[APIError["APP_TRANSACTION_DOES_NOT_EXIST_ERROR"] = 4040019] = "APP_TRANSACTION_DOES_NOT_EXIST_ERROR";
    /**
     * An error that indicates a default message isn’t configured.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/defaultmessagenotfounderror DefaultMessageNotFoundError}
     */
    APIError[APIError["DEFAULT_MESSAGE_NOT_FOUND"] = 4040020] = "DEFAULT_MESSAGE_NOT_FOUND";
    /**
     * An error that indicates that the URL for your endpoint isn’t configured.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/realtimeurlnotfounderror RealtimeUrlNotFoundError}
     */
    APIError[APIError["REALTIME_URL_NOT_FOUND"] = 4040021] = "REALTIME_URL_NOT_FOUND";
    /**
     * An error that indicates the image identifier already exists.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/imagealreadyexistserror ImageAlreadyExistsError}
     */
    APIError[APIError["IMAGE_ALREADY_EXISTS"] = 4090000] = "IMAGE_ALREADY_EXISTS";
    /**
     * An error that indicates the message identifier already exists.
     *
     * {@link https://developer.apple.com/documentation/retentionmessaging/messagealreadyexistserror MessageAlreadyExistsError}
     */
    APIError[APIError["MESSAGE_ALREADY_EXISTS"] = 4090001] = "MESSAGE_ALREADY_EXISTS";
    /**
     * An error that indicates that the request exceeded the rate limit.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/ratelimitexceedederror RateLimitExceededError}
     */
    APIError[APIError["RATE_LIMIT_EXCEEDED"] = 4290000] = "RATE_LIMIT_EXCEEDED";
    /**
     * An error that indicates a general internal error.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalinternalerror GeneralInternalError}
     */
    APIError[APIError["GENERAL_INTERNAL"] = 5000000] = "GENERAL_INTERNAL";
    /**
     * An error response that indicates an unknown error occurred, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalinternalretryableerror GeneralInternalRetryableError}
     */
    APIError[APIError["GENERAL_INTERNAL_RETRYABLE"] = 5000001] = "GENERAL_INTERNAL_RETRYABLE";
})(APIError || (APIError = {}));
export var GetTransactionHistoryVersion;
(function (GetTransactionHistoryVersion) {
    /**
     * @deprecated
     */
    GetTransactionHistoryVersion["V1"] = "v1";
    GetTransactionHistoryVersion["V2"] = "v2";
})(GetTransactionHistoryVersion || (GetTransactionHistoryVersion = {}));

// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceTransactionInfoValidator } from "./AdvancedCommerceTransactionInfo";
import { BillingPlanTypeValidator } from "./BillingPlanType";
import { EnvironmentValidator } from "./Environment";
import { InAppOwnershipTypeValidator } from "./InAppOwnershipType";
import { OfferDiscountTypeValidator } from "./OfferDiscountType";
import { OfferTypeValidator } from "./OfferType";
import { RevocationTypeValidator } from "./RevocationType";
import { RevocationReasonValidator } from "./RevocationReason";
import { TransactionCommitmentInfoValidator } from "./TransactionCommitmentInfo";
import { TransactionReasonValidator } from "./TransactionReason";
import { TypeValidator } from "./Type";
export class JWSTransactionDecodedPayloadValidator {
    static environmentValidator = new EnvironmentValidator();
    static offerTypeValidator = new OfferTypeValidator();
    static revocationReasonValidator = new RevocationReasonValidator();
    static revocationTypeValidator = new RevocationTypeValidator();
    static inAppOwnershipTypeValidator = new InAppOwnershipTypeValidator();
    static typeValidator = new TypeValidator();
    static transactionReasonValidator = new TransactionReasonValidator();
    static offerDiscountTypeValidator = new OfferDiscountTypeValidator();
    static billingPlanTypeValidator = new BillingPlanTypeValidator();
    static advancedCommerceTransactionInfoValidator = new AdvancedCommerceTransactionInfoValidator();
    static transactionCommitmentInfoValidator = new TransactionCommitmentInfoValidator();
    validate(obj) {
        if ((typeof obj['originalTransactionId'] !== 'undefined') && !(typeof obj['originalTransactionId'] === "string" || obj['originalTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['transactionId'] !== 'undefined') && !(typeof obj['transactionId'] === "string" || obj['transactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['webOrderLineItemId'] !== 'undefined') && !(typeof obj['webOrderLineItemId'] === "string" || obj['webOrderLineItemId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['productId'] !== 'undefined') && !(typeof obj['productId'] === "string" || obj['productId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['subscriptionGroupIdentifier'] !== 'undefined') && !(typeof obj['subscriptionGroupIdentifier'] === "string" || obj['subscriptionGroupIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['purchaseDate'] !== 'undefined') && !(typeof obj['purchaseDate'] === "number")) {
            return false;
        }
        if ((typeof obj['originalPurchaseDate'] !== 'undefined') && !(typeof obj['originalPurchaseDate'] === "number")) {
            return false;
        }
        if ((typeof obj['expiresDate'] !== 'undefined') && !(typeof obj['expiresDate'] === "number")) {
            return false;
        }
        if ((typeof obj['quantity'] !== 'undefined') && !(typeof obj['quantity'] === 'number')) {
            return false;
        }
        if ((typeof obj['type'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.typeValidator.validate(obj['type']))) {
            return false;
        }
        if ((typeof obj['appAccountToken'] !== 'undefined') && !(typeof obj['appAccountToken'] === "string" || obj['appAccountToken'] instanceof String)) {
            return false;
        }
        if ((typeof obj['inAppOwnershipType'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.inAppOwnershipTypeValidator.validate(obj['inAppOwnershipType']))) {
            return false;
        }
        if ((typeof obj['signedDate'] !== 'undefined') && !(typeof obj['signedDate'] === "number")) {
            return false;
        }
        if ((typeof obj['revocationReason'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.revocationReasonValidator.validate(obj['revocationReason']))) {
            return false;
        }
        if ((typeof obj['revocationDate'] !== 'undefined') && !(typeof obj['revocationDate'] === "number")) {
            return false;
        }
        if ((typeof obj['isUpgraded'] !== 'undefined') && !(typeof obj['isUpgraded'] === "boolean" || obj['isUpgraded'] instanceof Boolean)) {
            return false;
        }
        if ((typeof obj['offerType'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.offerTypeValidator.validate(obj['offerType']))) {
            return false;
        }
        if ((typeof obj['offerIdentifier'] !== 'undefined') && !(typeof obj['offerIdentifier'] === "string" || obj['offerIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['environment'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if ((typeof obj['storefrontId'] !== 'undefined') && !(typeof obj['storefrontId'] === "string" || obj['storefrontId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['transactionReason'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.transactionReasonValidator.validate(obj['transactionReason']))) {
            return false;
        }
        if ((typeof obj['currency'] !== 'undefined') && !(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if ((typeof obj['price'] !== 'undefined') && !(typeof obj['price'] === "number")) {
            return false;
        }
        if ((typeof obj['offerDiscountType'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.offerDiscountTypeValidator.validate(obj['offerDiscountType']))) {
            return false;
        }
        if ((typeof obj['appTransactionId'] !== 'undefined') && !(typeof obj['appTransactionId'] === "string" || obj['appTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['offerPeriod'] !== 'undefined') && !(typeof obj['offerPeriod'] === "string" || obj['offerPeriod'] instanceof String)) {
            return false;
        }
        if ((typeof obj['revocationType'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.revocationTypeValidator.validate(obj['revocationType']))) {
            return false;
        }
        if ((typeof obj['revocationPercentage'] !== 'undefined') && !(typeof obj['revocationPercentage'] === "number")) {
            return false;
        }
        if ((typeof obj['advancedCommerceInfo'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.advancedCommerceTransactionInfoValidator.validate(obj['advancedCommerceInfo']))) {
            return false;
        }
        if ((typeof obj['billingPlanType'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.billingPlanTypeValidator.validate(obj['billingPlanType']))) {
            return false;
        }
        if ((typeof obj['commitmentInfo'] !== 'undefined') && !(JWSTransactionDecodedPayloadValidator.transactionCommitmentInfoValidator.validate(obj['commitmentInfo']))) {
            return false;
        }
        return true;
    }
}

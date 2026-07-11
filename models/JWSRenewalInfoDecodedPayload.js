// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceRenewalInfoValidator } from "./AdvancedCommerceRenewalInfo";
import { AutoRenewStatusValidator } from "./AutoRenewStatus";
import { EnvironmentValidator } from "./Environment";
import { ExpirationIntentValidator } from "./ExpirationIntent";
import { OfferDiscountTypeValidator } from "./OfferDiscountType";
import { OfferTypeValidator } from "./OfferType";
import { PriceIncreaseStatusValidator } from "./PriceIncreaseStatus";
import { RenewalBillingPlanTypeValidator } from "./RenewalBillingPlanType";
import { RenewalCommitmentInfoValidator } from "./RenewalCommitmentInfo";
export class JWSRenewalInfoDecodedPayloadValidator {
    static environmentValidator = new EnvironmentValidator();
    static offerTypeValidator = new OfferTypeValidator();
    static priceIncreaseStatusValidator = new PriceIncreaseStatusValidator();
    static autoRenewStatusValidator = new AutoRenewStatusValidator();
    static expirationIntentValidator = new ExpirationIntentValidator();
    static offerDiscountTypeValidator = new OfferDiscountTypeValidator();
    static renewalBillingPlanTypeValidator = new RenewalBillingPlanTypeValidator();
    static advancedCommerceRenewalInfoValidator = new AdvancedCommerceRenewalInfoValidator();
    static renewalCommitmentInfoValidator = new RenewalCommitmentInfoValidator();
    validate(obj) {
        if ((typeof obj['expirationIntent'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.expirationIntentValidator.validate(obj['expirationIntent']))) {
            return false;
        }
        if ((typeof obj['originalTransactionId'] !== 'undefined') && !(typeof obj['originalTransactionId'] === "string" || obj['originalTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['autoRenewProductId'] !== 'undefined') && !(typeof obj['autoRenewProductId'] === "string" || obj['autoRenewProductId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['productId'] !== 'undefined') && !(typeof obj['productId'] === "string" || obj['productId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['autoRenewStatus'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.autoRenewStatusValidator.validate(obj['autoRenewStatus']))) {
            return false;
        }
        if ((typeof obj['isInBillingRetryPeriod'] !== 'undefined') && !(typeof obj['isInBillingRetryPeriod'] === "boolean" || obj['isInBillingRetryPeriod'] instanceof Boolean)) {
            return false;
        }
        if ((typeof obj['priceIncreaseStatus'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.priceIncreaseStatusValidator.validate(obj['priceIncreaseStatus']))) {
            return false;
        }
        if ((typeof obj['gracePeriodExpiresDate'] !== 'undefined') && !(typeof obj['gracePeriodExpiresDate'] === "number")) {
            return false;
        }
        if ((typeof obj['offerType'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.offerTypeValidator.validate(obj['offerType']))) {
            return false;
        }
        if ((typeof obj['offerIdentifier'] !== 'undefined') && !(typeof obj['offerIdentifier'] === "string" || obj['offerIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedDate'] !== 'undefined') && !(typeof obj['signedDate'] === "number")) {
            return false;
        }
        if ((typeof obj['environment'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['recentSubscriptionStartDate'] !== 'undefined') && !(typeof obj['recentSubscriptionStartDate'] === 'number')) {
            return false;
        }
        if ((typeof obj['renewalDate'] !== 'undefined') && !(typeof obj['renewalDate'] === 'number')) {
            return false;
        }
        if ((typeof obj['currency'] !== 'undefined') && !(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if ((typeof obj['renewalPrice'] !== 'undefined') && !(typeof obj['renewalPrice'] === "number")) {
            return false;
        }
        if ((typeof obj['offerDiscountType'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.offerDiscountTypeValidator.validate(obj['offerDiscountType']))) {
            return false;
        }
        if (typeof obj['eligibleWinBackOfferIds'] !== 'undefined') {
            if (!Array.isArray(obj['eligibleWinBackOfferIds'])) {
                return false;
            }
            for (const eligibleWinBackOfferId of obj['eligibleWinBackOfferIds']) {
                if (!(typeof eligibleWinBackOfferId === "string" || eligibleWinBackOfferId instanceof String)) {
                    return false;
                }
            }
        }
        if ((typeof obj['appAccountToken'] !== 'undefined') && !(typeof obj['appAccountToken'] === "string" || obj['appAccountToken'] instanceof String)) {
            return false;
        }
        if ((typeof obj['appTransactionId'] !== 'undefined') && !(typeof obj['appTransactionId'] === "string" || obj['appTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['offerPeriod'] !== 'undefined') && !(typeof obj['offerPeriod'] === "string" || obj['offerPeriod'] instanceof String)) {
            return false;
        }
        if ((typeof obj['advancedCommerceInfo'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.advancedCommerceRenewalInfoValidator.validate(obj['advancedCommerceInfo']))) {
            return false;
        }
        if ((typeof obj['commitmentInfo'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.renewalCommitmentInfoValidator.validate(obj['commitmentInfo']))) {
            return false;
        }
        if ((typeof obj['renewalBillingPlanType'] !== 'undefined') && !(JWSRenewalInfoDecodedPayloadValidator.renewalBillingPlanTypeValidator.validate(obj['renewalBillingPlanType']))) {
            return false;
        }
        return true;
    }
}

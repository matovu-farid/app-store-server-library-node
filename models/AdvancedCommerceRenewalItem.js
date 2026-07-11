// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceOfferValidator } from "./AdvancedCommerceOffer";
import { AdvancedCommercePriceIncreaseInfoValidator } from "./AdvancedCommercePriceIncreaseInfo";
export class AdvancedCommerceRenewalItemValidator {
    static offerValidator = new AdvancedCommerceOfferValidator();
    static priceIncreaseInfoValidator = new AdvancedCommercePriceIncreaseInfoValidator();
    validate(obj) {
        if ((typeof obj['SKU'] !== 'undefined') && !(typeof obj['SKU'] === "string" || obj['SKU'] instanceof String)) {
            return false;
        }
        if ((typeof obj['description'] !== 'undefined') && !(typeof obj['description'] === "string" || obj['description'] instanceof String)) {
            return false;
        }
        if ((typeof obj['displayName'] !== 'undefined') && !(typeof obj['displayName'] === "string" || obj['displayName'] instanceof String)) {
            return false;
        }
        if ((typeof obj['offer'] !== 'undefined') && !(AdvancedCommerceRenewalItemValidator.offerValidator.validate(obj['offer']))) {
            return false;
        }
        if ((typeof obj['price'] !== 'undefined') && !(typeof obj['price'] === "number")) {
            return false;
        }
        if ((typeof obj['priceIncreaseInfo'] !== 'undefined') && !(AdvancedCommerceRenewalItemValidator.priceIncreaseInfoValidator.validate(obj['priceIncreaseInfo']))) {
            return false;
        }
        return true;
    }
}

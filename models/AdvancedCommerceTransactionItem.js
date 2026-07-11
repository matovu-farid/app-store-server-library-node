// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceOfferValidator } from "./AdvancedCommerceOffer";
import { AdvancedCommerceRefundValidator } from "./AdvancedCommerceRefund";
export class AdvancedCommerceTransactionItemValidator {
    static offerValidator = new AdvancedCommerceOfferValidator();
    static refundValidator = new AdvancedCommerceRefundValidator();
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
        if ((typeof obj['offer'] !== 'undefined') && !(AdvancedCommerceTransactionItemValidator.offerValidator.validate(obj['offer']))) {
            return false;
        }
        if ((typeof obj['price'] !== 'undefined') && !(typeof obj['price'] === "number")) {
            return false;
        }
        if (typeof obj['refunds'] !== 'undefined') {
            if (!Array.isArray(obj['refunds'])) {
                return false;
            }
            for (const refund of obj['refunds']) {
                if (!(AdvancedCommerceTransactionItemValidator.refundValidator.validate(refund))) {
                    return false;
                }
            }
        }
        if ((typeof obj['revocationDate'] !== 'undefined') && !(typeof obj['revocationDate'] === "number")) {
            return false;
        }
        return true;
    }
}

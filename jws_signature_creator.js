// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import * as jose from "jose";
import { randomUUID } from "crypto";
class BaseSignatureCreator {
    audience;
    signingKey;
    keyId;
    issuerId;
    bundleId;
    constructor(audience, signingKey, keyId, issuerId, bundleId) {
        this.audience = audience;
        this.issuerId = issuerId;
        this.keyId = keyId;
        this.bundleId = bundleId;
        this.signingKey = signingKey;
    }
    async internalCreateSignature(featureSpecificClaims) {
        var claims = featureSpecificClaims;
        claims["bid"] = this.bundleId;
        claims["nonce"] = randomUUID();
        // return jsonwebtoken.sign(claims, this.signingKey, {
        //   algorithm: "ES256",
        //   keyid: this.keyId,
        //   issuer: this.issuerId,
        //   audience: this.audience,
        // });
        const key = await jose.importPKCS8(this.signingKey, "ES256");
        return await new jose.SignJWT(claims)
            .setProtectedHeader({
            alg: "ES256",
            kid: this.keyId,
        })
            .setIssuer(this.issuerId)
            .setAudience(this.audience)
            .setIssuedAt()
            .sign(key);
    }
}
export class PromotionalOfferV2SignatureCreator extends BaseSignatureCreator {
    /**
     * Create a PromotionalOfferV2SignatureCreator
     *
     * @param signingKey Your private key downloaded from App Store Connect
     * @param keyId Your private key ID from App Store Connect
     * @param issuerId Your issuer ID from the Keys page in App Store Connect
     * @param bundleId Your app's bundle ID
     */
    constructor(signingKey, keyId, issuerId, bundleId) {
        super("promotional-offer", signingKey, keyId, issuerId, bundleId);
    }
    /**
     * Create a promotional offer V2 signature.
     *
     * @param productId The unique identifier of the product
     * @param offerIdentifier The promotional offer identifier that you set up in App Store Connect
     * @param transactionId The unique identifier of any transaction that belongs to the customer. You can use the customer's appTransactionId, even for customers who haven't made any In-App Purchases in your app. This field is optional, but recommended.
     * @return The signed JWS.
     * {@link https://developer.apple.com/documentation/storekit/generating-jws-to-sign-app-store-requests Generating JWS to sign App Store requests}
     */
    createSignature(productId, offerIdentifier, transactionId = undefined) {
        let featureSpecificClaims = {};
        featureSpecificClaims["productId"] = productId;
        featureSpecificClaims["offerIdentifier"] = offerIdentifier;
        if (transactionId != null) {
            featureSpecificClaims["transactionId"] = transactionId;
        }
        return super.internalCreateSignature(featureSpecificClaims);
    }
}
export class IntroductoryOfferEligibilitySignatureCreator extends BaseSignatureCreator {
    /**
     * Create a IntroductoryOfferEligibilitySignatureCreator
     *
     * @param signingKey Your private key downloaded from App Store Connect
     * @param keyId Your private key ID from App Store Connect
     * @param issuerId Your issuer ID from the Keys page in App Store Connect
     * @param bundleId Your app's bundle ID
     */
    constructor(signingKey, keyId, issuerId, bundleId) {
        super("introductory-offer-eligibility", signingKey, keyId, issuerId, bundleId);
    }
    /**
     * Create an introductory offer eligibility signature.
     *
     * @param productId The unique identifier of the product
     * @param allowIntroductoryOffer A boolean value that determines whether the customer is eligible for an introductory offer
     * @param transactionId The unique identifier of any transaction that belongs to the customer. You can use the customer's appTransactionId, even for customers who haven't made any In-App Purchases in your app.
     * @return The signed JWS.
     * {@link https://developer.apple.com/documentation/storekit/generating-jws-to-sign-app-store-requests Generating JWS to sign App Store requests}
     */
    createSignature(productId, allowIntroductoryOffer, transactionId) {
        let featureSpecificClaims = {};
        featureSpecificClaims["productId"] = productId;
        featureSpecificClaims["allowIntroductoryOffer"] = allowIntroductoryOffer;
        featureSpecificClaims["transactionId"] = transactionId;
        return super.internalCreateSignature(featureSpecificClaims);
    }
}
export class AdvancedCommerceInAppSignatureCreator extends BaseSignatureCreator {
    /**
     * Create a AdvancedCommerceInAppSignatureCreator
     *
     * @param signingKey Your private key downloaded from App Store Connect
     * @param keyId Your private key ID from App Store Connect
     * @param issuerId Your issuer ID from the Keys page in App Store Connect
     * @param bundleId Your app's bundle ID
     */
    constructor(signingKey, keyId, issuerId, bundleId) {
        super("advanced-commerce-api", signingKey, keyId, issuerId, bundleId);
    }
    /**
     * Create an Advanced Commerce in-app signed request.
     *
     * @param AdvancedCommerceInAppRequest The request to be signed.
     * @return The signed JWS.
     * {@link https://developer.apple.com/documentation/storekit/generating-jws-to-sign-app-store-requests Generating JWS to sign App Store requests}
     */
    createSignature(AdvancedCommerceInAppRequest) {
        let jsonRequest = JSON.stringify(AdvancedCommerceInAppRequest);
        let base64Request = Buffer.from(jsonRequest, "utf-8").toString("base64");
        let featureSpecificClaims = {};
        featureSpecificClaims["request"] = base64Request;
        return super.internalCreateSignature(featureSpecificClaims);
    }
}

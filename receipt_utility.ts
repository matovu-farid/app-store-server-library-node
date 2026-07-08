// // Copyright (c) 2023 Apple Inc. Licensed under MIT License.

// import { ASN1HEX } from 'jsrsasign';

// const IN_APP_TYPE_ID = 17;
// const TRANSACTION_IDENTIFIER_TYPE_ID = 1703;
// const ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID = 1705;

// export class ReceiptUtility {

//     /**
//      * Extracts a transaction id from an encoded App Receipt. Throws if the receipt does not match the expected format.
//      * *NO validation* is performed on the receipt, and any data returned should only be used to call the App Store Server API.
//      * @param appReceipt The unmodified app receipt
//      * @returns A transaction id from the array of in-app purchases, null if the receipt contains no in-app purchases
//      */
//     extractTransactionIdFromAppReceipt(appReceipt: string): string | null {
//         // Xcode receipts use indefinite length encoding, not supported by all parsers
//         // Indefinite length encoding is only entered, but never left during parsing for receipts
//         // We therefore round up indefinite length encoding to be the remaining length
//         const prevGetVblenFunction = ASN1HEX.getVblen
//         ASN1HEX.getVblen = function(s, idx) {
//             const c = ASN1HEX.getL(s, idx)
//             const oldResult = prevGetVblenFunction(s, idx)
//             // Round up to the remaining length in the string, measured in bytes (2 hex values per byte)
//             if (oldResult === 0 && c === '80') {
//                 return (s.length - idx) / 2
//             }
//             return oldResult
//         }
//         const prevGetLblen = ASN1HEX.getLblen
//         ASN1HEX.getLblen = function(s, idx) {
//             const oldResult = prevGetLblen(s, idx)
//             // The length for the length byte for 80 00 is 1
//             if (oldResult == -1) {
//                 return 1
//             }
//             return oldResult
//         }
//         try {
//             let receiptInfo = ASN1HEX.getVbyList(Buffer.from(appReceipt, 'base64').toString('hex'), 0, [1, 0, 2, 1, 0]) as string
//             if (receiptInfo.length > 2 && receiptInfo.startsWith('04')) {
//                 // We are still in an Octet String, Xcode wraps with an extra Octet, decode it here
//                 receiptInfo = ASN1HEX.getV(receiptInfo, 0)
//             }
//             let index = 0;
//             while(ASN1HEX.getVbyList(receiptInfo, 0, [index, 0])) {
//                 const val = ASN1HEX.getVbyList(receiptInfo, 0, [index, 0]) as string
//                 if (IN_APP_TYPE_ID === parseInt(val, 16)) {
//                     const inAppInfo = ASN1HEX.getVbyList(receiptInfo, 0, [index, 2]) as string
//                     let inAppIndex = 0;
//                     while(ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 0])) {
//                         const val = ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 0]) as string
//                         if (TRANSACTION_IDENTIFIER_TYPE_ID === parseInt(val, 16) || ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID === parseInt(val, 16)) {
//                             const transactionIdUTF8String = ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 2]) as string
//                             const transactionId = ASN1HEX.getVbyList(transactionIdUTF8String, 0, []) as string
//                             return Buffer.from(transactionId, 'hex').toString()
//                         }
//                         inAppIndex = inAppIndex + 1
//                     }
//                 }
//                 index = index + 1
//             }
//             return null
//         } finally {
//             ASN1HEX.getLblen = prevGetLblen
//             ASN1HEX.getVblen = prevGetVblenFunction
//         }
//     }

//     /**
//      * Extracts a transaction id from an encoded transactional receipt. Throws if the receipt does not match the expected format.
//      * *NO validation* is performed on the receipt, and any data returned should only be used to call the App Store Server API.
//      * @param transactionReceipt The unmodified transactionReceipt
//      * @return A transaction id, or null if no transactionId is found in the receipt
//      */
//     extractTransactionIdFromTransactionReceipt(transactionReceipt: string): string | null {
//         const topLevel = Buffer.from(transactionReceipt, 'base64').toString()
//         const topLevelRegex = /"purchase-info"\s+=\s+"([a-zA-Z0-9+/=]+)";/
//         const topLevelMatchResult = topLevel.match(topLevelRegex)
//         if (!topLevelMatchResult || topLevelMatchResult?.length !== 2) {
//             return null
//         }

//         const purchaseInfo = Buffer.from(topLevelMatchResult[1], 'base64').toString()
//         const purchaseInfoRegex = /"transaction-id"\s+=\s+"([a-zA-Z0-9+/=]+)";/
//         const purchaseInfoMatchResult = purchaseInfo.match(purchaseInfoRegex)
//         if (!purchaseInfoMatchResult || purchaseInfoMatchResult?.length !== 2) {
//             return null
//         }
//         return purchaseInfoMatchResult[1]
//     }
// }
import * as asn1js from "asn1js";

const IN_APP_TYPE_ID = 17;
const TRANSACTION_IDENTIFIER_TYPE_ID = 1703;
const ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID = 1705;

/**
 * Convert base64 → ArrayBuffer (Worker-safe)
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

/**
 * Convert hex string → UTF-8 string (Worker-safe)
 */
function hexToUtf8(hex: string): string {
  if (!hex) return "";

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }

  return new TextDecoder().decode(bytes);
}

/**
 * Safe child accessor (ASN.1 tree navigation helper)
 */
function get(node: any, index: number): any {
  return node?.valueBlock?.value?.[index];
}

export class ReceiptUtility {
  /**
   * Extract transaction ID from App Receipt (Cloudflare Worker safe)
   */
  extractTransactionIdFromAppReceipt(appReceipt: string): string | null {
    const buffer = base64ToArrayBuffer(appReceipt);

    const parsed = asn1js.fromBER(buffer);
    if (parsed.offset === -1) return null;

    const root = parsed.result;

    try {
      // Path: [1, 0, 2, 1, 0]
      let receiptInfo = get(get(get(get(get(root, 1), 0), 2), 1), 0);

      if (!receiptInfo) return null;

      // Handle OCTET WRAP (Apple quirk)
      if (receiptInfo.idBlock?.tagNumber === 4) {
        const inner = asn1js.fromBER(receiptInfo.valueBlock.valueHex);
        if (inner.offset !== -1) {
          receiptInfo = inner.result;
        }
      }

      const inApps = receiptInfo?.valueBlock?.value || [];

      for (const item of inApps) {
        const typeNode = get(item, 0);
        const typeHex = typeNode?.valueBlock?.valueHex || "";

        const typeValue = parseInt(hexToUtf8(typeHex), 16);

        if (typeValue !== IN_APP_TYPE_ID) continue;

        const inAppInfo = get(item, 2);
        const fields = inAppInfo?.valueBlock?.value || [];

        for (const field of fields) {
          const fieldTypeNode = get(field, 0);
          const fieldTypeHex = fieldTypeNode?.valueBlock?.valueHex || "";

          const fieldType = parseInt(hexToUtf8(fieldTypeHex), 16);

          if (
            fieldType !== TRANSACTION_IDENTIFIER_TYPE_ID &&
            fieldType !== ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID
          ) {
            continue;
          }

          const valueNode = get(field, 2);
          const hex = valueNode?.valueBlock?.valueHex || "";

          return hexToUtf8(hex);
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Transaction receipt parser (unchanged logic, Worker-safe already)
   */
  extractTransactionIdFromTransactionReceipt(
    transactionReceipt: string,
  ): string | null {
    const topLevel = atob(transactionReceipt);

    const topLevelMatch = topLevel.match(
      /"purchase-info"\s+=\s+"([a-zA-Z0-9+/=]+)";/,
    );

    if (!topLevelMatch) return null;

    const purchaseInfo = atob(topLevelMatch[1]);

    const purchaseInfoMatch = purchaseInfo.match(
      /"transaction-id"\s+=\s+"([a-zA-Z0-9+/=]+)";/,
    );

    if (!purchaseInfoMatch) return null;

    return purchaseInfoMatch[1];
  }
}

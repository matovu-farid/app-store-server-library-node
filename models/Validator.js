// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class NumberValidator {
    validate(obj) {
        return typeof obj === 'number';
    }
}
export class StringValidator {
    validate(obj) {
        return typeof obj === "string" || obj instanceof String;
    }
}

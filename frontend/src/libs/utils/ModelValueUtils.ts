import type { Ref } from 'vue';

/**
 * Create a model value update handler for two-way binding
 * Simplifies @update:modelValue bindings in templates
 *
 * @param refValue - The ref to update
 * @returns Update handler function
 *
 * @example
 * // Instead of: @update:modelValue="val => myRef.value = val"
 * // Use: @update:modelValue="createUpdateHandler(myRef)"
 */
export const createUpdateHandler = <T>(refValue: Ref<T>) => {
    return (val: T) => {
        refValue.value = val;
    };
};

/**
 * Create multiple model value update handlers at once
 * Useful for creating handlers for multiple refs
 *
 * @param refs - Object with ref values to create handlers for
 * @returns Object with handler functions
 *
 * @example
 * const handlers = createUpdateHandlers({
 *   dateFrom: myDateFromRef,
 *   dateTo: myDateToRef
 * });
 * // Use: @update:modelValue="handlers.dateFrom"
 */
export const createUpdateHandlers = <T extends Record<string, Ref<any>>>(refs: T): {
    [K in keyof T]: (val: T[K] extends Ref<infer U> ? U : never) => void
} => {
    const handlers: any = {};

    for (const key in refs) {
        handlers[key] = (val: any) => {
            refs[key].value = val;
        };
    }

    return handlers;
};


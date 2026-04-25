/**
 * Validation utility functions for type checking and validation
 */

/**
 * Checks if a value is null or undefined
 * @param val - The value to check
 * @returns true if value is null or undefined
 */
export const isNullOrUndefined = (val: unknown): val is null | undefined => {
  return val == null;
};

/**
 * Checks if a value is a string
 * @param val - The value to check
 * @returns true if value is a string
 */
export const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

/**
 * Checks if a value is an array
 * @param val - The value to check
 * @returns true if value is an array
 */
export const isArray = (val: unknown): val is unknown[] => {
  return Array.isArray(val);
};

/**
 * Checks if a value is an object (not null, not array)
 * @param val - The value to check
 * @returns true if value is an object
 */
export const isObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};

/**
 * Checks if a value is an empty string (whitespace only counts as empty)
 * @param val - The value to check
 * @returns true if value is an empty string
 */
export const isEmptyString = (val: unknown): boolean => {
  return isString(val) && val.trim().length === 0;
};

/**
 * Checks if a value is an empty array
 * @param val - The value to check
 * @returns true if value is an empty array
 */
export const isEmptyArray = (val: unknown): boolean => {
  return isArray(val) && val.length === 0;
};

/**
 * Checks if a value is a time object with hours and minutes properties
 * @param val - The value to check
 * @returns true if value is a time object
 */
export const isTimeObject = (val: unknown): val is { hours: unknown; minutes: unknown } => {
  return isObject(val) && 'hours' in val && 'minutes' in val;
};

/**
 * Checks if a value is a month object with month and year properties
 * @param val - The value to check
 * @returns true if value is a month object
 */
export const isMonthObject = (val: unknown): val is { month: unknown; year: unknown } => {
  return isObject(val) && 'month' in val && 'year' in val;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param val - The value to check
 * @returns true if value is considered empty
 */
export const isEmpty = (val: unknown): boolean => {
  if (isNullOrUndefined(val)) return true;
  if (isString(val)) return isEmptyString(val);
  if (isArray(val)) return isEmptyArray(val);
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
};

/**
 * Checks if a value is a valid number (not NaN)
 * @param val - The value to check
 * @returns true if value is a valid number
 */
export const isValidNumber = (val: unknown): val is number => {
  return typeof val === 'number' && !Number.isNaN(val);
};

/**
 * Checks if a value is a boolean
 * @param val - The value to check
 * @returns true if value is a boolean
 */
export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean';
};


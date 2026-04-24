/**
 * Utility functions for number array operations
 */

/**
 * Check if a number array contains a specific value
 * @param arr - The number array to search in
 * @param target - The number to search for
 * @returns true if the array contains the target number, false otherwise
 */
export const containsNumber = (arr: number[], target: number): boolean => {
  return arr.includes(target);
};

/**
 * Find the index of a number in an array
 * @param arr - The number array to search in
 * @param target - The number to search for
 * @returns the index of the number, or -1 if not found
 */
export const findNumberIndex = (arr: number[], target: number): number => {
  return arr.findIndex(item => item === target);
};

/**
 * Find all numbers from a source array that exist in a target array
 * @param source - The source number array
 * @param targets - The array of numbers to search for
 * @returns array of numbers that exist in both arrays
 */
export const findMatchingNumbers = (source: number[], targets: number[]): number[] => {
  return source.filter(item => targets.includes(item));
};

/**
 * Check if any numbers from targets array exist in source array
 * @param source - The source number array
 * @param targets - The array of numbers to check
 * @returns true if any target number exists in source array
 */
export const containsAnyNumber = (source: number[], targets: number[]): boolean => {
  return targets.some(target => source.includes(target));
};

/**
 * Check if all numbers from targets array exist in source array
 * @param source - The source number array
 * @param targets - The array of numbers to check
 * @returns true if all target numbers exist in source array
 */
export const containsAllNumbers = (source: number[], targets: number[]): boolean => {
  return targets.every(target => source.includes(target));
};

/**
 * Get unique numbers from an array
 * @param arr - The number array
 * @returns array with unique numbers only
 */
export const getUniqueNumbers = (arr: number[]): number[] => {
  return [...new Set(arr)];
};

/**
 * Find numbers that exist in first array but not in second array
 * @param arr1 - First number array
 * @param arr2 - Second number array
 * @returns numbers that exist only in first array
 */
export const getDifferenceNumbers = (arr1: number[], arr2: number[]): number[] => {
  return arr1.filter(item => !arr2.includes(item));
};

/**
 * Find the intersection of two number arrays
 * @param arr1 - First number array
 * @param arr2 - Second number array
 * @returns numbers that exist in both arrays
 */
export const getIntersectionNumbers = (arr1: number[], arr2: number[]): number[] => {
  return arr1.filter(item => arr2.includes(item));
};

/**
 * Remove specific numbers from an array
 * @param source - The source number array
 * @param toRemove - Numbers to remove
 * @returns new array without the specified numbers
 */
export const removeNumbers = (source: number[], toRemove: number[]): number[] => {
  return source.filter(item => !toRemove.includes(item));
};

/**
 * Search for numbers within a range
 * @param arr - The number array to search in
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns numbers within the specified range
 */
export const findNumbersInRange = (arr: number[], min: number, max: number): number[] => {
  return arr.filter(item => item >= min && item <= max);
};

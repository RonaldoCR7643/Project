export function generateArray(num) {
  return Array.from({ length: Math.ceil(num) }, (_, i) => i + 1);
}
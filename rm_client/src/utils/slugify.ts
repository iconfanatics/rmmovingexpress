// src/utils/slugify.ts

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // space → "-"
    .replace(/[^\w-]+/g, ""); // special char remove
}

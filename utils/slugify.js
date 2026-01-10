// utils/slugify.ts

/**
 * Convert string into a URL-friendly slug.
 * - Lowercase
 * - Replace spaces with hyphens
 * - Remove invalid characters
 * - Collapse multiple hyphens
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid characters
    .replace(/\s+/g, "-")         // replace spaces with -
    .replace(/-+/g, "-");         // collapse multiple dashes
}

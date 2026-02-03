/**
 * Extract plain text only from pasted content.
 * Strips HTML, image data (data: URLs), and non-text cruft so we keep only readable text.
 * Use when pasting from LinkedIn or any rich source.
 *
 * @param {string} input - Raw pasted content (may include HTML, images, etc.)
 * @returns {string} - Plain text only, normalized
 */
export function extractPlainTextOnly(input) {
  if (!input || typeof input !== 'string') return ''

  let text = input

  // 1. Strip HTML tags (e.g. from rich paste)
  text = text.replace(/<[^>]*>/g, ' ')

  // 2. Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))

  // 3. Remove data: URLs (images, blobs) - never parse these
  text = text.replace(/data:[^\s'"<>]*base64[^\s'"<>]*/gi, ' ')
  text = text.replace(/data:[a-z]+\/[a-z0-9+-.]+;[^,\s]*/gi, ' ')

  // 4. Remove image/file references that are clearly non-text
  text = text.replace(/\bhttps?:\/\/[^\s]*\.(png|jpe?g|gif|webp|svg|ico)(\?[^\s]*)?/gi, ' ')
  text = text.replace(/\b[\w.-]+\.(png|jpe?g|gif|webp|svg|ico)(\?[^\s]*)?/gi, ' ')

  // 5. Remove zero-width and other non-printable / invisible chars
  text = text.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')

  // 6. Normalize line endings and collapse excessive blank lines
  text = text.replace(/\r\n|\r/g, '\n')
  text = text.replace(/\n{3,}/g, '\n\n')

  // 7. Collapse multiple spaces into one, trim each line (keep blank lines for structure)
  text = text
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')

  // 8. Trim overall
  return text.trim()
}

export const DEFAULT_PATTERNS = '할까요|드릴까요|진행할까요|시작할까요|괜찮을까요|어떻게 할까요|shall I|should I|want me to|proceed\\?'

// The text after the last blank line, trimmed.
export const lastParagraph = (text: string): string => {
  const parts = text.trim().split(/\n\s*\n/)
  return (parts[parts.length - 1] ?? '').trim()
}

// An invalid regex source falls back to the default.
export const compilePatterns = (source: string | undefined): RegExp => {
  try {
    return new RegExp(source?.trim() || DEFAULT_PATTERNS, 'i')
  } catch {
    return new RegExp(DEFAULT_PATTERNS, 'i')
  }
}

// Does the end of Claude's message ask for a go-ahead?
export const isQuestion = (text: string, patterns: RegExp, requireQuestionMark: boolean): boolean => {
  const tail = text.slice(-300).trim()
  if (!tail) return false
  if (/[?？]$/.test(tail)) return true
  return !requireQuestionMark && patterns.test(lastParagraph(tail))
}

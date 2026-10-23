import { expect, test } from 'claude-code/testing'
import { compilePatterns, isQuestion, lastParagraph } from '../hooks/detect'

const p = compilePatterns(undefined)

test('a trailing question mark triggers', () => {
  expect(isQuestion('Done with the edit. Anything else?', p, false)).toBe(true)
  expect(isQuestion('이대로 갈까요？', p, true)).toBe(true)
})

test('a pattern mid-paragraph triggers', () => {
  expect(isQuestion('계획은 이렇습니다.\n\n진행할까요 아니면 수정할까요 (둘 중 하나)', p, false)).toBe(true)
})

test('a plain statement does not', () => {
  expect(isQuestion('All tests pass.', p, false)).toBe(false)
  expect(isQuestion('', p, false)).toBe(false)
})

test('English phrasing, case-insensitive', () => {
  expect(isQuestion('Plan ready.\n\nShall I proceed?', p, false)).toBe(true)
  expect(isQuestion('Let me know. WANT ME TO continue', p, false)).toBe(true)
})

test('requireQuestionMark ignores patterns without a ?', () => {
  expect(isQuestion('진행할까요 알려주세요.', p, true)).toBe(false)
})

test('last paragraph and bad regex fallback', () => {
  expect(lastParagraph('a\n\nb\n\n c ')).toBe('c')
  expect(compilePatterns('(').test('shall I')).toBe(true)
})

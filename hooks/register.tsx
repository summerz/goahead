import type { EngineInterface, Register, RenderElement } from 'claude-code'
import { compilePatterns, isQuestion } from './detect'
import { chordLabel, matches, parseChord } from './keys'

// ponytail: module state, a reload forgets a pending question, which is fine
let pending = false

// $.prompt.submit skips this plugin's own prompt.submit hook, so clear here too
const send = async ($: EngineInterface, text: string) => {
  pending = false
  await $.prompt.submit({ text, asUser: true })
}

export const register: Register = (on, options) => {
  const str = (name: string, fallback: string) => (typeof options[name] === 'string' && options[name] ? String(options[name]) : fallback)
  const reply = str('reply', '진행하죠.')
  const chord = parseChord(str('key', 'alt+return'))
  const patterns = compilePatterns(str('patterns', ''))
  const requireMark = options.requireQuestionMark === true || options.requireQuestionMark === 'true'

  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined) pending = isQuestion(e.answer, patterns, requireMark)
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    pending = false
    return next(e)
  })

  on('turn.start', async ($, e, next) => {
    pending = false
    return next(e)
  })

  on('prompt.edit', async ($, e, next) => {
    if (pending && matches(e.key, chord)) {
      await send($, reply)
      return { text: e.text, cursor: e.cursor }
    }
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!pending || e.props.hasSurvey) return next(e)
    const { Box, Button, Text } = $.ui.resolve(e)
    const r = await next(e)
    const band = (
      <Box borderStyle="round" borderColor="promptBorder" borderDimColor paddingX={1} gap={1}>
        <Button key="go" variant="primary" label={reply} hotkey="g" onPress={() => send($, reply)} />
        <Button key="hide" plain label="[hide]" hotkey="h" onPress={() => { pending = false }} />
        <Text dimColor>{chordLabel(chord)} sends · h hides</Text>
      </Box>
    )
    return r == null ? band : <Box flexDirection="column">{r as RenderElement}{band}</Box>
  })
}

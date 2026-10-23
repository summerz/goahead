# goahead

One key for "진행하죠."

[한국어](README.ko.md)

## Why

Claude ends a turn with a question and the next prompt is one word: "진행하죠.", "1", "ok". The author's history held about 400 of them. Each costs a typed prompt for no information.

goahead detects the question and puts a button and a key on it.

## Install

Run in the prompt of a terminal session:

```
/plugin install goahead --marketplace summerz/goahead
```

Answer `y` to add the marketplace, then pick a scope.

- Prompt: the command above.
- Shell: `claude plugin install goahead --marketplace summerz/goahead`
- Desktop app: `/plugin` does not run. Click + next to the prompt box, then Plugins, then Add marketplace with `summerz/goahead`, then Add plugin.

## Features

- Detects a question when the last paragraph of Claude's final message matches `patterns`. `requireQuestionMark` restricts it to messages ending with `?`.
- A band above the prompt shows a `[진행하죠.]` button and `[hide]`. The `g` and `h` hotkeys work once the band has focus (a click, or ctrl+x tab); from the prompt box use the key below.
- The `key` chord (default `alt+return`) sends the configured `reply`.
- Subagent turns are ignored.

## Settings

| Setting | Default | Does |
| --- | --- | --- |
| `reply` | `진행하죠.` | text sent as your prompt |
| `key` | `alt+return` | chord that sends the reply while a question is pending |
| `patterns` | `할까요\|드릴까요\|진행할까요\|시작할까요\|괜찮을까요\|어떻게 할까요\|shall I\|should I\|want me to\|proceed\?` | case-insensitive regex alternation matched against the last paragraph. An invalid regex falls back to the default |
| `requireQuestionMark` | `false` | count only messages ending with `?` or `？` |

Change them in the plugin's rows of the config menu, or in `~/.claude/settings.json`:

```json
{ "pluginConfigs": { "goahead": { "reply": "go ahead", "key": "ctrl+g", "requireQuestionMark": true } } }
```

Write a chord as `ctrl`, `alt` (or `option`), `shift` joined with `+`, then the key.

## License

MIT

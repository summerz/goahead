# goahead

"진행하죠." 한 번을 키 하나로 보내는 모드입니다.

[English](README.md)

## 왜 필요한가

Claude가 질문으로 턴을 끝내면 다음 프롬프트는 한 단어입니다. "진행하죠.", "1", "ok" 같은 입력입니다. 작성자의 기록에는 이런 입력이 약 400건 있었습니다. 전달하는 정보 없이 매번 프롬프트를 입력해야 합니다.

goahead는 질문을 감지해 버튼과 단축키를 붙입니다.

## Install

터미널 세션의 프롬프트에서 다음 명령을 실행합니다.

```
/plugin install goahead --marketplace summerz/goahead
```

마켓플레이스 추가 여부에 `y`로 답하고 범위(scope)를 선택합니다.

- 프롬프트: 위 명령을 실행합니다.
- 셸: `claude plugin install goahead --marketplace summerz/goahead`
- 데스크톱 앱: `/plugin`이 동작하지 않습니다. 프롬프트 입력창 옆의 +를 누르고 Plugins, Add marketplace에 `summerz/goahead`을 입력한 뒤 Add plugin을 누릅니다.

## 기능

- Claude의 마지막 메시지 끝 문단이 `patterns`와 일치하면 질문으로 감지합니다. `requireQuestionMark`를 켜면 `?`로 끝나는 메시지만 대상으로 합니다.
- 프롬프트 위의 띠에 `[진행하죠.]` 버튼(단축키 `g`)과 `[hide]`(단축키 `h`)를 표시합니다.
- `key` 단축키(기본값 `alt+return`)로 설정한 `reply`를 보냅니다.
- 서브에이전트의 턴은 무시합니다.

## 설정

| 설정 | 기본값 | 동작 |
| --- | --- | --- |
| `reply` | `진행하죠.` | 프롬프트로 보낼 텍스트입니다 |
| `key` | `alt+return` | 질문이 대기 중일 때 답변을 보내는 단축키입니다 |
| `patterns` | `할까요\|드릴까요\|진행할까요\|시작할까요\|괜찮을까요\|어떻게 할까요\|shall I\|should I\|want me to\|proceed\?` | 마지막 문단에 대해 대소문자를 구분하지 않고 검사하는 정규식 alternation입니다. 잘못된 정규식이면 기본값을 사용합니다 |
| `requireQuestionMark` | `false` | `?` 또는 `？`로 끝나는 메시지만 질문으로 인정합니다 |

설정 메뉴의 플러그인 항목에서 변경하거나 `~/.claude/settings.json`을 수정합니다.

```json
{ "pluginConfigs": { "goahead": { "reply": "go ahead", "key": "ctrl+g", "requireQuestionMark": true } } }
```

단축키는 `ctrl`, `alt`(또는 `option`), `shift`를 `+`로 연결하고 마지막에 키를 씁니다.

## License

MIT

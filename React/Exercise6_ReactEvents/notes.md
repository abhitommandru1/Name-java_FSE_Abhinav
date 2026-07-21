# React Exercise 6 – React Events

**Module reference:** Module 9 topic "React Events" (sub-topics: "React event object, Event
handlers, Passing arguments to event handlers"). The mandatory-hands-on spreadsheet lists
numbered `ReactJS-HOL` files (up to 17) for this skill, but the source document itself
isn't available in this repo — same situation already noted in
[Exercise5_ES6AndJSX/notes.md](../Exercise5_ES6AndJSX/notes.md) — so this exercise covers
every sub-topic named in the handbook's Module 9 table explicitly.

## What it covers
| Sub-topic | Where |
|---|---|
| React event object | `handleKeyDown` reads `event.key` from React's SyntheticEvent |
| Event handlers | `handleClick` on a plain click-counter button |
| Passing arguments to event handlers | `onClick={(event) => handleColorClick(color, event)}` — the arrow-function wrapper is what lets an extra argument (`color`) ride alongside the event object |

## Verified (driven end-to-end in a real headless browser, not just built)
Ran the dev server and drove it with Playwright — typed a key, clicked the counter 3
times, and clicked the "blue" swatch:
```
Last key pressed: a
Clicked 3 times
Selected: blue
```
Zero console/page errors during the interaction. Screenshot confirms all three sections
update live in the DOM, not just in source.

## Key takeaways
- React wraps the native DOM event in a `SyntheticEvent` — `event.key`, `event.target`,
  etc. behave consistently across browsers, which is why `handleKeyDown` doesn't need any
  browser-specific handling.
- To pass a custom argument to a handler while still receiving the event object, wrap the
  call in an inline arrow function (`onClick={(event) => fn(arg, event)}`) rather than
  passing the handler reference directly (`onClick={fn}`), which would only receive the
  event.

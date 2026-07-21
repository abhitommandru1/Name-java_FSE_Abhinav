# React Exercise 7 – React Forms

**Module reference:** Module 9 topic "React Forms" (sub-topics: "Controlled inputs,
Uncontrolled inputs, Validation, Displaying error messages, textarea tag, select tag").
Same situation as [Exercise5_ES6AndJSX/notes.md](../Exercise5_ES6AndJSX/notes.md) — the
numbered `ReactJS-HOL` source document isn't available, so this exercise covers every
sub-topic named in the handbook's Module 9 table explicitly.

## What it covers
| Sub-topic | Where |
|---|---|
| Controlled inputs | `name`/`bio`/`role` fields — value comes from `form` state, `onChange` writes back to state |
| `textarea` tag | `bio` field |
| `select` tag | `role` field |
| Validation + displaying error messages | `validate()` — required name, minimum bio length, rendered as `<p className="error">` |
| Uncontrolled inputs | file input read via `useRef` on change, not tracked in React state |

## Verified (driven end-to-end in a real headless browser)
1. Clicked Submit with an empty name field → `Name is required.` rendered.
2. Filled in a valid name, bio, and role ("mentor"), clicked Submit →
   `Submitted: Abhinav (mentor) — Learning React deeply.` rendered.

Screenshot confirms the second state. Zero console/page errors during either interaction.

## Key takeaways
- A controlled input's `value` is driven by React state, so `event.preventDefault()` in
  `handleSubmit` is required to stop the browser's native (full-page-reload) form submit
  — React never automatically prevents that default.
- The file input intentionally stays uncontrolled: `<input type="file">` can't have its
  `value` set programmatically for security reasons, so its state is read from the DOM
  node via `ref.current.files` on demand rather than mirrored into React state on every
  change like the text/textarea/select fields above.

# React Exercise 8 – Calling API with React

**Module reference:** Module 9 topic "Calling API with React" (sub-topics: "How React
Clients interact with a database, general discussion on the different ways of interacting
with an API from React App (Fetch Api, Axios, Jquery and XmlHttpRequest), Implementation
of API interaction from React App using Fetch Api and Axios"). Same situation as
[Exercise5_ES6AndJSX/notes.md](../Exercise5_ES6AndJSX/notes.md) — the numbered
`ReactJS-HOL` source document isn't available, so this exercise implements the two
approaches the handbook explicitly names as required: Fetch API and Axios.

## What it covers
Both sections call the same public test API (`https://jsonplaceholder.typicode.com`) so
the two approaches are directly comparable:
- **Fetch API** (`FetchSection`) — `fetch()` + manual `response.ok` check + `.json()`,
  with `loading`/`error`/`data` state and an `AbortController`-free cleanup flag to avoid
  setting state after unmount.
- **Axios** (`AxiosSection`) — `axios.get()` with a `params` object and
  `AbortController`-based cancellation (`signal`), automatic non-2xx rejection, and
  `response.data` already parsed.

## Verified (driven end-to-end in a real headless browser against the live API)
```
Fetch API section: 5 real users listed (Leanne Graham, Ervin Howell, Clementine Bauch, ...)
Axios section: 5 real post titles listed (sunt aut facere repellat provident occaecati ...)
```
Confirmed via a live GET to `jsonplaceholder.typicode.com` (HTTP 200) and a Playwright
screenshot showing both lists rendered from the real response — not mocked. Zero
console/page errors.

## Key takeaways
- `fetch()` only rejects its promise on a network-level failure — an HTTP error status
  (404, 500...) still resolves successfully, so `response.ok` must be checked manually
  before trusting the body. `axios` does this for you: any non-2xx status rejects the
  promise automatically, which is why the `.catch()` block is what handles axios HTTP
  errors, while fetch needed an explicit `throw` after checking `response.ok`.
- `axios` parses JSON into `response.data` automatically; `fetch` requires an explicit
  `await response.json()` step.
- Both effects clean up on unmount (a `cancelled` flag for fetch, `AbortController` for
  axios) to avoid the classic "set state on an unmounted component" warning if the
  component unmounts before the request resolves.

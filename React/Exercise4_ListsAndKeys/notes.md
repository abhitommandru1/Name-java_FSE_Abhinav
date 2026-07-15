# React Exercise 4 – Lists and Keys Deep Dive

**Module reference:** Module 9 topic "React List and Keys" (sub-topics: "Displaying a list
on UI, map(), Keys, Extracting components with keys"). Not tied to a specific
mandatory-hands-on spreadsheet row — the ReactJS-HOL source document isn't available —
this exercise demonstrates *why* keys matter, not just that `.map()` renders a list
(which [Exercise1_StudentApp](../Exercise1_StudentApp) already does).

## What it does
Renders the same task list twice, side by side: one keyed by array `index`, one keyed by
the task's stable `id`. Each task has an *uncontrolled* input (`defaultValue`, not
`value`) so typed text lives in the DOM node rather than React state. Clicking "Remove
first task" then exposes the classic index-key bug: in the index-keyed list, React
reuses DOM node position 0 for whatever item is now first, so text typed into the first
input stays in the first *position* rather than following the *task* it was typed for. The
id-keyed list doesn't have this problem — React matches nodes to items by identity.

## Verified
```
$ npm install && npm run build
✓ built in 261ms
$ grep -o "Lists and Keys|buggy|correct" dist/assets/*.js
Lists and Keys
buggy
correct
```
The reordering bug itself is documented, well-established React behavior (from the React
docs on reconciliation) — build-time verification confirms the code compiles and contains
the intended two-list comparison; the interactive DOM behavior (typing text, then clicking
remove, and observing which list's text follows the task vs. the position) needs to be
exercised in a running browser to see directly, which wasn't available in this environment.

## Key takeaways
- Keys tell React's reconciler *which* array item a DOM node corresponds to across
  re-renders. Without a stable key, React falls back to position, which silently
  misattributes state (form inputs, focus, animations) after an insert/remove/reorder.
- The rule of thumb: use array index as a key **only** if the list is static and never
  reordered/filtered/inserted into — otherwise use a real stable id from the data.

# React Exercise 5 – ES6 and JSX Fundamentals

**Module reference:** Module 9 topic "React ES6 and JSX" (sub-topics: "What is ES6,
Classes, Class inheritance, Arrow functions, this, var, let, const, What is JSX, Nested
elements in JSX, JSX attributes, JSX styling"). Not tied to a specific mandatory-hands-on
spreadsheet row — the ReactJS-HOL source document isn't available — this exercise covers
every sub-topic named in the handbook explicitly.

## What it covers
| Sub-topic | Where |
|---|---|
| Classes, class inheritance | `Animal` / `Dog extends Animal`, `super.speak()` |
| Arrow functions and `this` | `Counter.incrementArrow` (lexical `this`, survives being detached from the instance) vs `incrementRegular` (a normal method) |
| `var` / `let` / `const` | `scopeDemo()` — `var` leaks out of an `if` block, `let` doesn't |
| JSX: nested elements | `<strong>`/`<em>` nested inside a `<div>` |
| JSX: attributes | `className`, `data-testid`, `title` |
| JSX: styling | inline `style={{...}}` object alongside a CSS class |

## Verified two ways
**1. Build (proves the JSX/bundle compiles):**
```
$ npm install && npm run build
✓ built in 277ms
```

**2. Runtime (proves the actual ES6 logic behaves as claimed)** — extracted the plain-JS
parts and ran them directly in Node, outside of JSX, to get real proof rather than just
"it compiled":
```
dog.speak(): Rex makes a sound. Specifically, Rex barks.
detached arrow result: 1
regular method result: 2
scopeDemo(): {
  varScoped: 'var: function-scoped',
  letScoped: 'let: block-scoped',
  constScoped: 'const: cannot be reassigned',
  varInsideBlock: 'still visible outside the if-block',
  letLeakThrows: true    // confirms `let` genuinely throws ReferenceError outside its block
}
```

## Key takeaways
- Arrow functions don't have their own `this` — they close over `this` from wherever
  they're defined, which is exactly why `this.incrementArrow = () => {...}` in a
  constructor keeps working even when detached from the instance (`const fn =
  obj.method; fn()`), while a normal method assigned the same way would have `this ===
  undefined` in strict mode.
- `var` is function-scoped (or global if outside any function) and hoists; `let`/`const`
  are block-scoped — the `letLeakThrows: true` result is direct proof, not just a claim.

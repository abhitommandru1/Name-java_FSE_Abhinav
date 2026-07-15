# React Exercise 3 – Conditional Rendering

**Module reference:** Module 9 topic "Conditional Rendering" (sub-topics: "Element
variables, Inline if with logical && operator, Inline if-else with conditional operator,
How to prevent component from rendering"). Not tied to a specific mandatory-hands-on
spreadsheet row — the ReactJS-HOL source document isn't available — this exercise instead
demonstrates every sub-topic named in the handbook explicitly.

## The four techniques, each demonstrated
1. **Element variable** — build a JSX value in a `let`, assign it conditionally, render it.
2. **Inline `&&`** — `{notifications > 0 && <Badge/>}`. Comment in the code flags the
   classic footgun: `{count && <X/>}` renders the literal `0` when `count` is `0`, because
   `0` is falsy but still gets returned and rendered as text.
3. **Ternary** — `{isLoggedIn ? <LogoutButton/> : <LoginButton/>}`.
4. **Returning `null`** — `WarningBanner` returns `null` when `show` is `false`, so React
   renders nothing at all for that component.

## Verified
```
$ npm install && npm run build
✓ built in 293ms
$ grep -o "Conditional Rendering|Element variable|Preventing a component" dist/assets/*.js
Conditional Rendering
Element variable
Preventing a component
```

## Key takeaways
- `&&` for conditional rendering only works cleanly when the left side is a real boolean —
  guard against falsy-but-not-boolean values like `0` or `""`.
- Returning `null` from a component is the standard way to make it render nothing; an
  empty string or `undefined` also work, but `null` is the idiomatic choice.

# React Exercise 2 – Class vs Functional Components

**Module reference:** Additional coverage for "React" — Module 9 topic "React Components
and Props" (sub-topic "Functional components, Class components"). Not tied to a specific
mandatory-hands-on spreadsheet row (the exact numbered ReactJS-HOL document isn't
available), built to fill a concept gap: [Exercise1_StudentApp](../Exercise1_StudentApp)
only used functional components, so class components weren't demonstrated anywhere.

## What it does
Two components implementing the identical click-counter behavior side by side:
`CounterClass` (extends `Component`, `this.state`/`this.setState`, `componentDidMount`)
and `CounterFunctional` (`useState`, `useEffect`).

## Verified
```
$ npm install && npm run build
✓ built in 582ms
$ grep -o "Class Component|Functional Component|Increment" dist/assets/*.js
Class Component
Functional Component
Increment
```

## Key takeaways
- `this.setState(prevState => ...)` and `setCount(prev => ...)` are both the
  "functional update" form — needed whenever the new state depends on the previous state,
  to avoid stale-closure bugs.
- `componentDidMount()` and `useEffect(fn, [])` are equivalent: both run once after the
  first render.
- Modern React code is almost entirely functional components + Hooks; class components
  are still supported but rarely written in new code.

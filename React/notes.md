# React Hands-On — rebuilt to match the real ReactJS-HOL documents

**Source:** 19 numbered `ReactJS-HOL.docx` files from
https://github.com/seshadrimr/Digital-Nurture-JavaFSE (`Java FSE/Deepskilling/React/`).

## Why this exists
The 8 exercises previously in this folder (`Exercise1_StudentApp` through
`Exercise8_CallingAPI`) were built against invented generic scenarios — the actual
`ReactJS-HOL` documents were never available in earlier sessions. Once fetched directly
from the source repo, every one of the 19 turned out to be a **specific named app** with
its own scenario, unrelated to what was previously built. All 17 required exercises
(19 minus 2 unit-testing-only ones not listed in the mandatory/additional spreadsheet)
have been rebuilt from scratch against the literal task text in each `.docx`.

## Mapping (per the mandatory-hands-on spreadsheet: mandatory = 1,2,3,4,5,9,10,11,12,13;
## additional = 6,7,8,13,14,15,16,17)
| # | Folder | App name (from the doc) | What it demonstrates |
|---|--------|--------------------------|----------------------|
| 1 | `Exercise1_MyFirstReact` | myfirstreact | SPA/React intro, create-react-app equivalent |
| 2 | `Exercise2_StudentApp` | StudentApp | Class components (Home/About/Contact) |
| 3 | `Exercise3_ScoreCalculatorApp` | scorecalculatorapp | Functional component + props + stylesheet |
| 4 | `Exercise4_BlogApp` | blogapp | `componentDidMount` / `componentDidCatch` |
| 5 | `Exercise5_CohortDashboard` | (cohort dashboard) | CSS Modules + inline styles |
| 6 | `Exercise6_TrainersApp` | trainersapp | React Router navigation menu |
| 7 | `Exercise7_ShoppingApp` | shoppingapp | Props (`OnlineShopping`/`Cart` class components) |
| 8 | `Exercise8_CounterApp` | (mall counter) | State (`CountPeople`, entry/exit counts) |
| 9 | `Exercise9_CricketApp` | cricketapp | ES6 `map()`, arrow functions, destructuring |
| 10 | `Exercise10_OfficeSpaceRentalApp` | officespacerentalapp | JSX syntax + inline CSS |
| 11 | `Exercise11_EventExamplesApp` | eventexamplesapp | Event handling, synthetic events, `CurrencyConvertor` |
| 12 | `Exercise12_TicketBookingApp` | ticketbookingapp | Conditional rendering (guest vs logged-in) |
| 13 | `Exercise13_BloggerApp` | bloggerapp | Lists/keys + conditional rendering, 3 components |
| 14 | `Exercise14_EmployeeContextApp` | (employee management) | Context API (light/dark theme) |
| 15 | `Exercise15_TicketRaisingApp` | ticketraisingapp | Forms (`ComplaintRegister`) |
| 16 | `Exercise16_MailRegisterApp` | mailregisterapp | Forms with validation |
| 17 | `Exercise17_FetchUserApp` | fetchuserapp | Calling a REST API (`randomuser.me`) in `componentDidMount` |

Items 18 and 19 (Jest/Enzyme unit testing) are in the source repo but not listed in either
the mandatory or additional column of the hands-on spreadsheet, so they were left out of
this pass.

## Verified
All 17 build cleanly (`npm run build`, zero errors) and were driven live in a headless
browser (real clicks, form fills, and — for `fetchuserapp` — a real network call to
`https://api.randomuser.me/`), not just compiled. `Exercise4_BlogApp`'s console output
during verification legitimately includes a logged error — that's React's own dev-mode
logging when the "Trigger child render error" button intentionally throws, to prove
`componentDidCatch` really catches it; the fallback UI renders correctly.

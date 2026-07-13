## 2025-05-14 - [Button Loading Logic & A11y]
**Learning:** Shared UI components must ensure that internal safety states (like 'loading') override external props. Always place {...props} before state-driven attributes like 'disabled'. Additionally, loading states should always use 'aria-busy' for screen reader clarity.
**Action:** In future components, apply the "Props Before Logic" pattern for spreading and include ARIA state attributes by default for interactive elements.

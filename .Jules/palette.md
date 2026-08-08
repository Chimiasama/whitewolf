## 2025-05-14 - [Button Loading Logic & A11y]
**Learning:** Shared UI components must ensure that internal safety states (like 'loading') override external props. Always place {...props} before state-driven attributes like 'disabled'. Additionally, loading states should always use 'aria-busy' for screen reader clarity.
**Action:** In future components, apply the "Props Before Logic" pattern for spreading and include ARIA state attributes by default for interactive elements.

## 2025-05-15 - [Nested Interactive Elements & Game Card Focus]
**Learning:** Interactive list items with nested clickable buttons (such as deleting a character within a load list container) violate HTML specifications and confuse screen readers or keyboard tab orders. Using sibling button elements inside a standard, non-interactive container is the optimal accessible layout. Furthermore, card-style choice elements should behave as full buttons with correct role, keyboard event handlers (Enter/Space), and custom ring focus styles, while nested sub-actions must be excluded from keyboard focus (`tabIndex={-1}`) to prevent duplicate focus states.
**Action:** Replace nested interactive wrappers with semantic flat structures. Assign keyboard key listeners, ARIA roles, and visible focus boundaries onto card elements designed to be clickable.

## 2025-05-14 - [Button Loading Logic & A11y]
**Learning:** Shared UI components must ensure that internal safety states (like 'loading') override external props. Always place {...props} before state-driven attributes like 'disabled'. Additionally, loading states should always use 'aria-busy' for screen reader clarity.
**Action:** In future components, apply the "Props Before Logic" pattern for spreading and include ARIA state attributes by default for interactive elements.

## 2025-05-15 - [Nested Interactive Elements & Game Card Focus]
**Learning:** Interactive list items with nested clickable buttons (such as deleting a character within a load list container) violate HTML specifications and confuse screen readers or keyboard tab orders. Using sibling button elements inside a standard, non-interactive container is the optimal accessible layout. Furthermore, card-style choice elements should behave as full buttons with correct role, keyboard event handlers (Enter/Space), and custom ring focus styles, while nested sub-actions must be excluded from keyboard focus (`tabIndex={-1}`) to prevent duplicate focus states.
**Action:** Replace nested interactive wrappers with semantic flat structures. Assign keyboard key listeners, ARIA roles, and visible focus boundaries onto card elements designed to be clickable.

## 2025-05-16 - [Modal Escape Key Dismissal & Focus Visible Rings]
**Learning:** Modal dialogs in stacked architectures must bind an 'Escape' key listener strictly to the top-most active modal (`bIsTop`) to ensure keyboard users can dismiss open dialogs sequentially without affecting underlying panels. Additionally, icon buttons and modal close buttons require explicit focus-visible rings (`focus-visible:ring-2 focus-visible:ring-red-500`) to guarantee focus indicator visibility for keyboard navigation.
**Action:** Ensure all modal components handle Escape key dismissal at the topmost stack layer and provide distinct focus-visible ring styles on all trigger and close buttons.

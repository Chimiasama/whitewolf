## 2025-05-22 - Temporal Dead Zone in App.tsx Memoization
**Learning:** In large components like `App.tsx`, core state (`oCharacter`) is often declared relatively late. Implementing memoization for data objects that depend on this state must account for the declaration order to avoid TS2448/ReferenceErrors.
**Action:** Always ensure `useMemo` hooks that depend on component state are declared AFTER the corresponding `useState` hooks, especially when refactoring for performance in high-complexity files.

## 2025-07-23 - Redundant Translations and Allocations in PointAllocator
**Learning:** Components mapping over large lists (such as 27 skills or 9 attributes) that perform inline translation lookups (`fnT`) and inline array allocations (e.g. `[...Array(5)]`) create significant garbage collection and translation CPU overhead during rapid state updates. Memoizing translation lookups inside `useMemo` and using static module-level arrays completely solves this problem.
**Action:** Always memoize translation lists and use module-level constant arrays for static loops within mapped list components.

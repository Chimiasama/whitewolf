## 2025-05-22 - Temporal Dead Zone in App.tsx Memoization
**Learning:** In large components like `App.tsx`, core state (`oCharacter`) is often declared relatively late. Implementing memoization for data objects that depend on this state must account for the declaration order to avoid TS2448/ReferenceErrors.
**Action:** Always ensure `useMemo` hooks that depend on component state are declared AFTER the corresponding `useState` hooks, especially when refactoring for performance in high-complexity files.

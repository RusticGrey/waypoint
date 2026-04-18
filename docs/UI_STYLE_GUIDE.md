# UI Style Guide

This document outlines the design tokens, branding, and reusable UI components used across the Waypoint platform. We follow a centralized "Design System" approach to ensure consistency and maintainability.

## 1. Design Tokens

### Semantic Colors
We avoid hardcoding Tailwind colors like `blue-600` directly in pages. Instead, use the semantic brand colors defined in `tailwind.config.ts`:

- **Brand Primary**: `bg-brand-500`, `text-brand-600`
- **Surface**: `bg-surface` (white), `bg-surface-soft` (slate-50), `bg-surface-muted` (slate-100)
- **Status**: `green-500` (Success), `yellow-500` (Warning), `red-500` (Error)

### Typography
Consistent typography is enforced via `lib/ux.ts`:
- **Heading**: `ux.text.heading` (Slate-900, black weight)
- **Subheading**: `ux.text.subheading` (Slate-700, bold)
- **Body**: `ux.text.body` (Slate-600, medium)
- **Accent/Labels**: `ux.text.accent` (Brand color, all-caps, tracking-widest)

## 2. Global Styles (`lib/ux.ts`)

The `ux` object in `lib/ux.ts` is the single source of truth for UI patterns. **Always use this object instead of writing raw Tailwind strings.**

```typescript
import { ux } from '@/lib/ux';

// Example usage
<div className={ux.card.base}>
  <h1 className={ux.text.heading}>Title</h1>
  <Button variant="primary">Click Me</Button>
</div>
```

### Core Categories in `ux`:
- **`ux.bg`**: Page and section backgrounds.
- **`ux.card`**: `base`, `pop` (elevated), `interactive`, and `highlight` variants.
- **`ux.button`**: Styles for `primary`, `secondary`, `outline`, and `ghost`.
- **`ux.badge`**: Status badge styles.
- **`ux.form`**: Styles for inputs, labels, and error messages.
- **`ux.layout`**: Standard spacing for pages, sections, and headers.

## 3. UI Components (`components/ui/`)

We use a set of primitive UI components that wrap the `ux` tokens:

### Button
Supports `variant` prop: `primary | secondary | outline | ghost`.
```tsx
import { Button } from '@/components/ui/button';
<Button variant="outline">Cancel</Button>
```

### Card
Supports `variant` prop: `base | pop`.
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
<Card variant="pop">...</Card>
```

### Badge
Supports `variant` prop: `success | warning | error | neutral | brand`.
```tsx
import { Badge } from '@/components/ui/badge';
<Badge variant="success">Completed</Badge>
```

## 4. Coding Laws for UI
1. **No "Magic" Colors**: Do not use `text-blue-500` if `ux.text.brand` or `text-brand-500` can be used.
2. **Component First**: If you find yourself writing the same Tailwind string 3 times, add it to `lib/ux.ts` or create a component in `components/ui/`.
3. **Consistency**: Check existing pages (like the Counselor Dashboard) before building new UI to ensure the "vibe" matches.

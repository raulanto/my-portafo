# Button Component Rule

## Use `AceternityButton` for all interactive buttons

This project uses `AceternityButton` (`@/components/ui/AceternityButton`) as the **default button component** for all CTAs and interactive actions.

### ✅ Correct usage

```tsx
import AceternityButton from "@/components/ui/AceternityButton";

// With link
<AceternityButton href="#contacto" size="lg" variant="primary">
  Ver proyectos
</AceternityButton>

// As a submit button
<AceternityButton type="submit" size="md" variant="primary">
  Enviar Mensaje
</AceternityButton>

// Loading state
<AceternityButton isLoading size="md" variant="primary">
  Procesando
</AceternityButton>
```

### Available variants

| Variant | Use case |
|---|---|
| `primary` | Main CTA actions |
| `secondary` | Secondary actions |
| `outline` | Subtle / alternative actions |
| `ghost` | Low-emphasis actions |
| `destructive` | Dangerous / delete actions |

### Available sizes

| Size | Use case |
|---|---|
| `sm` | Navigation, compact UI |
| `md` | Default |
| `lg` | Hero sections, prominent CTAs |
| `xl` | Very large/featured CTAs |

### Props

| Prop | Type | Notes |
|---|---|---|
| `href` | `string` | Renders as a Next.js `<Link>` instead of `<button>` |
| `variant` | see above | Defaults to `primary` |
| `size` | see above | Defaults to `md` |
| `isLoading` | `boolean` | Shows spinner and "Processing..." |
| `disabled` | `boolean` | Standard HTML disabled |
| `className` | `string` | Extra Tailwind classes |

### ❌ Do NOT use

- `import { Button } from "@/components/ui/button"` — the shadcn `Button` is **not** the standard button for this project.
- Wrapping `AceternityButton` in `<a>` or `<Link>` — use the `href` prop directly instead.

### Exception: icon-only ghost buttons

For icon-only buttons (theme toggle, hamburger menu) that don't fit any `AceternityButton` variant, use a plain `<button>` element with Tailwind classes:

```tsx
<button
  className="inline-flex items-center justify-center size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-90 outline-none cursor-pointer"
  aria-label="Descripción"
>
  <Icon className="size-4" />
</button>
```

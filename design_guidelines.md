# SocioTeam - Design Guidelines

## Design Approach: Utility-Focused SaaS Dashboard

**Selected System**: Material Design with shadcn/ui components  
**Rationale**: Data-heavy enterprise application requiring clarity, accessibility, and consistent interaction patterns for sociometric analysis and team management.

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Primary Blue: `217 91% 60%` (Interactive elements, CTAs, data visualization)
- Success Green: `142 76% 36%` (Positive sociometric connections, confirmations)
- Danger Red: `0 84% 60%` (Negative connections, alerts, conflicts)
- Warning Amber: `38 92% 50%` (Cautions, pending states)

**Neutral Scale:**
- Background: `0 0% 100%` (light) / `222 47% 11%` (dark)
- Surface: `0 0% 98%` / `217 33% 17%`
- Border: `214 32% 91%` / `217 33% 24%`
- Text Primary: `222 47% 11%` / `210 40% 98%`
- Text Secondary: `215 16% 47%` / `215 20% 65%`

**Data Visualization Palette:**
- Department Colors: Distinct hues at 60% saturation for graph nodes
- Connection Indicators: Green (`142 76% 36%`) positive, Red (`0 84% 60%`) negative
- Cohesion Scores: Gradient from Amber to Green based on 0-10 scale

### B. Typography

**Font Families:**
- Primary: `Inter` (UI elements, body text)
- Data: `JetBrains Mono` (metrics, numerical displays)

**Scale:**
- Display: 36px/600 (dashboard headings)
- H1: 30px/600 (page titles)
- H2: 24px/600 (section headers)
- H3: 20px/500 (card titles)
- Body: 16px/400 (default text)
- Small: 14px/400 (metadata, labels)
- Micro: 12px/400 (badges, tooltips)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of `2, 4, 6, 8, 12, 16` consistently
- Component padding: `p-4` to `p-6`
- Section spacing: `gap-6` to `gap-8`
- Card margins: `mb-6`
- Grid gaps: `gap-4`

**Container Structure:**
- Sidebar: Fixed 260px desktop, drawer on mobile
- Main content: `max-w-7xl mx-auto px-4 lg:px-8`
- Cards: `rounded-lg shadow-sm` with `p-6`
- Tables: Full width with `max-h-[600px] overflow-y-auto`

### D. Component Library

**Navigation:**
- Fixed navbar: Logo left, page title center, language selector + user dropdown right
- Collapsible sidebar: Icon + label navigation items, active state with primary background
- Mobile: Hamburger menu triggers sidebar drawer

**Data Display:**
- Metric Cards: Icon (48px), large value (30px/600), title (14px/400), optional trend badge
- Tables: Striped rows, hover states, sticky headers, 10 items per page with pagination
- Graphs: Recharts components with primary color scheme, tooltips, legends
- Sociometric Graph: Force-directed layout, node size by popularity, edge thickness by strength

**Forms:**
- Input fields: `h-10 rounded-md border` with focus ring
- Multi-select: Searchable dropdown with checkbox items
- Survey cards: Grid layout, checkbox/radio selection, photo + name + role
- Drag-and-drop: Card-based with clear drop zones, visual feedback on drag

**Feedback:**
- Toast notifications: Top-right, auto-dismiss 3s, shadcn toast component
- Loading states: Skeleton loaders matching content structure
- Progress bars: Thin (h-2) with primary color fill
- Badges: Pill-shaped, color-coded by status (pending/completed/warning)

**Interactive Elements:**
- Primary buttons: `bg-primary text-white` with hover darken
- Secondary buttons: `variant="outline"` with border
- Link buttons: `variant="ghost"` for tertiary actions
- Icon buttons: 40px touch target, subtle hover background

### E. Key Page Specifications

**Dashboard:**
- 4 metric cards in grid (2x2 mobile, 4 across desktop)
- 3 charts stacked vertically: Line (evolution), Bar (by department), Pie (choice distribution)
- Clean white space, visual hierarchy through card elevation

**Survey Distribution:**
- Employee multi-select at top with search functionality
- Generated links table: Name | Status badge | Unique link | Action buttons (copy, email icon, SMS icon)
- Copy button with immediate toast feedback "Link copiado!"
- Progress bar showing response completion percentage

**Sociometric Graph:**
- Full-width canvas with force-directed graph
- Sidebar controls: Filters (department, connection type), sliders (minimum strength)
- Bottom panel: Top 5 stars, isolated nodes, conflict indicators
- Node colors by department, size by popularity (10-40px diameter)

**Team Builder:**
- Split layout: 40% employee pool (left), 60% team zones (right, 3 columns)
- Draggable cards: Photo (48px circle), name, role
- Drop zones with dashed borders, active state on drag-over
- Cohesion gauge per team: 0-10 scale with color gradient
- Conflict warnings: Red alert icon if negative connections exist

**Survey Public Page:**
- Clean, centered layout (max-w-2xl)
- Language selector: Top-right floating
- Question cards: Full-width, numbered, instruction text
- Colleague grid: 3-4 columns desktop, 2 mobile, checkbox selection
- Selection counter: "Selecionados: 2/5" with primary color
- Submit button: Full-width on mobile, centered on desktop

### F. Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (single column, drawer navigation)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

**Mobile Adaptations:**
- Sidebar becomes full-screen drawer
- Metric cards stack vertically
- Tables scroll horizontally with sticky first column
- Graph controls move to bottom sheet
- Team builder switches to vertical tabs

### G. Multi-Language Considerations

- All text content uses i18n translation keys
- RTL support not required (PT/ES/EN all LTR)
- Language preference saved to localStorage
- Flag icons in language selector: 🇧🇷 🇪🇸 🇬🇧
- Dynamic text sizing to accommodate longer translations (ES often 20% longer)

### H. Interaction Patterns

- Hover states: Subtle background color change (5% opacity)
- Active states: Slight scale down (95%) for buttons
- Focus states: 2px ring with primary color
- Drag feedback: Semi-transparent clone follows cursor, drop zone highlights
- Loading: Skeleton screens match final content structure
- Error states: Red border + icon + descriptive text below field

---

## Images

**Dashboard:** No hero image. Focus on data visualization and metric cards.

**Survey Public Page:** 
- Employee photos: 48px circular avatars in colleague selection grid
- Placeholder: Initials on colored background if no photo available

**Sociometric Graph:**
- Node avatars: Small circular photos (20-40px based on popularity)
- Network visualization is the primary visual element

**Team Builder:**
- Employee cards: 48px circular photos
- Empty state: Illustration of team collaboration (centered, 300px width)

All images should be optimized WebP format, lazy-loaded below the fold.
# Frontend Implementation Plan: Orders, Clients & Order Creation Flow

## Overview

Add **Clients** and **Orders** to the app, and implement the main flow: **create order from Home** — add products with count on product cards, see draft in header, go to create-order page to pick client and submit.

---

## 1. Order Draft (Cart) State

We need a single source of truth for "products selected for the current order" so that:

- Home page can add items
- Header can show count and link to create order
- Create order page can display and edit the list

**Approach: Redux slice**

- **Slice name:** `orderDraft` (or `cart`)
- **State shape:**
    ```ts
    type OrderDraftItem = {
      productId: number;
      count: number;
      title: string;   // for display on create-order page without refetch
      code: string;
    };
    state: OrderDraftItem[]
    ```
- **Actions:** `addItem`, `removeItem`, `updateItemCount`, `clearDraft`
- **Rules:** When adding a product that already exists in draft, **sum** the count (or optionally replace — your choice; sum is often better UX).

**Files:**

- `src/entities/order-draft/` or `src/features/order-draft/model/order-draft.slice.ts` — slice + selectors
- Register slice in `src/app/providers/store/config/store.ts`

**Alternative:** If you prefer not to add a new entity, put the slice under `src/features/create-order/model/order-draft.slice.ts` and export from there.

---

## 2. API Layer (Clients & Orders)

Backend already exposes `/clients` and `/orders`. OpenAPI codegen is already configured for `orders` and `clients` in `openapi.config.cjs`.

**Steps:**

1. Run codegen (backend must be running):
   `pnpm run openapi:codegen` (or whatever script you use)
2. Ensure generated files exist:

- `src/entities/client/api/client.gen.ts`
- `src/entities/order/api/order.gen.ts`

3. Add enhanced API + hook exports:

- `src/entities/client/api/client.ts` — re-export hooks (`useGetClientsQuery`, `useGetClientByIdQuery`, `useCreateClientMutation`, etc.)
- `src/entities/order/api/order.ts` — re-export hooks (`useGetOrdersQuery`, `useGetOrderByIdQuery`, `useCreateOrderMutation`, etc.)

4. `src/entities/client/index.ts`, `src/entities/order/index.ts` — barrel exports

If codegen script or paths differ, adjust; the plan assumes the same pattern as `product` and `product-category`.

---

## 3. Navigation & Menu

**Sidebar (nav items):**

- Add **Clients** → `/admin/clients`
- Add **Orders** → `/admin/orders`
- Keep existing: Home, Products, Product Categories

**Header (AppBar):**

- When order draft has at least one item, show a link/button in the **Toolbar** (e.g. right side):  
  **"Order (N items)"** or **"Create order (N)"** linking to `/admin/orders/create`.
- Click navigates to create order page; no need to run in same process as the app (already separate from backend).

**Files to touch:**

- `src/widgets/navbar/model/nav-items.tsx` — add Clients and Orders
- `src/app/providers/router/ui/authenticated.layout.tsx` (or a small header component) — read draft from Redux, show "Order (N items)" link when `draft.length > 0`

---

## 4. Home Page: Add to Order on Product Cards

**Current behaviour:** Product cards are links to edit product.

**New behaviour (on Home only):**

- Each card shows:
    - Product image, title, code, total price (unchanged)
    - **Quantity:** number input (min 1, default 1)
    - **Button:** "Add to order"
- On "Add to order": dispatch `addItem({ productId, count, title, code })` (and optionally show a snackbar).
- Card click behaviour: either keep link to product edit/view for admins, or remove it on Home so only "Add to order" is primary. Recommend: keep a small "Edit" link so card body doesn’t navigate; main CTA is "Add to order".

**Implementation options:**

- **A)** Extend `ProductCard` with optional props: `showAddToOrder?: boolean`, `onAddToOrder?: (product, count) => void`. On Home we pass these; on admin we don’t.
- **B)** New component `OrderProductCard` used only on Home, which uses shared card layout + quantity + "Add to order".

Recommend **A** to avoid duplication.

**Files:**

- `src/shared/ui/components/product-card.tsx` — add quantity input + "Add to order" when `showAddToOrder` is true; call `onAddToOrder(product, count)`.
- `src/features/home/ui/products-section.tsx` — pass `showAddToOrder` and `onAddToOrder` that dispatches to order-draft slice (or use a thin container that reads dispatch and passes callback).

---

## 5. Create Order Page

**Route:** `/admin/orders/create`

**Behaviour:**

- Read order draft from Redux.
- If draft is empty → redirect to Home (or show empty state with link to Home).
- **List of items:** each row = product title, code, count (editable), line total (price × count). Use product’s total price from API for display; backend will compute actual order item price on submit. Allow **remove** and **change count** (update draft in Redux).
- **Client:** required. Autocomplete (or select) — search/select by client name or TRN. Use `useGetClientsQuery` with search param if API supports it, or load all and filter client-side for simplicity.
- **Submit:** call `useCreateOrderMutation` with body `{ clientId, items: draft.map(({ productId, count }) => ({ productId, count })) }`. On success: clear draft (`clearDraft`), show success snackbar, redirect to `/admin/orders` or to the created order `/admin/orders/:id/view`.
- **Cancel:** optional link back to Home; optionally clear draft on cancel (or keep draft so user can come back).

**Files (suggested structure):**

- `src/pages/create-order/` — page component that composes:
    - List of draft items (with count edit + remove)
    - Client selector
    - Submit / Cancel
- `src/features/create-order/ui/create-order-form.tsx` — form + validation (e.g. client required, at least one item; items already ensured by draft).
- Route: `src/app/providers/router/config/routes/order-create.route.ts` (or similar), under `adminRoute`; add to route tree.

---

## 6. Clients Management (CRUD)

Same pattern as Products / Product Categories.

**Routes:**

- List: `/admin/clients`
- Create: `/admin/clients/create`
- Edit: `/admin/clients/:clientId/edit`
- View: `/admin/clients/:clientId/view`

**Features:**

- `src/features/admin-clients/` — list table, filters (optional), create form, edit form, view form. Client has: name, address, priceAdjustment, taxpayerRegistrationNumber, phones (list; add/edit/remove phones per client if backend supports it).
- `src/pages/admin-clients/` — pages for list, create, edit, view.
- Routes: `clients.route.ts`, `client-create.route.ts`, `client-update.route.ts`, `client-view.route.ts`; register under `adminRoute`.

**Forms:** Use existing patterns (react-hook-form, Zod, shared controllers). Client create/update DTOs from codegen; phone management if you have nested endpoints.

---

## 7. Orders Management (List & View)

**Routes:**

- List: `/admin/orders`
- View: `/admin/orders/:orderId/view`
- Create: `/admin/orders/create` (already covered above)

No need for “edit order” in the first iteration if backend doesn’t support it or you defer it.

**Features:**

- `src/features/admin-orders/` — orders table (columns: e.g. id, client name, items count, created at, actions: view), view order (read-only: client info + items with productSnapshot, price, count).
- `src/pages/admin-orders/` — list page, view page.
- Routes: `orders.route.ts`, `order-view.route.ts`; add `order-create.route.ts` and register all under `adminRoute`.

---

## 8. Route Tree Summary

Add under `adminRoute`:

- `clientsRoute` → `/admin/clients`
- `clientCreateRoute` → `/admin/clients/create`
- `clientUpdateRoute` → `/admin/clients/:clientId/edit`
- `clientViewRoute` → `/admin/clients/:clientId/view`
- `ordersRoute` → `/admin/orders`
- `orderCreateRoute` → `/admin/orders/create`
- `orderViewRoute` → `/admin/orders/:orderId/view`

Update `route-tree.ts` to include these children.

---

## 9. Implementation Order

1. **Order draft slice** — state + integration in store.
2. **API** — run codegen for clients/orders; add entity API wrappers and exports.
3. **Nav** — add Clients and Orders to sidebar; add "Order (N items)" in AppBar when draft non-empty.
4. **Home** — extend ProductCard with add-to-order (quantity + button), wire to draft.
5. **Create order page** — route, read draft, client picker, submit, clear draft on success.
6. **Clients** — CRUD features + pages + routes.
7. **Orders** — list + view features + pages + routes.

---

## 10. Small Decisions to Align On

- **Draft keying:** One draft per session (single Redux state). No “multiple drafts” or “saved drafts” unless you add that later.
- **Product card on Home:** Keep or remove navigation to product edit; recommend keeping a small “Edit” link and making “Add to order” the main action.
- **Create order — empty draft:** Redirect to `/` vs show empty state with link; both are fine.
- **After order created:** Redirect to `/admin/orders` or `/admin/orders/:id/view`; clear draft in both cases.
- **Client list:** If backend supports search/filter for clients, use it in the Autocomplete; otherwise load a reasonable list and filter on the client.

If you want, next step can be a concrete list of file paths and code snippets for the draft slice and the ProductCard changes.

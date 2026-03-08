import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OrderDraftItem {
    productId: number;
    count: number;
    title: string;
    code: string;
    /** Unit price (per 1) at time of adding to draft. Optional for backwards compatibility with persisted drafts. */
    unitPrice?: number;
}

const initialState: OrderDraftItem[] = [];

export const orderDraftSlice = createSlice({
    name: 'orderDraft',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<OrderDraftItem>) => {
            const { productId, count, title, code, unitPrice } = action.payload;
            const existing = state.find((item) => item.productId === productId);
            if (existing) {
                existing.count += count;
            } else {
                state.push({ productId, count, title, code, unitPrice: unitPrice ?? 0 });
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            return state.filter((item) => item.productId !== action.payload);
        },
        updateItemCount: (state, action: PayloadAction<{ productId: number; count: number }>) => {
            const item = state.find((i) => i.productId === action.payload.productId);
            if (item) {
                item.count = Math.max(1, action.payload.count);
            }
        },
        clearDraft: () => [],
    },
});

export const { addItem, removeItem, updateItemCount, clearDraft } = orderDraftSlice.actions;

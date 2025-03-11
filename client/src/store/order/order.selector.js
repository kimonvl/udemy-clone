import { createSelector } from "reselect";

const selectOrderReducer = (state) => state.order;

export const selectOrderLoading = createSelector(
    [selectOrderReducer],
    (orderSlice) => orderSlice.loading
)

export const selectCurrentOrderId = createSelector(
    [selectOrderReducer],
    (orderSlice) => orderSlice.currentOrderId
)
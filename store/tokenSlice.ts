import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TokenCategory,
  SortConfig,
  SortField,
  SortDirection,
} from "@/types/token";

export interface TokenState {
  selectedCategory: TokenCategory;
  selectedTokenId: string | null;
  sortConfig: SortConfig;
  isModalOpen: boolean;
  priceUpdates: Record<string, number>;
}

const initialState: TokenState = {
  selectedCategory: "new-pairs",
  selectedTokenId: null,
  sortConfig: {
    field: "volume24h",
    direction: "desc",
  },
  isModalOpen: false,
  priceUpdates: {},
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<TokenCategory>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedTokenId: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    toggleSort: (state, action: PayloadAction<SortField>) => {
      const field = action.payload;

      if (state.sortConfig.field === field) {
        if (state.sortConfig.direction === "desc") {
          state.sortConfig.direction = "asc";
        } else if (state.sortConfig.direction === "asc") {
          state.sortConfig.direction = null;
        } else {
          state.sortConfig.direction = "desc";
        }
      } else {
        state.sortConfig.field = field;
        state.sortConfig.direction = "desc";
      }
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.selectedTokenId = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      setTimeout(() => {
        state.selectedTokenId = null;
      }, 300);
    },
    recordPriceUpdate: (state, action: PayloadAction<string>) => {
      state.priceUpdates[action.payload] = Date.now();
    },
    clearPriceUpdate: (state, action: PayloadAction<string>) => {
      delete state.priceUpdates[action.payload];
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedTokenId,
  setSortConfig,
  toggleSort,
  openModal,
  closeModal,
  recordPriceUpdate,
  clearPriceUpdate,
} = tokenSlice.actions;

export default tokenSlice.reducer;

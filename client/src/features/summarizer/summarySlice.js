// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { summaryAPI } from '../../services/api.js';

// // Async thunks
// export const createSummary = createAsyncThunk(
//   'summary/createSummary',
//   async (summaryData, { rejectWithValue }) => {
//     try {
//       const response = await summaryAPI.createSummary(summaryData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchSummaries = createAsyncThunk(
//   'summary/fetchSummaries',
//   async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await summaryAPI.getSummaries(page, limit);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchSummaryById = createAsyncThunk(
//   'summary/fetchSummaryById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await summaryAPI.getSummaryById(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteSummary = createAsyncThunk(
//   'summary/deleteSummary',
//   async (id, { rejectWithValue }) => {
//     try {
//       await summaryAPI.deleteSummary(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const searchSummaries = createAsyncThunk(
//   'summary/searchSummaries',
//   async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await summaryAPI.searchSummaries(query, page, limit);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   summaries: [],
//   currentSummary: null,
//   loading: false,
//   error: null,
//   pagination: {
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   },
//   searchResults: [],
//   searchQuery: '',
//   isSearching: false
// };

// const summarySlice = createSlice({
//   name: 'summary',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCurrentSummary: (state) => {
//       state.currentSummary = null;
//     },
//     clearSearchResults: (state) => {
//       state.searchResults = [];
//       state.searchQuery = '';
//       state.isSearching = false;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Summary
//       .addCase(createSummary.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summaries.unshift(action.payload);
//         state.currentSummary = action.payload;
//       })
//       .addCase(createSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Summaries
//       .addCase(fetchSummaries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSummaries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summaries = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchSummaries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Summary By ID
//       .addCase(fetchSummaryById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSummaryById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentSummary = action.payload;
//       })
//       .addCase(fetchSummaryById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete Summary
//       .addCase(deleteSummary.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summaries = state.summaries.filter(
//           summary => summary._id !== action.payload
//         );
//         if (state.currentSummary && state.currentSummary._id === action.payload) {
//           state.currentSummary = null;
//         }
//       })
//       .addCase(deleteSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Search Summaries
//       .addCase(searchSummaries.pending, (state) => {
//         state.isSearching = true;
//         state.error = null;
//       })
//       .addCase(searchSummaries.fulfilled, (state, action) => {
//         state.isSearching = false;
//         state.searchResults = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(searchSummaries.rejected, (state, action) => {
//         state.isSearching = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { 
//   clearError, 
//   clearCurrentSummary, 
//   clearSearchResults, 
//   setSearchQuery 
// } = summarySlice.actions;

// export default summarySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { summaryAPI } from '../../services/api.js';

// Async thunks for all API operations
export const createSummary = createAsyncThunk(
  'summary/createSummary',
  async (summaryData, { rejectWithValue }) => {
    try {
      const response = await summaryAPI.createSummary(summaryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSummaries = createAsyncThunk(
  'summary/fetchSummaries',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await summaryAPI.getSummaries(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSummaryById = createAsyncThunk(
  'summary/fetchSummaryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await summaryAPI.getSummaryById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSummary = createAsyncThunk(
  'summary/deleteSummary',
  async (id, { rejectWithValue }) => {
    try {
      await summaryAPI.deleteSummary(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchSummaries = createAsyncThunk(
  'summary/searchSummaries',
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await summaryAPI.searchSummaries(query, page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  summaries: [],
  currentSummary: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  },
  searchResults: [],
  searchQuery: '',
  isSearching: false
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSummary: (state) => {
      state.currentSummary = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.isSearching = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for createSummary
      .addCase(createSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries.unshift(action.payload);
        state.currentSummary = action.payload;
      })
      .addCase(createSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cases for fetchSummaries
      .addCase(fetchSummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cases for fetchSummaryById
      .addCase(fetchSummaryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSummaryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSummary = action.payload;
      })
      .addCase(fetchSummaryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cases for deleteSummary
      .addCase(deleteSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = state.summaries.filter(
          summary => summary._id !== action.payload
        );
      })
      .addCase(deleteSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cases for searchSummaries
      .addCase(searchSummaries.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchSummaries.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchSummaries.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload;
      });
  }
});

export const { 
  clearError, 
  clearCurrentSummary, 
  clearSearchResults, 
  setSearchQuery 
} = summarySlice.actions;

export default summarySlice.reducer;
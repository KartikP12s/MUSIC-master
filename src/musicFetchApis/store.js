import { configureStore } from '@reduxjs/toolkit'
import { shazamApi } from './shazamApi'

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]:shazamApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamApi.middleware)
})


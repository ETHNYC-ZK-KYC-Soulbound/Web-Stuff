import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import type { VerificationResponse } from "@worldcoin/id";

import type { RootState } from '../store'

// Define a type for the slice state
//
// NOTE: Don't use Set or Map
// - Set and Map are optimized for mutability (https://github.com/reduxjs/redux/issues/1499)
// - Set can't be serialized

// Redux State for Collection
interface ApplicationState {
  walletAddress: string | undefined
  worldIDResponse: VerificationResponse | undefined
  uploadedCID: string | undefined
}

// Define the initial state using that type
const initialState: ApplicationState = {
  walletAddress: undefined,
  worldIDResponse: undefined,
  uploadedCID: undefined,
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateWalletAddress: (state, action: PayloadAction<string | undefined>) => {
      state.walletAddress = action.payload
    },
    updateWorldIDResponse: (state, action: PayloadAction<VerificationResponse | undefined>) => {
      state.worldIDResponse = action.payload
    },
    updateUploadedCID: (state, action: PayloadAction<string | undefined>) => {
      state.uploadedCID = action.payload
    },
  },
})

export const { updateWalletAddress, updateWorldIDResponse, updateUploadedCID } = applicationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectWalletAddress = (state: RootState): string | undefined => state.application.walletAddress
export const selectWorldIDResponse = (state: RootState): VerificationResponse | undefined => state.application.worldIDResponse
export const selectUploadedCID = (state: RootState): string | undefined => state.application.uploadedCID

export default applicationSlice.reducer

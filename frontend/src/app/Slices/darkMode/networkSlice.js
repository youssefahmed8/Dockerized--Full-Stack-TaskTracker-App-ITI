import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOnline :true
}
const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setNetworkMode:(state,action)=>{
            state.isOnline = action.payload
        }
    }
})
export const {setNetworkMode} = networkSlice.actions

export default networkSlice.reducer;
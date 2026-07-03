import { createSlice } from '@reduxjs/toolkit'
import { Toaster, toast } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : []
}

console.log("Initial localStorage value:", localStorage.getItem('pastes'))

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload
      state.pastes.push(paste)

      // ✅ FIXED: stringify before saving
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      console.log(localStorage.getItem('pastes'))
      toast.success('Paste created successfully!')
    },
    updateToPaste: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)
      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste updated successfully!')
      }
    },
    resetAllPastes: (state) => {
      state.pastes = []
      localStorage.removeItem('pastes')
      toast.success('All pastes cleared!')
    },
    removeFromPaste: (state, action) => {
   const pasteId = action.payload;
   state.pastes = state.pastes.filter(p => p._id !== pasteId);
   localStorage.setItem('pastes', JSON.stringify(state.pastes));
   toast.success('Paste removed!');
}

  },
})

export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } = pasteSlice.actions
export default pasteSlice.reducer
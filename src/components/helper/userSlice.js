import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: { ID: '', email: '', token: '' } },
  reducers: {
    login: (state, action) => {
      state.value.ID = action.payload.ID;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;

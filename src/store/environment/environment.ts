import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const ENVIRONMENT_KEY = 'environment';

interface EnvironmentState {
  name: string | null;
}

const initialState: EnvironmentState = {
  name: null,
}

export const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setEnvironment(state, action: PayloadAction<string | null>) {
      const name: string | null = action.payload;
      state.name = name;
      localStorage.setItem(ENVIRONMENT_KEY, String(name));
    },
  }
})

export const environmentActions = environmentSlice.actions;
export const environmentReducer = environmentSlice.reducer;

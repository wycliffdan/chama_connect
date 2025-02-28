
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "@/models/client/config";

interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  prefs?: Record<string, any>;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk<
  { user: User; message: string }, // Return type
  { email: string; password: string }, // Payload type
  { rejectValue: string } // Error type
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Step 1: Create an email-password session
    await account.createEmailPasswordSession(email, password);

    // Step 2: Fetch the user details
    const user = await account.get();

    // Return success status and message
    return { user, message: "Login successful" };
  } catch (error: any) {
    // Handle specific error messages
    let errorMessage = "Invalid email or password";
    if (error.message.includes("Invalid credentials")) {
      errorMessage = "Invalid email or password";
    } else if (error.message.includes("Email not verified")) {
      errorMessage = "Please verify your email before logging in.";
    } else {
      errorMessage = error.message || "An error occurred during login.";
    }
    return rejectWithValue(errorMessage);
  }
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to log out the user
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Reducer to clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      // Handle rejected state
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "Login failed";
      });
  },
});

// Export actions
export const { logoutUser, clearError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
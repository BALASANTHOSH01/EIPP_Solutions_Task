import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, ValidationErrors } from '../types';

interface UserState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    validationErrors: ValidationErrors;
}

const initialState: UserState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    validationErrors: {},
};

const API_BASE_URL = 'http://localhost:5096/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();


    return data.map((u: any) => ({
        id: u.Id,
        firstName: u.FirstName,
        lastName: u.LastName,
        email: u.Email,
        createdAt: u.CreatedAt,
        dateOfBirth: u.DateOfBirth,
    }));
});


export const createUser = createAsyncThunk(
    'users/createUser',
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            return response.json();
        } catch (error) {
            return rejectWithValue({ message: 'Network error' });
        }
    }
);


export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (user: User, { rejectWithValue }) => {
        try {
          
            const payload: any = { ...user };
            if (!payload.password) delete payload.password;
            if (!payload.confirmPassword) delete payload.confirmPassword;

            console.log("Updating user with payload:", payload);

            const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (!response.ok) {
                console.error("Update failed with status:", response.status, data);
                return rejectWithValue(data);
            }

            return {
                ...data,
                password: "",
                confirmPassword: "",
            };
        } catch (error: any) {
            console.error("Network or unexpected error:", error);
            return rejectWithValue({ message: "Network error" });
        }
    }
);


export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return id;
    }
);

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const u = await response.json();

        return {
            id: u.Id,
            firstName: u.FirstName,
            lastName: u.LastName,
            email: u.Email,
            createdAt: u.CreatedAt,
            dateOfBirth: u.DateOfBirth,
            password: u.PasswordHash || "",          
        };
    }
);



const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setValidationErrors: (state, action: PayloadAction<ValidationErrors>) => {
            state.validationErrors = action.payload;
        },
        clearValidationErrors: (state) => {
            state.validationErrors = {};
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create user';
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action: any) => {
                state.loading = false;

                if (action.payload?.errors) {
                    const fieldErrors: ValidationErrors = {};
                    action.payload.errors.forEach((err: any) => {
                        const field = (err.field.charAt(0).toLowerCase() + err.field.slice(1)) as keyof ValidationErrors;
                        fieldErrors[field] = err.error;
                    });
                    state.validationErrors = fieldErrors;
                    state.error = Object.values(fieldErrors).join("\n");
                } else {
                    state.error = action.payload?.message || "Failed to update user";
                }
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(u => u.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            })
            // Fetch User By ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            });
    },
});

export const { setValidationErrors, clearValidationErrors, clearCurrentUser, clearError } = userSlice.actions;
export default userSlice.reducer;
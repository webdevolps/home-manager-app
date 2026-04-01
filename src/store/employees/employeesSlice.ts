import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '../../infrastructure/services/user.service';
import { Employee } from '@/hooks/useEmployees';

export interface EmployeesState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (tenantId: string, { rejectWithValue }) => {
    try {
      const data = await UserService.getEmployees(tenantId);
      return data as Employee[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching employees';
      return rejectWithValue(message);
    }
  }
);

export const toggleEmployeeStatus = createAsyncThunk(
  'employees/toggleStatus',
  async ({ employeeId, currentStatus }: { employeeId: string; currentStatus: string }, { rejectWithValue }) => {
    try {
      // API call to toggle status
      await UserService.toggleUserStatus(employeeId, currentStatus);
      return { employeeId, newStatus: currentStatus === 'active' ? 'inactive' : 'active' };
    } catch {
      return rejectWithValue('Failed to toggle employee status');
    }
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchEmployees
    builder.addCase(fetchEmployees.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // toggleEmployeeStatus (Optimistic / Pessimistic depends on implementation, we'll do pessimistic updating here)
    builder.addCase(toggleEmployeeStatus.fulfilled, (state, action) => {
      const { employeeId, newStatus } = action.payload;
      const employee = state.employees.find(e => e.id === employeeId);
      if (employee) {
        employee.status = newStatus as 'active' | 'inactive';
      }
    });
    // We could handle rejected state for toggle if needed, but for simplicity, error is fine.
    builder.addCase(toggleEmployeeStatus.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default employeesSlice.reducer;

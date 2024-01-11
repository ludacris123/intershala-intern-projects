import { createSlice, createAsyncThunk } from "@reduxjs/toolkit" 


// create action
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {

    const response = await fetch("https://6585680c022766bcb8c8900b.mockapi.io/crud", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }

})

// Read Action

export const showUser= createAsyncThunk("showUser",async(args,{rejectWithValue})=>{
    const response = await fetch("https://6585680c022766bcb8c8900b.mockapi.io/crud")
    try {
        const  result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// Delete Action
export const deleteUser = createAsyncThunk("delteUser",async(id,{rejectWithValue})=>{
    const response = await fetch(`https://6585680c022766bcb8c8900b.mockapi.io/crud/${id}`, {
        method: "Delete",

    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

// update Action

export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {

    const response = await fetch(`https://6585680c022766bcb8c8900b.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }

})

// create sliceeeeeee..........................
export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData:[],
    },
    reducers :{
        SearchUser: (state,action)=>{
            state.searchData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })// show user starts here
            .addCase(showUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users=action.payload
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })// delete user starts here
            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const {id}= action.payload;
                if(id){
                    state.users = state.users.filter((ele)=>ele.id !== id)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })// update users starts here
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele)=>(
                    ele.id ===action.payload.id ?action.payload :ele
                ))
                
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },

})

export default userDetail.reducer;
export const {SearchUser}= userDetail.actions
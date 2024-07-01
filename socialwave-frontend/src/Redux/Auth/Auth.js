import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../BaseUrl";

const Singup = createAsyncThunk("auth/Singup", async (values) => {
  try {
    const response = await http.post(`/user/signUp`, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data;
    }
  }
});
const Singin = createAsyncThunk("auth/Singin", async (values) => {
  try {
    const response = await http.post(`/user/signIn`, {
      email: values.email,
      password: values.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data;
    } else {
      return error.response.data;
    }
  }
});


const handleEye = createAsyncThunk("auth/handleEye", async (value) => {
  return value;
});
const forgetPassword = createAsyncThunk("auth/forgetPassword", async (values) => {
  try {
    const response = await http.post(`/user/findEmail`, {
      email: values.email,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data;
    }
  }
});
const updatePassword = createAsyncThunk("auth/updatePassword", async (values) => {
  try {
    const response = await http.post(`/user/updatePassword`, {
      password: values.password,
      token: values.token
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data;
    }
  }
});
const changeDarkmode = createAsyncThunk("auth/changeDarkmode", async (value) => {
  return value
});

const Auth = createSlice({
  name: "Auth",
  initialState: {
    successMsg: null,
    errorMsg: null,
    show: false,
    openEyePassword: false,
    openEyeC_Password: false,
    loader:false,
    darkMode:false
  },
  extraReducers: (builder) => {
    builder
    // registration
      .addCase(Singup.pending, (state, action) => {state.loader=true})
      .addCase(Singup.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.errorMsg = action.payload.message;
          state.show = true;
        } else {
          state.successMsg = action.payload.message;
          state.show = true;
        }
        state.loader = false
      })
      .addCase(Singup.rejected, (state, action) => {state.loader=false})
      // login
      .addCase(Singin.pending, (state, action) => {state.loader=true})
      .addCase(Singin.fulfilled, (state, action) => {
       
        if (action.payload.success === false) {
          state.show = true;
        } else {
          state.show = true;
        }
        state.loader = false
      })
      .addCase(Singin.rejected, (state, action) => {state.loader=false})
      // for  handle eye
      .addCase(handleEye.pending, (state, action) => {state.loader=true})
      .addCase(handleEye.fulfilled, (state, action) => {
        if (action.payload.from === "password") {
          state.openEyePassword = action.payload.value;
        } else {
          state.openEyeC_Password = action.payload.value;
        }
        state.loader = false
      })
      .addCase(handleEye.rejected, (state, action) => {state.loader=false})
      // forget Password 
      .addCase(forgetPassword.pending, (state, action) => {state.loader=true})
      .addCase(forgetPassword.fulfilled, (state, action) => {
       if(action.payload.success===true){
        state.successMsg=action.payload.msg
        state.show = true;
        state.loader = false
       }else{
        state.errorMsg=action.payload.msg
        state.show = true;
        state.loader = false
       }
      })
      .addCase(forgetPassword.rejected, (state, action) => {state.loader=false})
      //  for update Password 
      .addCase(updatePassword.pending, (state, action) => {state.loader=true})
      .addCase(updatePassword.fulfilled, (state, action) => {
       if(action.payload.success===true){
        state.successMsg=action.payload.msg
        state.show = true;
        state.loader = false
       }else{
        state.errorMsg=action.payload.msg
        state.show = true;
        state.loader = false
       }
      })
      .addCase(updatePassword.rejected, (state, action) => {state.loader=false})
      // change dark Mode
      .addCase(changeDarkmode.pending, (state, action) => {state.loader=true})
      .addCase(changeDarkmode.fulfilled, (state, action) => {
        state.darkMode=action.payload
        state.loader = false
      
      })
      .addCase(changeDarkmode.rejected, (state, action) => {state.loader=false});
  },
});
export { Singup, handleEye,Singin,forgetPassword,updatePassword,changeDarkmode };
export default Auth.reducer;

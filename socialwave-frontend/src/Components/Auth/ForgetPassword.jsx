import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordValidation } from "../Validations/Authvalidation";
import lock from "../../images/lock.png";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  FormControl
} from "@mui/material";
import { forgetPassword } from "../../Redux/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Toastify } from "../CommonPopup/Popup";
import { useNavigate } from "react-router-dom";
const schema = forgetPasswordValidation;

const ForgetPassword = () => {
  const dispatch=useDispatch()
  const navigate= useNavigate()
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  const {
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    
   dispatch(forgetPassword(values)).then((res)=>{
  
    if(res.payload.success===true){
      Toastify({data:'success', msg: res.payload.msg})
      
     }else{
      Toastify({data:'failed', msg: res.payload.msg});
      
     }

   }).catch((err)=>{
     console.log("error",err);
     Toastify({data:'failed', msg:'some thing went wrong!'});
   })
    reset();
  };
  return (
    <Box
    sx={{
      backgroundColor:darkMode ? "#1e1e1e":"#e1e1e27d",
      height:"772px",
     display:"flex",
     justifyContent:"center",
     alignItems:"center"

     }}
    >
    <Box
       sx={{
        maxWidth:1000,
        margin:"0 auto",
        backgroundColor:darkMode ? "#1e1e1e":"white",
        padding:"20px 20px",
        borderRadius:"15px",
        border:darkMode? "2px solid brown":""
      }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              ml: 50,
              mt: 25,
              width: 500,
              maxWidth: "100%",
              margin: "0 auto",
              color:darkMode? "white":""
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                margin: "0 auto",
                flexDirection: "row",
                paddingBottom:"25px"
                
              }}
            >
              <Box>
                <img src={lock} alt="lock" />
              </Box>
              <Box sx={{width:"50%"}}>
                <Typography variant="h4" component="h4">
                  Can’t log in?
                </Typography>
                <Typography sx={{marginLeft:"2px"}}>Restore access to your account</Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
           
               <Grid item xs={12} >
               <Typography sx={{display:"flex",marginTop:"15px"}}>We’ll send a recovery link to</Typography>
                <FormControl component="fieldset" fullWidth>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Email"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field}
                        sx={{
                          backgroundColor:darkMode?"black":"",
                         mx:"auto",
                         width:500
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              gap:8,
              display:"flex",
              justifyContent:"center"
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px",backgroundColor:"#198754" }}
              onClick={()=>navigate("/")}
            >
            Go  Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px",backgroundColor:"#095075" }}
            >
              Reset Password
            </Button>
          </Box>
        </form>
        </Box>
    </Box>
  );
};

export default ForgetPassword;

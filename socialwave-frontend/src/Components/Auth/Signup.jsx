import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { singUpValidation } from "../Validations/Authvalidation";
import {   useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { Singup,   handleEye } from "../../Redux/Auth/Auth";
import { Toastify } from "../CommonPopup/Popup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Grid,
  Typography,
} from "@mui/material";

const schema = singUpValidation;

const Signup = () => {

const navigate = useNavigate();
  const dispatch=useDispatch()

  const openEye = useSelector((s) => s.Auth.openEyePassword);
  const openCpEye = useSelector((s) => s.Auth.openEyeC_Password);
  const token = localStorage.getItem("token");
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token,navigate]);
  
  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleFieldBlur = async (fieldName) => {
    // Trigger validation when a field is blurred
    await trigger(fieldName);
  };
  const onSubmit = (values) => {
    dispatch(Singup(values))
    .then((response) => {
     if(response.payload.success===true){
      Toastify({data:'success', msg:response.payload.message});
      navigate("/")
     }else{
      Toastify({data:'failed', msg:response.payload.message});
     }
    })
    .catch((error) => {
      Toastify({data:'failed', msg:'some thing went wrong!'});
     console.log("Signup Error",error);
    
    });
     reset();
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
    sx={{
      backgroundColor: darkMode ? "#1e1e1e":"#e1e1e27d",
      height:"772px",
     display:"flex",
     justifyContent:"center",
     alignItems:"center"

     }}
  >
    <Box
     sx={{
      maxWidth:850,
      margin:"0 auto",
      backgroundColor: darkMode ? "#1e1e1e":"white",
      borderRadius:"15px",
      border:darkMode? "2px solid brown":""
    }}
    >
      <Grid container spacing={2}>
      <Grid item xs={12} md={8} sx={{padding:"30px 0px"}} >
      <form onSubmit={handleSubmit(onSubmit)}>
         
            <Typography variant="h4"  sx={{padding:"10px 0px", color:darkMode? "white":"",fontWeight:"bold", marginBottom:"5px"}}>
            Sign <span style={{color:"#233761"}}>Up</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <FormControl component="fieldset" fullWidth>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.firstName}
                      // helperText={errors.firstName?.message}
                      {...field}
                      onBlur={() => handleFieldBlur("firstName")}
                      sx={{
                        backgroundColor:darkMode?"black":"",
                        ml:"auto",
                        width:245
                      }}
                    />
                  )}
                />
              </FormControl>
              </Grid>
            <Grid item xs={6}>
            <FormControl component="fieldset" fullWidth>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.lastName}
                      // helperText={errors.lastName?.message}
                      {...field}
                      onBlur={() => handleFieldBlur("lastName")}
                      sx={{
                        backgroundColor:darkMode?"black":"",
                        mr:"auto",
                        width:245
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>

             <Grid item xs={12}>
             <FormControl component="fieldset" fullWidth>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      //   helperText={errors.email?.message}
                      {...field}
                      onBlur={() => handleFieldBlur("email")}
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

           <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <Controller
                    name="password"
                    control={control}
                    rules={singUpValidation.fields.password}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type={openEye ? "text" : "password"}
                        {...field}
                        error={!!fieldState.error}
                        // helperText={fieldState.error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  dispatch(
                                    handleEye({
                                      from: "password",
                                      value: !openEye,
                                    })
                                  )
                                }
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {!openEye ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={singUpValidation.fields.confirmPassword}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        type={openCpEye ? "text" : "password"}
                        fullWidth
                        {...field}
                        label="Confirm Password"
                        error={!!fieldState.error}
                        // helperText={fieldState.error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  dispatch(
                                    handleEye({
                                      from: "confirmPassword",
                                      value: !openCpEye,
                                    })
                                  )
                                }
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {!openCpEye ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
              <Box>
                <Button type="submit" variant="contained"  sx={{marginTop:"10px",backgroundColor:"#095075"}} >
                  Signup
                </Button>
              </Box>
             
            </form>
        </Grid>
        <Grid item xs={12} md={4} sx={{backgroundImage:'url(/image/signup.jpg)', marginTop:"16px", display:"flex", justifyContent:"center", alignItems:"center",backgroundPosition:"top", backgroundSize:"cover", borderRadius:"0px 15px 15px 0px"}}>
      <Typography  sx={{color:"white", fontWeight:"bold"}}>
      If you Already have account then
              <Button  sx={{backgroundColor:"white", color:"black", fontWeight:"bold","&:hover": {backgroundColor: "#40647ba3",color: "white"}}} onClick={()=>navigate("/")}>Login</Button>
            </Typography>
      </Grid>
      </Grid>
        </Box>
        </Box>
  );
};

export default Signup;

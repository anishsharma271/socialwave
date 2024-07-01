import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../Validations/Authvalidation";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { Singin,  handleEye } from "../../Redux/Auth/Auth";
import { Toastify } from "../CommonPopup/Popup";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Grid,
  Typography,
} from "@mui/material";
const schema = loginValidation;

const Login = () => {
  const openEye = useSelector((s) => s.Auth.openEyePassword);
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (values) => {
    dispatch(Singin(values))
      .then((response) => {
        if (response.payload.success === true) {
          Toastify({ data: "success", msg: response.payload.message });
          localStorage.setItem("token", response.payload.token);
          navigate("/home");
        } else {
          Toastify({ data: "failed", msg: response.payload.message });
        }
      })
      .catch((error) => {
        Toastify({ data: "failed", msg: "some thing went wrong!" });
        console.log("login Error Catch", error);
      });
    reset();
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
          <Box>
            <Typography variant="h4"   sx={{padding:"10px 0px", color:darkMode? "white":"", fontWeight:"bold"}}>
             SIGN <span style={{color:"#233761"}}>IN</span>
            </Typography>
            <Grid container spacing={2} >
              <Grid item xs={12} >
                <FormControl component="fieldset" fullWidth>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Email"
                        variant="outlined"
                      //  fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field}
                        sx={{
                          // mx:{xs:2, sm:0},
                        //  width: 400,
                         // marginBottom: 2,
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
                  rules={loginValidation.fields.password}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                    //  fullWidth
                      type={openEye ? "text" : "password"}
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
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
                       // width: 400,
                       // marginBottom: 2,
                       //mx:{xs:2, sm:0},
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
                <Box sx={{display:'flex', justifyContent:"end", marginRight:"30px"}}>
                <NavLink to="/forgetPassword">Forget Password?</NavLink>
                </Box>
            </Grid>
            </Grid>
          
             
          

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#095075",
                  color: "whitesmoke",
                }}
              >
                Signin
              </Button>
            </Box>
           
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={4}  sx={{backgroundImage:'url(/image/login.jpg)', marginTop:"16px", display:"flex", justifyContent:"center", alignItems:"center", backgroundPosition:"bottom", backgroundSize:"cover", borderRadius:"0px 15px 15px 0px"}}>
      <Typography  sx={{color:"white", fontWeight:"bold"}}>
              If you don't have an account then
              <Button  sx={{backgroundColor:"white", color:"black", fontWeight:"bold", "&:hover": {backgroundColor: "#40647ba3",color: "white"},}} onClick={()=>navigate("/signUp")}>SingUp</Button>
            </Typography>
      </Grid>
     </Grid>
      
       
      
    </Box>
      
    </Box>
  );
};

export default Login;

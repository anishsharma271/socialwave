import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidation } from "../Validations/Authvalidation";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEye,
  updatePassword,
} from "../../Redux/Auth/Auth";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Toastify } from "../CommonPopup/Popup";

const ChangePassword = () => {
  const schema = changePasswordValidation;
  const openEye = useSelector((s) => s.Auth.openEyePassword);
  const openCpEye = useSelector((s) => s.Auth.openEyeC_Password);
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  const {token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

 
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(updatePassword({ password: values.password, token: token }))
      .then((response) => {
        if (response.payload.success === true) {
          Toastify({ data: "success", msg: response.payload.msg });
          navigate("/");
        } else {
          Toastify({ data: "failed", msg: response.payload.msg });
        }
      })
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
        maxWidth:570,
        margin:"0 auto",
        backgroundColor: darkMode ? "#1e1e1e":"white",
        padding:"20px 0px",
        borderRadius:"15px",
        border:darkMode? "2px solid brown":""
      }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        
            <Typography variant="h5" component="h5" sx={{ mb: 2,color:darkMode? "white":"" }}>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <Controller
                    name="password"
                    control={control}
                    rules={changePasswordValidation.fields.password}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
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
                          mx:"auto",
                         width:500,
                         backgroundColor:darkMode?"black":""
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
                    rules={changePasswordValidation.fields.confirmPassword}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        type={openCpEye ? "text" : "password"}
                        fullWidth
                        {...field}
                        label="Confirm Password"
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
         
          <Box
            sx={{
              ml: 50,
              mt: 2,
              width: 200,
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#095075",
                color: "whitesmoke",
              }}
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;

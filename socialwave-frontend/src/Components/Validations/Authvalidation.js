import * as yup from 'yup';

const loginValidation=yup.object().shape({
   
  email: yup.string().email("Please enter valid email address").required("Email is required").trim(),
  password: yup.string()
    .min(8,"Password must be at least 8 characters")
     .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required").trim(),
  });
const forgetPasswordValidation=yup.object().shape({
    email: yup.string().email("Please enter valid email address").required("Email is required").trim(),
  });
const singUpValidation=yup.object().shape({
   
  email: yup.string().email("Please enter valid email address").required("Email is required").trim(),
  password: yup.string()
    .min(8,"Password must be at least 8 characters")
     .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required").trim(),
    confirmPassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password doesn't match , Please fill correct password")
    .trim(),
      
      lastName:yup.string().trim().required("Last name is required").min(3).max(12),
      firstName:yup.string().trim().required("First name is required").min(3).max(12)
  });

  const changePasswordValidation=yup.object().shape({
   
    password: yup.string()
    .min(8,"Password must be at least 8 characters")
     .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required").trim(),
    confirmPassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password doesn't match , Please fill correct password")
    .trim(),
    });
  export {loginValidation,singUpValidation,forgetPasswordValidation, changePasswordValidation}
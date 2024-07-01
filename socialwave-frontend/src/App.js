import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Header from './Components/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Dashboard/Home';
import Popup from './Components/CommonPopup/Popup';
import RouteGuard from './Components/RouteGuard';
import { useSelector } from 'react-redux';
import ForgetPassword from './Components/Auth/ForgetPassword';
import ChangePassword from './Components/Auth/ChangePassword';
import Footer from './Components/Footer';
import { ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
function App() {
  // Define your theme
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );
  const show=useSelector((s)=>s.Auth.show)
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
      {show ? <Popup/> : null}
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/signUp' element={<Signup/>}/>
        <Route exact path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route exact path='/changePassword/:token' element={<ChangePassword/>}/>
        <Route exact path='/home' element={< RouteGuard Component={Home} />}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;

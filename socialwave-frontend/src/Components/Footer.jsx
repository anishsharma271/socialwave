
import React from 'react';
import { Grid, Paper, Typography} from '@mui/material';
 import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#f8f9fa !important",
      // backgroundColor:"grey !important",
    padding: "15px 16px 9px 16px",
    borderTop:"2px solid grey",
    color:"black !important"
  },
  darkMode: {
    backgroundColor: "#1e1e1e !important",
    padding: "15px 16px 9px 16px",
    borderTop:"2px solid brown",
    color:"black !important"
  },
  section: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  darkModeSection: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: "#1e1e1e !important",

  },

}));

const Footer = () => {
  // const navigate = useNavigate();
  const authSelector= useSelector((state)=>state.Auth)
  const darkMode= authSelector.darkMode
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  return (
    <Paper className={darkMode? classes.darkMode: classes.footer} elevation={0}>
      <Grid container spacing={2}>
        {/* First Column */}

        <Grid item xs={12} md={4}>
          <Paper className={darkMode ? classes.darkModeSection:classes.section}>
            <Typography variant="h4" sx={{ color:darkMode? "white": 'black', marginBottom: '1rem', fontSize: '2rem' }}>Social Wave</Typography>
            <Typography>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod
              tincidunt mauris, ac imperdiet ligula malesuada vel.
             </Typography>
          </Paper>
         </Grid>
       

        {/* Second Column */}

        <Grid item xs={12} md={4}>
          <Paper className={darkMode ? classes.darkModeSection: classes.section}>
            <Typography variant="h4" sx={{ color: darkMode? "white":'black', fontSize: '1.25rem' }}>Contact Info</Typography>
            <Typography>
              Email: contact@example.com
              <br />
              Phone: +1 (555) 123-4567
            </Typography>
          </Paper>
        </Grid>

      

        {/* Third Column */}
        <Grid item xs={12} md={4}>
          <Paper className={darkMode ? classes.darkModeSection:classes.section}>
            <Typography variant="h6">Newsletter</Typography>
            <Typography>
              Subscribe to our newsletter for the latest news and offers.
            </Typography>
          </Paper>
        </Grid>
      
      </Grid>

      {/* Bottom Section */}
      <Grid sx={{color: darkMode? "white":"", marginTop:"7px"}}>        
         <Typography>&copy; {currentYear} Social Wave.All Rights Reserved</Typography>
       </Grid>
     
    </Paper>
  );
};

export default Footer;


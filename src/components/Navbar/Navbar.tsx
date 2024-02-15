import React from "react";
import "./Navbar.scss";
import { Link } from "@mui/material";
import { ClassicButton } from "../Elements/buttons/button";
import { makeStyles } from "tss-react/mui";
import { pxToRem } from "../../config/theme/utilities";

const useStyles = makeStyles()(() => {
  return {
    title: {
      cursor: "pointer",
      fontSize: pxToRem(32),
    },
  };
});

const Navbar = () => {
  const { classes } = useStyles();
  return (
    <div className='navbar-container'>
      <div className='left-section'>
        <img src={""} alt='Logo' className='logo' />
        <Link
          color='secondary'
          className={classes.title}
          href='/'
          underline='none'
        >
          Mon Petit Potager
        </Link>
      </div>
      <input type='text' placeholder='Rechercher' className='search-bar' />
      <div className='right-section'>
        <ClassicButton
          variant='contained'
          color='secondary'
          size='small'
          text='Calendrier des semis'
          rounded
          to='/calendrier'
        />
        {/*<button className='nav-button'>Espace personnel</button>*/}
      </div>
    </div>
  );
};

export default Navbar;

/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from '../../styles/footerStyle.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(styles);


export default function Footer(props) {
  const classes = useStyles();
  const settings = useSelector(state => state.settingsdata.settings);
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const navigate = useNavigate();
  const { t, i18n  } = useTranslation();
  const isRTL = i18n.dir();

  return (
    <footer className={footerClasses}>
      <div className={classes.container} style={{direction:isRTL === 'rtl' ? 'rtl' : 'ltr'}}>
        <div className={isRTL === 'rtl' ? classes.right : classes.left} style={{marginBottom: '12px'}}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}
                className={classes.block}
                onClick={(e) => { e.preventDefault(); navigate('/') }}
              >
                {t('home')}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}
                onClick={(e) => { e.preventDefault(); navigate('/bookings') }}
              >
                {t('myaccount')}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}
                onClick={(e) => { e.preventDefault(); navigate('/about-us') }}
              >
                {t('about_us')}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}
                onClick={(e) => { e.preventDefault(); navigate('/contact-us') }}
              >
                {t('contact_us')}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}  
                className={classes.block}
                onClick={(e) => { e.preventDefault(); navigate('/privacy-policy') }}
              >
                {t('privacy_policy')}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                style={{cursor:'pointer', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}  
                className={classes.block}
                onClick={(e) => { e.preventDefault(); navigate('/term-condition') }}
              >
                {t('term_condition')}
              </a>
            </ListItem>
          </List>
        </div>
        {settings && settings.CompanyWebsite?
        <div style={{marginTop: "12px" }}>
          &copy; {1900 + new Date().getYear() + " "} 
          <a
            href={settings.CompanyWebsite}
            className={aClasses}
            style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',}}
            target="_blank"
          >
            {settings.CompanyName}
          </a>
        </div>
        :null}
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};

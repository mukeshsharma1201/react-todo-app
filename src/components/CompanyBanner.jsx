import React from 'react';
import logo from '../assets/img/logo.svg';
import styles from './CompanyBanner.module.css';

export default function CompanyBanner(props) {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.imgContainer}>
        <img src={logo} alt="logo" className={styles.brandLogo} />
      </div>
      <div className={styles.brandNameContainer}>
        <span className={styles.brandName}>TODOs</span>
        <span className={styles.brandMoto}>Just do it</span>
      </div>
    </div>
  );
}

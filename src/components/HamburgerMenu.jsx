import React from 'react';
import CompanyBanner from '../components/CompanyBanner';

import styles from './HamburgerMenu.module.css';

const menuItems = [
  {
    title: 'TODOs',
    active: true,
  },
  {
    title: 'About',
    active: false,
  },
];

const handleMenuItemPress = (menuItem) => {
  alert(`${menuItem.title} clicked`);
};

const MenuItem = (props) => (
  <div
    className={styles.menuItemContainer}
    onClick={() => {
      handleMenuItemPress(props.menuItem);
    }}
  >
    <span className={styles.menuItemTitle}>{props.menuItem.title}</span>
  </div>
);

const HamburgerMenu = (props) => (
  <div className={styles.hamburgerMenuContainer}>
    <CompanyBanner />
    <div className={styles.navigationContainer}>
      {menuItems.map((menuItem, index) => (
        <MenuItem menuItem={menuItem} key={index} />
      ))}
    </div>
  </div>
);

export default HamburgerMenu;

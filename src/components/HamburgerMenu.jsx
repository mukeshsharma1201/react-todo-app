import React from 'react';
import CompanyBanner from '../components/CompanyBanner';

import styles from './HamburgerMenu.module.css';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    title: 'TODOs',
    active: true,
    route: '/',
  },
  {
    title: 'About',
    active: false,
    route: '/about',
  },
];

const handleMenuItemPress = (menuItem) => {};

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
        <NavLink
          exact
          to={menuItem.route}
          activeClassName={styles.activeNav}
          style={{
            fontWeight: 'normal',
            fontSize: '24px',
            lineHeight: '28px',
            textDecoration: 'none',
          }}
        >
          <MenuItem menuItem={menuItem} key={index} />
        </NavLink>
      ))}
    </div>
  </div>
);

export default HamburgerMenu;

import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  mainItemBank,
  mainItemEnglish,
} from '../../constants/mainItems.constants';

import './styles.scss';
import { userActions } from '../../redux/actions/users.actions';

import { connect } from 'react-redux';
import { useState } from 'react';

const ITEM_WORDS_NAME = 'Words';
const ITEM_CALC_NAME = 'Calculations';
function Navbar(props) {
  const { getAllWords, onSelectedItem } = props;
  const [selectedTab, setSelectedTab] = useState('Words');

  const handleOnClick = (name) => {
    if (name === ITEM_WORDS_NAME) {
      getAllWords({
        page: 1,
        size: 10,
      });
    }
    setSelectedTab(name);
    onSelectedItem(name);
  };
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='logo-container navbar-item'>
          <p className='navbar-item__logo'>Enlavoka</p>
        </div>
        {mainItemEnglish.map((item) => (
          <div
            key={item.name}
            className='navbar-item'
            onClick={() => handleOnClick(item.name)}
          >
            <FontAwesomeIcon
              className={[
                'navbar-item__icon',
                selectedTab === item.name ? 'navbar-item__icon--selected' : '',
              ].join(' ')}
              icon={item.icon}
            />
            <p
              className={[
                'navbar-item__text',
                selectedTab === item.name ? 'navbar-item__text--selected' : '',
              ].join(' ')}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...dispatch,
    getAllWords: (params) => dispatch(userActions.getAllUsersRequest(params)),
  };
};

Navbar.propTypes = {
  getAllBanks: PropTypes.any,
  onSelectedItem: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Navbar);

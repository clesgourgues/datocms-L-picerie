import React from 'react';
import logo from '../assets/logo_epicerie.png';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <div className='showcase__container'>
    <img src={logo} alt='Logo Lépicerie bordelaise' className='showcase__logo' />
    <h1 className='showcase__intro'>Quelle tristesse, cette page n'existe pas !</h1>
    <div className='sheet__body'>
      <Link to='/'>
        <p>Cliquez ici pour revenir à l'accueil</p>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;

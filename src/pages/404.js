import React from 'react';
import logo from '../assets/logo_epicerie.png';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <div className='showcase__container'>
    <img src={logo} alt='Logo Lépicerie bordelaise' className='showcase__page' />
    <h1 className='showcase__notfound'>Quelle tristesse, cette page n'existe pas !</h1>
    <Link to='/' className='showcase__notfound-back'>
      Cliquez ici pour revenir à l'accueil
    </Link>
  </div>
);

export default NotFoundPage;

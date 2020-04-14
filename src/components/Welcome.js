import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { isValidCp, isValidFiveNumber } from '../helpers/location';
import logo from '../assets/logo_epicerie.png';

const Welcome = ({ hasSeenModal, setModalSeen, text }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cp, setCp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = e => {
    setSubmitted(true);
    e.preventDefault();
    if (!isValidFiveNumber(cp)) {
      setMessage('Merci de rentrer un code postal valide !');
    } else if (isValidCp(cp)) {
      setMessage('Nous pouvons vous livrer !');
    } else setMessage('Code postal non desservi');
  };

  useEffect(() => {
    if (!hasSeenModal) {
      setTimeout(() => setModalOpen(true), 1000);
    }
  });

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setModalSeen(true);
      }}
      center
    >
      <div className='welcome'>
        <img src={logo} alt='Logo Epicerie bordelaise' className='welcome__logo' />
        <div className='welcome__intro'>{text}</div>
        <p className='welcome__validation'>Nous livrons uniquement sur Bordeaux Métropole.</p>
        <p className='welcome__validation'>
          En cas de doute, vous pouvez valider votre code postal :
        </p>
        <form className='welcome__form'>
          <input
            type='text'
            name='cp'
            required
            minLength='5'
            maxLength='5'
            value={cp}
            onChange={e => setCp(e.target.value)}
            className='welcome__cp'
            placeholder='33000'
          />

          <button className='sheet__button' onClick={onSubmit}>
            Valider
          </button>
        </form>
        <p className='welcome__confirmation'>
          {submitted && <span className='welcome__validation'>{message}</span>}
        </p>
      </div>
    </Modal>
  );
};

export default Welcome;

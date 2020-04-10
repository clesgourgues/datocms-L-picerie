import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import logo from '../assets/logo_epicerie.png';

const Protect = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mdp, setMdp] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (mdp === 'brasserie') {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => setModalOpen(true), 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      center
      showCloseIcon={false}
      closeOnOverlayClick={false}
      classNames={{ overlay: 'customOverlay' }}
    >
      <div className='welcome'>
        <img src={logo} alt='Logo Epicerie bordelaise' />
        <p className='welcome__validation'>Site en construction</p>
        <form className='welcome__form'>
          <input
            type='text'
            name='mdp'
            required
            maxLength='15'
            value={mdp}
            onChange={e => setMdp(e.target.value)}
            className='welcome__cp'
          />

          <button className='sheet__button' onClick={onSubmit}>
            Valider
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default Protect;

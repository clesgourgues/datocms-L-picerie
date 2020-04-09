import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { isValidCp, isValidFiveNumber } from '../helpers/location';
import Img from 'gatsby-image';

const Protect = ({ logo }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [mdp, setMdp] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (mdp === 'brasserie') {
      setModalOpen(false);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      center
      showCloseIcon={false}
      closeOnOverlayClick={false}
      classNames={{
        overlay: 'customOverlay'
      }}
    >
      <div className='welcome'>
        <Img className='welcome__logo' fluid={logo.fluid} />
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

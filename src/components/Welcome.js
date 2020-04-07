import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { isValidCp } from '../helpers/location';
import Img from 'gatsby-image';

const Welcome = ({ hasSeenModal, setModalSeen, text, logo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cp, setCp] = useState('');
  const [validCp, setValidCp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!hasSeenModal) {
      setTimeout(() => setModalOpen(true), 500);
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
        <Img className='welcome__logo' fluid={logo.fluid} />
        <div className='welcome__intro'>{text}</div>
        <p className='welcome__validation'>
          Nous livrons uniquement sur <span style={{ color: 'white' }}>Bordeaux Métropole</span>
        </p>
        <p className='welcome__validation'>
          En cas de doute, vous pouvez valider votre code postal :
        </p>
        <form className='welcome__form'>
          <input
            type='text'
            name='cp'
            required
            maxLength='5'
            value={cp}
            onChange={e => setCp(e.target.value)}
            className='welcome__cp'
          />

          <button
            className='sheet__button'
            onClick={e => {
              e.preventDefault();
              if (isValidCp(cp)) {
                setValidCp(true);
              } else setValidCp(false);
              setSubmitted(true);
            }}
          >
            Valider
          </button>
        </form>
        <p className='welcome__confirmation'>
          {submitted &&
            (validCp ? (
              <span className='welcome__validation'>Nous pouvons vous livrer !</span>
            ) : (
              <span className='welcome__validation'>Code postal non desservi</span>
            ))}
        </p>
      </div>
    </Modal>
  );
};

export default Welcome;

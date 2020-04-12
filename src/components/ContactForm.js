import React from 'react';

const ContactForm = ({ user }) => {
  return (
    <form
      name='contact'
      method='POST'
      data-netlify-honeypot='bot-field'
      data-netlify='true'
      action='/success'
      className='Contact__form'
    >
      <input type='hidden' name='bot-field' />
      <input type='hidden' name='form-name' value='contact' />
      <input
        className='Contact__form__input'
        name='email'
        placeholder='Votre email'
        type='email'
        defaultValue={user ? user : ''}
        required
        maxLength='50'
      />
      <textarea
        name='message'
        className='Contact__form__text'
        placeholder='Votre message'
        required
        maxLength='500'
      />
      <input type='submit' className='sheet__button' value='Valider' />
    </form>
  );
};

export default ContactForm;

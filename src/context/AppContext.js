import React, { useEffect, useState } from 'react';

const defaultState = {
  hasSeenModal: false,
  cart: null
};

const AppContext = React.createContext(defaultState);

const AppProvider = ({ children }) => {
  const [hasSeenModal, setModalSeen] = useState(false);
  const [cart, setCart] = useState(null);

  const snipcartReady = async () => {
    window.Snipcart.api.session.setLanguage('fr-FR');
    window.Snipcart.store.subscribe(async () => {
      const store = await window.Snipcart.store.getState();
      const cart = store.cart ? store.cart : null;
      setCart(cart);
    });
  };

  useEffect(() => {
    document.addEventListener('snipcart.ready', snipcartReady());
    return document.removeEventListener('snipcart.ready', snipcartReady());
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        hasSeenModal,
        setModalSeen: () => setModalSeen(true)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };

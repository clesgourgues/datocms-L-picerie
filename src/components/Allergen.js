import React from 'react';

const allergenMap = {
  arachides: 'Arachides',
  celeri: 'Céleri',
  coques: 'Fruits à coques',
  crustaces: 'Crustacés',
  gluten: 'Gluten',
  lait: 'Lait',
  lupins: 'Lupins',
  mollusques: 'Mollusques',
  moutarde: 'Moutarde',
  oeufs: 'Oeufs',
  poisson: 'Poisson',
  sesame: 'Sésame',
  soja: 'Soja',
  sulfites: 'Sulfites'
};

const Allergen = ({ allergens }) => {
  return (
    <div className='allergen'>
      <h6 className='sheet__inner-title'>Allergènes</h6>
      <div className='allergen__items'>
        {allergens.map((allergen, index) => (
          <div className='allergen__item' key={`allergen-${index}`}>
            <img
              src={require('../assets/' + allergen + '.png')}
              alt={`Allergène ${allergenMap[allergen]}`}
              className='allergen__logo'
            />
            <p>{allergenMap[allergen]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allergen;

import React from 'react';

import config from '../../config';

const ImageBlock = props => {
  return (
    <img
      className='w-25 h-25'
      src={`${config.apiURL}/uploads/${props.image}`}
      alt="venue"
    />
  );
};

export default ImageBlock;
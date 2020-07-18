import React from 'react';

const ImageBlock = props => {
  return (
    <img
      className='w-25 h-25'
      src={`http://localhost:8080/uploads/${props.image}`}
      alt="venue"
    />
  );
};

export default ImageBlock;
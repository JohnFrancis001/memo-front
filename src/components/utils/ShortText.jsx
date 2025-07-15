import React from 'react';

const ShortText = ({ text = '', limit = 3 }) => {
  const safeText = typeof text === 'string' ? text : '';
  const short = safeText.length > limit ? safeText.slice(0, limit) + '...' : safeText;

  return (
    <>
      {/* Text shorteners for small screen sizes */}
      <span className='hidden sm:inline'>{text}</span>
      <span className='inline sm:hidden'>{short}</span>
    </>
  );
};

export default ShortText;

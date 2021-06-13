import React from 'react';
import PropTypes from 'prop-types';

function DeleteBtn({ nameBtn }) {
  return (
    <button
      className="btn"
      type="button"
      aria-label="button"
    >
      <span className="btn__name">{nameBtn}</span>
    </button>
  );
}
DeleteBtn.propTypes = {
  nameBtn: PropTypes.string.isRequired
};

export default DeleteBtn;

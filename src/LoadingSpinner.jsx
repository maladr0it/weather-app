import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import FontAwesome from 'react-fontawesome';

const LoadingSpinner = ({ size }) => (
  <Spinner>
    <FontAwesome name="spinner" size={size} />
  </Spinner>
);

LoadingSpinner.propTypes = {
  size: PropTypes.string.isRequired,
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  animation: ${rotate} 2s linear infinite;
`;

export default LoadingSpinner;

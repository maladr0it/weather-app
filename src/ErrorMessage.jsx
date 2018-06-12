import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const ErrorMessage = () => (
  <React.Fragment>
    <h1>
      <FontAwesome name="exclamation-triangle" />
    </h1>
    <Message>
      The service encountered an error.
      <br />
      Please try again.
    </Message>
  </React.Fragment>
);

const Message = styled.p`
  text-align: center;
`;

export default ErrorMessage;

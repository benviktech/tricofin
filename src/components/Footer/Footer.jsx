import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.div`
    background-color: #D7D7D7;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const StyledSpan = styled.span` 
    font-size: 12px;
    color: #888;
`;

const Footer = () => (
  <FooterSection>
    <StyledSpan>
      Copyright &copy; Tricofin.
    </StyledSpan>
    <StyledSpan>
      2021
    </StyledSpan>
  </FooterSection>
);

export default Footer;

import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.div`
    margin-top: 5px;
    background-color: #3A5794;
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
    font-weight: bold;
    color: #fff;
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

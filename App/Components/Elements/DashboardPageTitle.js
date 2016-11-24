import styled from 'styled-components';

const DashboardPageTitle = styled.h2`
  position: absolute;
  top: -8%;
  right: -0.8em;
  font-size: 4em;
  font-weight: 100;
  color: #787878;
  font-family: 'Crimson Text Italic', sans-serif;

  @media(max-width: 1020px) {
    top: -4.5%;
  }

  @media(max-width: 720px) {
    top: -2.25%;
  }
`;

export default DashboardPageTitle;

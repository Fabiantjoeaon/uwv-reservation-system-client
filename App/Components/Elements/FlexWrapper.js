import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  width: ${props => props.width};
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
`;

export default FlexWrapper;

import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  width: ${props => props.width};
  ${props => props.space_between ? 'justify-content: space-between' : null};
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
`;

export default FlexWrapper;

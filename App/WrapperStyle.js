import styled from 'styled-components';
import moveGradient from './Styles/Keyframes/moveGradient.js'

const Wrapper = styled.div`
  background: repeating-linear-gradient(${props => props.gradientRotation}, #cc6bbb, #e6b11f);
  background-size: 3500% 3500%;
  width:100vw;
  height:100vh;
  animation: ${moveGradient} ${props => props.duration} infinite linear;
`;

export default Wrapper;

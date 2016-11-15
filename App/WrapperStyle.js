import styled from 'styled-components';
import moveGradient from './Styles/Keyframes/moveGradient.js'

const Wrapper = styled.div`
  background: repeating-linear-gradient(${props => props.gradientRotation}, #cc6bbb, #9ab9fe);
  background-size: 1000% 1000%;
  width:100vw;
  height:100vh;
  animation: ${moveGradient} 20s infinite linear;
`;

export default Wrapper;

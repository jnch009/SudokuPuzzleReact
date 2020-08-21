import styled from 'styled-components';
const SquareBorderTopLeft = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledTopLeft = styled(SquareBorderTopLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderTopLeft,
  DisabledTopLeft
};
import styled from 'styled-components';
const SquareBorderTopRight = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledTopRight = styled(SquareBorderTopRight)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderTopRight,
  DisabledTopRight,
};

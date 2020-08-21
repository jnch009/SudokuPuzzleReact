import styled from 'styled-components';
const SquareBorderLeft = styled.button`
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledLeft = styled(SquareBorderLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderLeft,
  DisabledLeft,
};

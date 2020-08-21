import styled from 'styled-components';
const SquareBorderRight = styled.button`
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledRight = styled(SquareBorderRight)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderRight,
  DisabledRight,
};

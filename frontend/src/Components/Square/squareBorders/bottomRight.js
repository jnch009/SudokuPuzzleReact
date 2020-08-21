import styled from 'styled-components';
const SquareBorderBottomRight = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledBottomRight = styled(SquareBorderBottomRight)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderBottomRight,
  DisabledBottomRight,
};
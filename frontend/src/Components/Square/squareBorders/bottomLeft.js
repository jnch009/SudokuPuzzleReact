import styled from 'styled-components';
const SquareBorderBottomLeft = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledBottomLeft = styled(SquareBorderBottomLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderBottomLeft,
  DisabledBottomLeft,
};

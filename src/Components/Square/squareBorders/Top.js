import styled from 'styled-components';
const SquareBorderTop = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledTop = styled(SquareBorderTop)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
    SquareBorderTop,
    DisabledTop
}
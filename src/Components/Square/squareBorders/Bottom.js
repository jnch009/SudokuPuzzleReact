import styled from 'styled-components';
const SquareBorderBottom = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;
 
const DisabledBottom = styled(SquareBorderBottom)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  SquareBorderBottom,
  DisabledBottom,
};

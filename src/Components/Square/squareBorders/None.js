import styled from 'styled-components';
const noBorder = styled.button`
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledNoBorder = styled(noBorder)`
  &&& {
    cursor: not-allowed;
  }
`;

export default {
  noBorder,
  DisabledNoBorder,
};

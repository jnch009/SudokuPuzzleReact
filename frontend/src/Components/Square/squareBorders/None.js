import styled from 'styled-components';
const noBorder = styled.button`
  color: ${props => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default {
  noBorder,

};

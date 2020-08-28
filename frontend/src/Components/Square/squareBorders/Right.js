import styled from 'styled-components';
const SquareBorderRight = styled.button`
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default {
  SquareBorderRight,
};

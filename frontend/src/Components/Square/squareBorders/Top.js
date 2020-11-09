import styled from 'styled-components';
const SquareBorderTop = styled.button`
  border-top: ${(props) => `0.2em ${props.borderColor} solid`};
  color: ${(props) => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default SquareBorderTop;

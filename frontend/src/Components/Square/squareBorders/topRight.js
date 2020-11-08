import styled from 'styled-components';

const SquareBorderTopRight = styled.button`
  border-top: ${(props) => `0.2em ${props.borderColor} solid`};
  border-right: ${(props) => `0.2em ${props.borderColor} solid`};
  color: ${(props) => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default SquareBorderTopRight;

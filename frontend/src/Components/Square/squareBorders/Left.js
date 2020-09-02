import styled from 'styled-components';
const SquareBorderLeft = styled.button`
  border-left: ${(props) => `0.2em ${props.borderColor} solid`};
  color: ${(props) => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default {
  SquareBorderLeft,
};

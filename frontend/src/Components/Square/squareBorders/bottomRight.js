import styled from 'styled-components';
const SquareBorderBottomRight = styled.button`
  border-bottom: ${(props) => `0.2em ${props.borderColor} solid`};
  border-right: ${(props) => `0.2em ${props.borderColor} solid`};
  color: ${(props) => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default {
  SquareBorderBottomRight,
};

import styled from 'styled-components';
const SquareBorderBottomLeft = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  cursor: ${(props) => (props.modify ? null : 'not-allowed!important')};
`;

export default {
  SquareBorderBottomLeft
};

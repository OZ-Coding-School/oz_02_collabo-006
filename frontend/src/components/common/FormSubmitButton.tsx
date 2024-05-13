import { activeStyles, hoverStyles } from 'constant/buttonPseudoClass';
import styled from 'styled-components';

interface SsubmitButtonProps {
  $primary?: boolean;
  $validated?: boolean; // 유효성 검사가 완료되었는지 나타내는 prop
}

const SsubmitButton = styled.button<SsubmitButtonProps>`
  width: 100%;
  min-width: 260px;
  height: 40px;
  margin-top: 36px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: ${(props) => (props.$validated ? '#b88cde' : '#b9b9b9')};
  border-radius: 20px;
  border: none;
  cursor: pointer;
  flex: 0 0 auto; 

  ${hoverStyles}
  ${activeStyles}
`;

export default SsubmitButton;

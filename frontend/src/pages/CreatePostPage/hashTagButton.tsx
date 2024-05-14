import { LIGHT_PURPLE, TEXT_BLACK } from 'constant/colors';
import styled from 'styled-components';

const HashTagButtonContainer = styled.div``;
const ButtonListWrap = styled.div``;

interface ButtonProps {
  $active: boolean; // Define a custom property
}
const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.$active ? LIGHT_PURPLE : '#f2f0f5')};
  color: ${TEXT_BLACK};
  font-size: 14px;
  font-weight: bolder;
  line-height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  margin: 12px 5px 6px;
  transition:
    background-color 0.2s ease,
    0.2s ease-in-out;

  &:hover {
    background-color: ${LIGHT_PURPLE};
    transform: scale(1.05);
  }
`;

export const buttonLists = [
  '#유광',
  '#무광',
  '#짧은손톱',
  '#긴손톱',
  '#케어',
  '#글리터',
  '#스퀘어',
  '#라운드스퀘어',
  '#아몬드',
  '#스틸레토',
  '#발레리나',
  '#라운드',
  '#오벌',
  '#오벌라운드',
  '#코핀',
  '#아크릴',
  '#연장',
];
interface HashTagButtonProps {
  activeTags: string[];
  toggleTag: (tag: string) => void;
}

const HashTagButton: React.FC<HashTagButtonProps> = ({
  activeTags,
  toggleTag,
}) => {
  return (
    <HashTagButtonContainer>
      <ButtonListWrap>
        {buttonLists.map((item, index) => {
          const isActive = activeTags.includes(item);
          return !isActive ? (
            <Button
              key={index}
              onClick={() => toggleTag(item)}
              $active={isActive}
            >
              {item}
            </Button>
          ) : null;
        })}
      </ButtonListWrap>
    </HashTagButtonContainer>
  );
};

export default HashTagButton;

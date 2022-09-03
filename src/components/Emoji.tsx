import styled from 'styled-components';

const EmojiItem = styled.span`
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;

export default function Emoji({ onClick, code }: { onClick: () => void; code: string }) {
  return <EmojiItem onClick={onClick} dangerouslySetInnerHTML={{ __html: code }}></EmojiItem>;
}

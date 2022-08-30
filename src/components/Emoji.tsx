import styled from 'styled-components';

const EmojiItem = styled.span`
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;

export default function Emoji({ code }: { code: string }) {
  return <EmojiItem>{code}</EmojiItem>;
}

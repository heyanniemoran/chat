import React, { useMemo, useState, useCallback } from 'react';
import { encode } from 'html-entities';
import styled, { keyframes } from 'styled-components';
import '@fontsource/pt-sans';
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Smile } from '../assets/smile.svg';
import { ReactComponent as Send } from '../assets/send.svg';
import TextareaAutosize from 'react-textarea-autosize';
import Emoji from './Emoji';

const show = keyframes`
  from {
    opacity: 0;
    bottom: 0;
  }
  to {
    opacity: 100%;
    bottom: 15px;
  }
`;

const ChatWrapper = styled.div`
  font-family: 'Roboto';
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  animation: ${show} 1s linear;
  @media (max-width: 410px) {
    position: relative;
    width: 100vw;
    height: 100vh;
    right: unset;
    bottom: unset;
  }
`;
const ToggleButton = styled.button`
  border-radius: 100%;
  background-color: #0848c0;
  width: 58px;
  height: 58px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  margin-top: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:before {
    content: '';
    width: 58px;
    height: 58px;
    left: 0;
    top: 0;
  }
`;
const ChatDialog = styled.div`
  max-width: 410px;
  min-width: 390px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(51, 51, 51, 0.2);
  border-radius: 4px;
  width: 100%;
  max-height: 750px;
  min-height: 10vh;
  border-top: 5px solid #0848c0;
  padding: 16px;
  z-index: 99;
  @media (max-width: 410px) {
    max-width: unset;
    width: 100%;
    min-width: unset;
    min-height: unset;
    max-height: unset;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
`;
const ChatDesc = styled.div``;
const ChatTitle = styled.h2`
  color: #333333;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 37px;
`;
const ChatText = styled.p`
  color: #0c1014;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 8px;
`;
const ChatTextarea = styled(TextareaAutosize)`
  font-size: 14px;
  line-height: 1.4;
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px #d6dade;
  border-radius: 2px;
  width: 100%;
  padding: 10px 38px;
  cursor: text;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-left: 0;
  }
`;
const ChatRubrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;
const ChatRubrica = styled.button`
  background: #ffffff;
  border: 1px solid #dee3e9;
  box-shadow: 0px 2px 4px rgba(44, 48, 52, 0.15);
  border-radius: 8px;
  color: #0848c0;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  padding-top: 17px;
  padding-bottom: 13px;
  cursor: pointer;
  &:hover {
    background: rgba(8, 72, 192, 0.12);
  }
`;
const ChatBody = styled.div`
  overflow-y: scroll;
  height: 410px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d6dade;
    border-radius: 20px;
    border-left: 6px solid transparent;
  }
  @media (max-width: 410px) {
    flex: 1;
  }
`;
const ChatFooter = styled.div`
  margin-top: 6px;
  position: relative;
`;
const SmileButton = styled(Smile)`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 9;
  cursor: pointer;
`;
const ChatTime = styled.span`
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  color: #9ea4ac;
  padding: 29px 0 10px;
  display: block;
`;
const ChatFrom = styled.div`
  background: #f3f5f7;
  padding: 9px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  border-radius: 8px;
  max-width: 80%;
  margin-top: 16px;
  margin-right: auto;
  display: inline-block;
`;
const ChatTo = styled.div`
  background: #deecfd;
  padding: 9px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  border-radius: 8px;
  max-width: 80%;
  margin-top: 16px;
  margin-left: auto;
  display: inline-block;
`;
const Time = styled.span`
  bottom: 8px;
  right: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #9ea4ac;
  text-align: right;
  display: block;
`;

const SendButton = styled(Send)`
  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
  right: 6px;
  cursor: pointer;
`;

export default function Chat() {
  const [visible, setVisible] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  interface Message {
    id: number;
    text: string;
    time: string;
    my: boolean;
  }
  const [messages, setMessages] = useState((): Message[] => {
    return [
      {
        id: 1,
        text:
          'Уточнить перечень предоставляемых услуг и их наличие в центре госуслуг «Мои документы» можно по ссылке:\n' +
          'https://md.mos.ru/katalog-uslug/perechen-uslug Узнать адреса центров госуслуг города Москвы:\n' +
          'https://md.mos.ru/find-your-dcp/structure',
        time: '01:46',
        my: false,
      },
      {
        id: 2,
        text: 'Ну здорова отец.',
        time: '01:47',
        my: true,
      },
    ];
  });

  const [nextId, setNextId] = useState(100);
  const getNextId = useCallback(() => {
    setNextId((current) => current + 1);
    return nextId;
  }, [nextId]);

  const [text, setText] = useState('');
  const send = useCallback(() => {
    const now = new Date();
    setMessages((current) => {
      const copy = current.slice();
      copy.push({
        id: getNextId(),
        text: encode(text).replace(/(?:\r\n|\r|\n)/g, '<br />'),
        time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        my: true,
      });
      return copy;
    });
    setText('');
  }, [text]);
  const handleKeyPress = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.ctrlKey && ev.code === 'Enter') {
        ev.preventDefault();
        send();
      }
    },
    [send],
  );

  const onEmojiClick = () => {
    setEmojiVisible((visiemojiVisibleble) => !emojiVisible);
  };
  return (
    <>
      <ChatWrapper>
        {visible && (
          <ChatDialog>
            <MobileClose onClick={() => setVisible((visible) => !visible)}>
              <Close width="14" height="14" />
            </MobileClose>
            <ChatBody>
              <ChatDesc>
                <ChatTitle>Здравствуйте &#128075;</ChatTitle>
                <ChatText>
                  Сотрудники службы поддержки mos.ru ответят на вопросы о работе портала, окажут помощь в получении
                  госуслуг и поиске информации
                </ChatText>
                <ChatRubrics>
                  <ChatRubrica>Центры госуслуг «Мои документы»</ChatRubrica>
                  <ChatRubrica>Вопросы по Личному кабинету</ChatRubrica>
                  <ChatRubrica>Молочная кухня</ChatRubrica>
                  <ChatRubrica>Карта Москвича</ChatRubrica>
                  <ChatRubrica>&#128270; Найти ответ в базе знаний</ChatRubrica>
                </ChatRubrics>
              </ChatDesc>
              <ChatTime>Несколько часов назад</ChatTime>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  {message.my ? (
                    <ChatTo>
                      <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
                      <Time>{message.time}</Time>
                    </ChatTo>
                  ) : (
                    <ChatFrom>
                      <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
                      <Time>{message.time}</Time>
                    </ChatFrom>
                  )}
                </React.Fragment>
              ))}
            </ChatBody>
            <ChatFooter>
              {emojiVisible && (
                <EmojiWrap>
                  <Emoji code="&#128522;" />
                  <Emoji code="&#128514;" />
                  <Emoji code="&#128536;" />
                  <Emoji code="&#128526;" />
                  <Emoji code="&#128561;" />
                  <Emoji code="&#128528;" />
                  <Emoji code="&#128545;" />
                  <Emoji code="&#128546;" />
                  <Emoji code="&#128075;" />
                  <Emoji code="&#128077;" />
                  <Emoji code="&#128078;" />
                  <Emoji code="&#128151;" />
                </EmojiWrap>
              )}
              <SmileButton onClick={() => setEmojiVisible((emojiVisible) => !emojiVisible)} />
              <ChatTextarea
                value={text}
                maxRows={3}
                minRows={1}
                onKeyPress={handleKeyPress}
                onChange={(ev) => setText(ev.currentTarget.value)}
                placeholder="Введите сообщение..."
              />
              {text.length > 0 && <SendButton onClick={send} />}
            </ChatFooter>
          </ChatDialog>
        )}
        <ToggleButton onClick={() => setVisible((visible) => !visible)}>
          {visible ? <Close /> : <div></div>}
        </ToggleButton>
      </ChatWrapper>
    </>
  );
}
const EmojiWrap = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  background: #fff;
  width: 50%;
  height: 120px;
  box-shadow: 0px 0px 1px 1px #d6dade;
  border-radius: 2px;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr 1fr;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;
const MobileClose = styled.button`
  background: rgba(51, 51, 51, 0.4);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  top: 9px;
  right: 9px;
  width: 40px;
  height: 40px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 410px) {
    display: none;
  }
`;

import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { encode } from 'html-entities';
import styled, { keyframes, css } from 'styled-components';
import '@fontsource/pt-sans';
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Smile } from '../assets/smile.svg';
import { ReactComponent as Send } from '../assets/send.svg';
import TextareaAutosize from 'react-textarea-autosize';
import Emoji from './Emoji';
import { Transition } from 'react-transition-group';
import Animate from './Animate';

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
  &.visible {
    @media (max-width: 410px) {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      right: unset;
      bottom: unset;
    }
  }

  * {
    box-sizing: border-box;
  }
`;
const ToggleButton = styled.button`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.link};
  width: 58px;
  height: 58px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  margin-top: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledClose = styled(Close)`
  width: 15px;
  height: 15px;
  transform: rotate(0deg) scale(0.33);
  transition: transform 0.5s, opacity 0.5s;
  opacity: 0;
  &.entered,
  &.entering {
    transform: rotate(-180deg) scale(1);
    opacity: 1;
  }
`;
const ChatDialog = styled.div`
  max-width: 410px;
  min-width: 390px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 8px 16px rgba(51, 51, 51, 0.2);
  border-radius: 4px;
  width: 100%;
  max-height: 750px;
  min-height: 10vh;
  border-top: 5px solid ${({ theme }) => theme.link};
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
  color: ${({ theme }) => theme.title};
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 37px;
`;
const ChatText = styled.p`
  color: ${({ theme }) => theme.fg};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 8px;
`;
const ChatTextarea = styled(TextareaAutosize)`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.4;
  border-radius: 2px;
  width: 100%;
  padding: 10px;
  cursor: text;
  word-break: break-word;
  resize: none;
  border: none;
  color: ${({ theme }) => theme.fg};
  &:focus {
    border: none;
    outline: none;
  }
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
  background: ${({ theme }) => theme.rubrica};
  border: 1px solid #dee3e9;
  box-shadow: 0 2px 4px rgba(44, 48, 52, 0.15);
  border-radius: 8px;
  color: ${({ theme }) => theme.rubricalink};
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
  padding-right: 6px;
  margin-right: -12px;
  &::-webkit-scrollbar {
    width: 8px;
    padding-left: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.shadow};
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
  display: flex;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 0 1px 1px ${({ theme }) => theme.shadow};
`;
const SmileButton = styled(Smile)`
  margin: 10px 0 0 10px;
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
  color: ${({ theme }) => theme.time};
  padding: 29px 0 10px;
  display: block;
`;

const ChatMessage = css`
  padding: 9px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  border-radius: 8px;
  max-width: 80%;
  margin-top: 16px;
  display: inline-block;
  transition: opacity 1s;
  opacity: 0;
  &.entering,
  &.entered {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.link};
    text-decoration: underline;
    cursor: pointer;
  }
`;
const ChatFrom = styled.div`
  background: #f3f5f7;
  margin-right: auto;
  ${ChatMessage}
`;
const ChatTo = styled.div`
  background: #deecfd;
  margin-left: auto;
  ${ChatMessage}
`;
const Time = styled.span`
  bottom: 8px;
  right: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.time};
  text-align: right;
  display: block;
`;

const SendButton = styled(Send)`
  margin: 10px 6px 0 0;
  cursor: pointer;
`;
const EmojiWrap = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  background: ${({ theme }) => theme.bg};
  width: 50%;
  height: 120px;
  box-shadow: 0 0 1px 1px ${({ theme }) => theme.shadow};
  border-radius: 2px;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 12px;
`;
const MobileClose = styled.button`
  background: rgba(51, 51, 51, 0.4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  border: none;
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

const urlRegex =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;

function processText(text: string): string {
  return encode(text)
    .replace(/(?:\r\n|\r|\n)/g, '<br />')
    .replace(urlRegex, '<a href="$&" target="_blank" rel="nofollow">$&</a>');
}

export default function Chat() {
  const [visible, setVisible] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);

  const emojiCodes: string[] = ['😊', '😂', '😘', '😎', '😱', '😐', '😡', '😢', '👋', '👍', '👎', '💗'];

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

  const [text, setText] = useState('');
  const send = useCallback(() => {
    const now = new Date();
    setMessages((current) => {
      const copy = current.slice();
      copy.push({
        id: nextId,
        text: text,
        time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        my: true,
      });
      setNextId(nextId + 1);
      return copy;
    });
    setText('');
  }, [text, nextId]);
  const handleKeyPress = useCallback(
    (ev: React.KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const isMod = isMac ? ev.metaKey : ev.ctrlKey;
      if (isMod && ev.code === 'Enter') {
        ev.preventDefault();
        send();
      }
    },
    [send],
  );

  const scrollToEl = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (scrollToEl.current != null) scrollToEl.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [messages]);

  const emojiContainerEl = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    function handler(ev: MouseEvent) {
      if (emojiContainerEl.current != null) {
        if (ev.target instanceof HTMLElement) {
          if (!emojiContainerEl.current.contains(ev.target)) {
            setEmojiVisible(false);
          }
        }
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const textEl = useRef<HTMLTextAreaElement>(null);
  const onEmojiClick = (code: string) => {
    const el = textEl.current;
    if (el != null) {
      const cursor: number = el.selectionStart;
      setText((text) => text.slice(0, cursor) + code + text.slice(cursor));
      const newCursor = cursor + code.length;
      setTimeout(() => el.setSelectionRange(newCursor, newCursor), 10);
    } else {
      setText((text) => text + code);
    }
    setEmojiVisible(false);
  };

  return (
    <>
      <ChatWrapper className={visible ? 'visible' : ''}>
        {visible && (
          <ChatDialog>
            <MobileClose onClick={() => setVisible((visible) => !visible)}>
              <Close width="14" height="14" />
            </MobileClose>
            <ChatBody>
              <ChatDesc>
                <ChatTitle>Здравствуйте 👋</ChatTitle>
                <ChatText>
                  Сотрудники службы поддержки mos.ru ответят на вопросы о работе портала, окажут помощь в получении
                  госуслуг и поиске информации
                </ChatText>
                <ChatRubrics>
                  <ChatRubrica>Центры госуслуг «Мои документы»</ChatRubrica>
                  <ChatRubrica>Вопросы по Личному кабинету</ChatRubrica>
                  <ChatRubrica>Молочная кухня</ChatRubrica>
                  <ChatRubrica>Карта Москвича</ChatRubrica>
                  <ChatRubrica>🔎 Найти ответ в базе знаний</ChatRubrica>
                </ChatRubrics>
              </ChatDesc>
              <ChatTime>Несколько часов назад</ChatTime>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <Transition appear={true} in={true} timeout={1000}>
                    {(state: string) =>
                      message.my ? (
                        <ChatTo className={state}>
                          <div dangerouslySetInnerHTML={{ __html: processText(message.text) }}></div>
                          <Time>{message.time}</Time>
                        </ChatTo>
                      ) : (
                        <ChatFrom className={state}>
                          <div dangerouslySetInnerHTML={{ __html: processText(message.text) }}></div>
                          <Time>{message.time}</Time>
                        </ChatFrom>
                      )
                    }
                  </Transition>
                </React.Fragment>
              ))}
              <div ref={scrollToEl} />
            </ChatBody>
            <ChatFooter>
              {emojiVisible && (
                <EmojiWrap ref={emojiContainerEl}>
                  {emojiCodes.map((code) => (
                    <Emoji key={code} onClick={() => onEmojiClick(code)} code={code} />
                  ))}
                </EmojiWrap>
              )}
              <SmileButton onClick={() => setEmojiVisible((emojiVisible) => !emojiVisible)} />
              <ChatTextarea
                ref={textEl}
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
          <Transition in={visible} mountOnEnter unmountOnExit timeout={500}>
            {(state) => <StyledClose className={state} />}
          </Transition>
          {!visible && <Animate />}
        </ToggleButton>
      </ChatWrapper>
    </>
  );
}

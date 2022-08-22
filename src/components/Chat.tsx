import React from 'react';
import styled from 'styled-components';
import '@fontsource/pt-sans';

const ChatWrapper = styled.div`
  font-family: 'Roboto';
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
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
`;
// @TODO: 750px
const ChatDialog = styled.div`
  max-width: 410px;
  min-width: 390px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(51, 51, 51, 0.2);
  border-radius: 4px;
  width: 100%;
  max-height: 80vh;
  min-height: 10vh;
  border-top: 5px solid #0848c0;
  padding: 16px;
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
const ChatInput = styled.input`
  font-size: 14px;
  line-height: 49px;
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px #d6dade;
  border-radius: 2px;
  width: 100%;
  padding-left: 38px;
  cursor: text;
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
`;
const ChatBody = styled.div``;
const ChatFooter = styled.div`
  margin-top: 24px;
`;
const ChatTime = styled.span`
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  color: #9ea4ac;
  padding: 29px 0 26px;
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
export default function Chat() {
  return (
    <ChatWrapper>
      <ChatDialog>
        <ChatBody>
          <ChatDesc>
            <ChatTitle>Здравствуйте</ChatTitle>
            <ChatText>
              Сотрудники службы поддержки mos.ru ответят на вопросы о работе портала, окажут помощь в получении госуслуг
              и поиске информации
            </ChatText>
            <ChatRubrics>
              <ChatRubrica>Центры госуслуг «Мои документы»</ChatRubrica>
              <ChatRubrica>Вопросы по Личному кабинету</ChatRubrica>
              <ChatRubrica>Молочная кухня</ChatRubrica>
              <ChatRubrica>Карта Москвича</ChatRubrica>
              <ChatRubrica>Найти ответ в базе знаний</ChatRubrica>
            </ChatRubrics>
          </ChatDesc>
          <ChatTime>Несколько часов назад</ChatTime>
          <ChatFrom>
            Уточнить перечень предоставляемых услуг и их наличие в центре госуслуг «Мои документы» можно по ссылке:
            https://md.mos.ru/katalog-uslug/perechen-uslug Узнать адреса центров госуслуг города Москвы:
            https://md.mos.ru/find-your-dcp/structure
            <Time>01:46</Time>
          </ChatFrom>
          <ChatTo>
            Ну здорова отец.<Time>01:47</Time>
          </ChatTo>
        </ChatBody>
        <ChatFooter>
          <ChatInput type="text" placeholder="Введите сообщение..." />
        </ChatFooter>
      </ChatDialog>
      <ToggleButton></ToggleButton>
    </ChatWrapper>
  );
}

import React, { useState } from 'react';
import '@fontsource/roboto';
import Chat from './components/Chat';
import styled, { ThemeProvider } from 'styled-components';
const lightTheme = {
  bg: '#ffffff',
  fg: '#0c1014',
  title: '#333333',
  shadow: '#d6dade',
  time: '#9ea4ac',
  link: '#0848c0',
  rubrica: '#ffffff',
  rubricalink: '#0848c0',
};
const darkTheme = {
  bg: '#263238',
  fg: '#ffffff',
  title: '#cfd8dc',
  shadow: '#b0bec5',
  time: '#cfd8dc',
  link: '#78909c',
  rubrica: '#37474f',
  rubricalink: '#ffffff',
};
function App() {
  const [dark, setDark] = useState(false);
  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <div>
        <label>
          <input type="checkbox" onChange={() => setDark((current) => !current)} /> Темная тема
        </label>
      </div>
      <div className="App">
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { FormEvent, useEffect } from 'react';
import {MdSend} from 'react-icons/md';

import Text from './components/Text';

interface HistoryItem {
  text: string;
  from: 'ai'|'user';
}

function App() {
  const [query, setQuery] = React.useState('');
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [thinking, setThinking] = React.useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (thinking || ! query.length)
      return;

    setHistory([...history, {
      text: query,
      from: 'user'
    }]);

    setThinking(true);

    setTimeout(() => {
      setThinking(false);
    }, 3000);

    setQuery('');
  }

  return (
    <div className="App h-screen bg-dark flex flex-col pt-10">
      <div className="answers flex-grow overflow-auto">
        <div className="container mx-auto">
          {history.map((item, index) => (
            <Text key={index} isAnswer={item.from == 'ai'}>
              {item.text}
            </Text>
          ))}
          {thinking && (
            <div className="flex">
              <div className="rounded-full bg-light w-2 h-2 mr-1 animate-bounce" />
              <div className="rounded-full bg-light w-2 h-2 mr-1 animate-bounce" />
              <div className="rounded-full bg-light w-2 h-2 mr-1 animate-bounce" />
            </div>
          )}
        </div>
      </div>
      <div className="bottom bg-bar py-8">
        <div className="container mx-auto">
          <div className="text-light font-bold mb-4">Como posso lhe ajudar?</div>
          <form onSubmit={submit} className="input-wrap relative">
            <input 
              type="text" 
              className="bg-[rgba(255,255,255,0.05)] w-full p-6 rounded-lg border border-user text-light" 
              onChange={e => setQuery(e.target.value)}
              value={query}
              disabled={thinking}
            />
            <button type="submit" disabled={thinking}>
              <MdSend className="text-user absolute right-4 top-1/2 -translate-y-1/2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { FormEvent } from 'react';
import {MdSend} from 'react-icons/md';

import Text from './Text';
import api from '../services/api';

interface HistoryItem {
  text: string;
  from: 'ai'|'user';
}

function Chat() {
  const [query, setQuery] = React.useState('');
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [thinking, setThinking] = React.useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (thinking || ! query.length)
      return;

    setHistory(his => [...his, {
      text: query,
      from: 'user'
    }]);

    setThinking(true);
    setTimeout(() => {
        askAi();
    }, 1000);
    
    setQuery('');
  }

  const askAi = () => {
    api.get('/ask', {params: {question: query}})
        .then(response => {
            const {answers} = response.data;
            setHistory(his => [
                ...his, 
                ...answers.map((answer: string) => ({ text: answer, from: 'ai' }))
            ]);
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => setThinking(false) );
  }

  return (
    <div className="App h-screen bg-dark flex flex-col pt-10">
      <div className="answers flex-grow overflow-auto">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-center text-light font-bold mb-8">Evite Filas!</h1>
          <div className="history max-w-3xl mx-auto">
            {history.map((item, index) => (
                <Text key={index} isAnswer={item.from === 'ai'}>
                {item.text}
                </Text>
            ))}
          </div>
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
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
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
    </div>
  );
}

export default Chat;

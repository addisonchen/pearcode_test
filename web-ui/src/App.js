import { useState } from 'react';
import { ch_join, ch_leave, ch_update, ch_stop_typing, ch_execute } from './socket';

export default function App() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [language, setLanguage] = useState(71);
  const [result, setResult] = useState({});

  function login() {
    ch_join(name, setBody, setLoggedIn, setParticipants, setExecuting);
  }

  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      login();
    }
  }
  
  function handleValueChange(ev) {
    setName(ev.target.value);
  }

  function handleCodeChange(ev) {
    ch_update(ev.target.value);
  }

  function unFocus() {
    ch_stop_typing();
  }

  function execute() {
    if (!executing) {
      ch_execute(language);
    }
  }

  window.addEventListener('beforeunload', (event) => {
    ch_leave();
  });


  return (
    <div className="mainContainer">
      { !loggedIn ? 
        <div className="flexRow center">
          <input type="text" value={name} onKeyDown={handleKeyPress} onChange={handleValueChange}></input>
          <button onClick={login}>Go!</button>
        </div>
      :
        <div className="flexRow">
          <textarea className="codePad" value={body} onChange={handleCodeChange} onBlur={unFocus}></textarea>
          <div className="flexCol">
            { participants.map(p => {
              return (
                <div>
                  <p>{p.name}</p>
                  { p.typing ? 
                    <p> - typing!</p>
                    :
                    <p> - not typing</p>
                  }
                </div>
              )
            })}
            <select value={language} onChange={(ev) => setLanguage(ev.target.value)}>
              <option value={50}>C (GCC 9.2.0)</option>
              <option value={54}>C++ (GCC 9.2.0)</option>
              <option value={57}>Elixir</option>
              <option value={62}>Java 13</option>
              <option value={63}>JavaScript 12.14</option>
              <option value={69}>Prolog (GNU 1.4.5)</option>
              <option value={71}>Python 3</option>
              <option value={72}>Ruby 2.7</option>
              <option value={83}>Swift 5</option>
            </select>
            <button onClick={execute} disabled={executing}>Run!</button>
          </div>
          <div className="resultsContainer">
            { Object.keys(result).length === 0 ? 
                <div>

                </div>
              :
                <div>
                  
                </div>
            }
          </div>
        </div>
      }
    </div>
  );
}
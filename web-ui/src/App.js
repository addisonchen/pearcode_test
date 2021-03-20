import { useState, useRef } from 'react';
import { ch_join, ch_leave, ch_update, ch_stop_typing, ch_execute, ch_language } from './socket';

export default function App() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [language, setLanguage] = useState(71);
  const [result, setResult] = useState({});

  const codeInput = useRef(null);

  function updateBodyState(body) {
    let st = codeInput.current.selectionStart;
    setBody(body)
    codeInput.current.selectionStart = st;
  }

  function login() {
    ch_join(name, updateBodyState, setLoggedIn, setParticipants, setExecuting, setResult, setLanguage);
  }

  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      login();
    }
  }

  function handleTab(ev) {
    if (ev.keyCode === 9) {
      ev.preventDefault();
      // TODO ENABLE TABS
      const { selectionStart, selectionEnd } = ev.target;
      ch_update(body.substring(0, selectionStart) + '  ' + body.substring(selectionEnd));
      //setTimeout(() => {codeInput.current.selectionStart = codeInput.current.selectionEnd = selectionStart + 2}, 100);
      codeInput.current.selectionStart = codeInput.current.selectionEnd = selectionStart + 2
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

  function handleLanguage(ev) {
    ch_language(ev.target.value)
  }

  window.addEventListener('beforeunload', (event) => {
    ch_leave();
  });


  return (
    <div className="mainContainer padding margin">
      { !loggedIn ? 
        <div className="flexRow center padding margin">
          <p style={{paddingRight: "20px"}}>choose a name:</p>
          <input type="text" value={name} onKeyDown={handleKeyPress} onChange={handleValueChange}></input>
          <button onClick={login}>Go!</button>
        </div>
      :
        <div className="flexCol center padding margin">
          
          <div className="flexRow">
            <div>
              <h3>Write code here</h3>
              <textarea className="codePad" ref={codeInput} value={body} onKeyDown={handleTab} onChange={handleCodeChange} onBlur={unFocus}></textarea>
            </div>
            <div className="flexCol padding">
              <h3 className="verticalPadding">Participants:</h3>
              { participants.map((p, idx) => {
                return (
                  <div key={idx}>
                    <p className="bold">{p.name}</p>
                    { p.typing ? 
                      <p> - typing!</p>
                      :
                      <p> - not typing</p>
                    }
                  </div>
                )
              })}
              <h3 className="verticalPadding">Select Language:</h3>
              <select value={language} onChange={handleLanguage}>
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
          </div>
          <div className="resultsContainer padding">
            { Object.keys(result).length === 0 ? 
                <>
                  { executing ? 
                    <p>Running...</p>
                    :
                    <p>Choose a language and click "execute" to run code!</p>
                  }
                </>
              :
                <div>
                  { Object.keys(result).map((r, idx) => {
                    if (typeof result[r] === 'object' && result[r] !== null) {
                      return (
                        <p key={idx}><span className="bold">{r}: </span>{JSON.stringify(result[r])}</p>
                      );
                    } else {
                      return (
                        <p key={idx}><span className="bold">{r}: </span>{result[r]}</p>
                      );
                    }
                  })}
                </div>
            }
          </div>
        </div>
      }
    </div>
  );
}
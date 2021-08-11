import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      const repsonse = await axios.get('https://reqres.in/api/users');
      setUsers(repsonse.data.data);
    }
    loadUsers();
  }, [])

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  }
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      })
    }
    setSuggestions(matches);
    setText(text);
  }

  return (
    <div>
    <div className="test">
      <div className="box">
        <input type="text" className="col-md-12 input" placeholder="Enter Email"  
        onChange={e => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() =>{
          setTimeout(() =>{
            setSuggestions();
          }, 100);
        }}
        />
        {suggestions && suggestions.map((suggestion, i) =>
          <div key={i} className="suggestion col-md-12 justify-content-md-center"
            onClick={()=>onSuggestHandler(suggestion.email)}
          >{suggestion.email}</div>
        )}
      </div>     
      </div>
    </div>
  );
}

export default App;

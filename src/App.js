import React from 'react';
import './style.css';

export default function App() {
  const usersDB = [
    {
      id: 1,
      username: 'apple',
    },
    {
      id: 2,
      username: 'dell',
    },
    {
      id: 3,
      username: 'microsoft',
    },
    {
      id: 4,
      username: 'netflix',
    },
  ];

  const [input, setInput] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    // check if backspace is pressed and remove users
    if (
      ((e.key === 'Backspace' || e.key === 'Escape') &&
        input[input.length - 1] === '@') ||
      e.key === ' '
    ) {
      setUsers([]);
    }

    if (e.key === '@') {
      // fetch all users and set to state
      setUsers(usersDB);
    }
  };

  const handleUserClick = (username) => {
    console.log(input.lastIndexOf('@'), username);
    let result;
    // get last index of '@'
    const word = input.substring(input.lastIndexOf('@') + 1);
    console.log(word);
    let pat = new RegExp('(\\b' + word + '\\b)(?!.*\\b\\1\\b)', 'i');
    result = input.replace(pat, username);
    setInput(result);
  };

  React.useEffect(() => {
    // filter user suggestions
    if (users.length) {
      const word = input.substring(input.lastIndexOf('@') + 1);
      console.log('word', word);
      const result = usersDB.filter((user) => user.username.includes(word));
      if (result.length) setUsers(result);
      else setUsers(usersDB);
    }
  }, [input]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        {users && <UserList users={users} handleUserClick={handleUserClick} />}
      </div>
    </div>
  );
}

const UserList = ({ users, handleUserClick }) => {
  return (
    <ul>
      {users.map(({ id, username }) => (
        <li key={id} onClick={() => handleUserClick(username)}>
          {username}
        </li>
      ))}
    </ul>
  );
};

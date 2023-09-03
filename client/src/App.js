import './App.css';
import { useState, useEffect } from 'react';

const dateSettings = {
  weekday:"long", 
  year:"numeric", 
  month:"short", 
  day:"numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

/**
 * Order dates by their time created
 * @param {Object} message1 - first message
 * @param {Object} message2 - second message
 * @returns 
 */
const compareMessages = (message1, message2) => {
  const date1 = new Date(message1.createdAt).getTime();
  const date2 = new Date(message2.createdAt).getTime();

  if (date1 <= date2) return -1;
  else if (date1 > date2) return 1;
} 

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [logged, setLogged] = useState(false);
  const [listOfMessages, setListOfMessages] = useState([]);
  const [messageInput, setmessageInput] = useState('');

  useEffect(() => {
    setUsernameLogin('');
    setPasswordLogin('');
    setUsernameSignUp('');
    setPasswordSignUp('');
  }, [showLogin]);

  useEffect(() => {
    getAllUsers()
      .then((allUsers) => {
        let combinedArray = [];
        allUsers.forEach((user) => {
          combinedArray = combinedArray.concat(user.messages);
        });
        setListOfMessages(combinedArray.sort(compareMessages));
      })
      .catch((error) => {console.error('Error: ' + error)});
  }, []);

  /**
   * Creates a new user in mongo with the inputted sign up username and password
   * @returns the created object
   */
  const addUser = async () => {
    return await fetch(`http://localhost:3001/users/addUser`, {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        username: usernameSignUp,
        password: passwordSignUp,
        messages: []
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        const result = await response.json();
        console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {console.error('Error: ' + error)})
  }

  /**
   * Creates a new user in mongo with the inputted sign up username and password
   * @returns the created object
   */
  const addMessage = async () => {
    return await fetch(`http://localhost:3001/messages/addMessage`, {
      method: 'POST',
      body: JSON.stringify({
        username: usernameLogin,
        content: messageInput,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        const result = await response.json();
        console.log(JSON.stringify(result));
        setListOfMessages([...listOfMessages, result].sort(compareMessages));
        return result;
      })
      .catch((error) => {console.error('Error: ' + error)})
  }

  /**
   * Requests a user with the matching username as login's and return it
   * @returns the requested object with the matching username
   */
  const getUser = async () => {
    return await fetch(`http://localhost:3001/users/getUser/${usernameLogin}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        const result = await response.json();
        console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {console.error('Error: ' + error)})
  }

  /**
   * Requests all users
   * @returns the requested array of all users
   */
  const getAllUsers = async () => {
    return await fetch(`http://localhost:3001/users/`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        const result = await response.json();
        console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {console.error('Error: ' + error)})
  }



  return (
    <div className='App'>
      {
        !logged ? /* login/sign up */ <>
          <section className='topbar-container'>
            <p id='login-button' onClick={() => {
              setShowLogin(true);
            }}>Login</p>
            <p id='sign-up-button' onClick={() => {
              setShowLogin(false);
            }}>Sign up</p>
          </section>
          {
            showLogin ? /* login prompt */ <>
            <section id='login-container'>
              <h4 id='username-text'>Username:</h4>
              <input id='username-input' onChange={(event) => {
                setUsernameLogin(event.target.value);
              }} placeholder='Input username' value={usernameLogin}></input>
              <h4 id='password-text'>Password:</h4>
              <input id='password-input' onChange={(event) => {
                setPasswordLogin(event.target.value);
              }} placeholder='Input password' value={passwordLogin}></input>
              <button id='login-button' onClick={ async () => {
                const user = await getUser();
                if (usernameLogin !== user.username) {
                  console.log('Username does not match any in the database');
                } else if (passwordLogin !== user.password) {
                  console.log('Incorrect password to ' + usernameLogin);
                } else {
                  console.log(usernameLogin + ' successfully logged in');
                  setLogged(true);
                }
              }}>Login</button>
            </section> </>
              : /* sign up prompt */ <>
            <section id='sign-up-container'>
              <h4 id='username-text'>Username:</h4>
              <input id='username-input' onChange={(event) => {
                  setUsernameSignUp(event.target.value);
                }} placeholder='Input username' value={usernameSignUp}></input>
              <h4 id='password-text'>Password:</h4>
              <input id='password-input' onChange={(event) => {
                  setPasswordSignUp(event.target.value);
                }} placeholder='Input password' value={passwordSignUp}></input>
              <button id='sign-up-button' onClick={ async () => {
                  await addUser();
                }}>Sign Up</button>
            </section>
            </>
          }
        </> : /* logged in */ <>
          <h1 id='greeting'>Welcome, {usernameLogin}!</h1>
          <section id='inputMessaging'>
            <textarea id='messageInput' contenteditable onChange={(event) => {
              setmessageInput(event.target.value);
            }} placeholder='Send a message to everyone' value={messageInput}>
            </textarea>
            <button onClick={async (event) => {
              // check if anything was even typed (spaces alone don't count)
              if (messageInput.trim()) {
                await addMessage();
                alert('Sent message');
              }
            }}>Send Message</button>
          </section>
          <section className='messageDisplay'>
            {listOfMessages.map((message) => {
                let dateCreated = new Date(message.createdAt);
                if (!(dateCreated instanceof Date) || isNaN(dateCreated)) {
                  dateCreated = new Date();
                }
                return (
                  <div className='message'>
                    <h3>User: {message.username}</h3>
                    <h3>Message: {message.content}</h3>
                    <p>Sent: {dateCreated.toLocaleDateString(
                      'en-us', dateSettings)}
                    </p>
                  </div>
                );
            })}
          </section>
        </>
      }
    </div>
  );
}

export default App;

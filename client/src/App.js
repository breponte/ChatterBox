import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [logged, setLogged] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    setUsernameLogin('');
    setPasswordLogin('');
    setUsernameSignUp('');
    setPasswordSignUp('');
  }, [showLogin]);

  useEffect(() => {
    getAllUsers()
      .then((allUsers) => {setListOfUsers(allUsers)})
      .catch((error) => {console.error('Error: ' + error)});
  }, [logged]);



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
   * Requests a user with the matching username as login's and return it
   * @returns the requested object with the matching username
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
      <section className='topbar-container'>
        <p id='login-button' onClick={() => {
          setShowLogin(true);
        }}>Login</p>
        <p id='sign-up-button' onClick={() => {
          setShowLogin(false);
        }}>Sign up</p>
      </section>


      {
        !logged ? /* login/sign up */ <>
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
          <section className='messageDisplay'>
            {listOfUsers.map((user) => {
              const messages = user.messages;
              return (messages.map((message) => {
                const dateCreated = new Date(message.createdAt);
                return (
                  <div className='message'>
                    <h3>User: {message.username}</h3>
                    <h3>Message: {message.content}</h3>
                    <p>Sent: {dateCreated.toLocaleDateString('en-us', 
                        {
                          weekday:"long", 
                          year:"numeric", 
                          month:"short", 
                          day:"numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }
                      )}
                    </p>
                  </div>
                );
              }));
            })}
          </section>
        </>
      }
    </div>
  );
}

export default App;

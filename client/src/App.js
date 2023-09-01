import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');

  useEffect(() => {
    setUsernameLogin('');
    setPasswordLogin('');
    setUsernameSignUp('');
    setPasswordSignUp('');
  }, [showLogin]);



  const requestDatabase = (route) => {
    let method = '';
    let username = '';
    let password = '';

    /* depending on route, adjust request information */
    switch (route) {
      case 'getUser':
        method = 'GET';
        username = usernameLogin;
        password = passwordLogin;
        break;
      case 'addUser':
        method = 'POST';
        username = usernameSignUp;
        password = passwordSignUp;
        break;
      default:
        console.error(`Unrecognized route: ${route}`);
        break;
    }

    fetch(`http://localhost:3001/users/${route}`, {
      method: method,
      body: JSON.stringify({
        name: '',
        username,
        password,
        messages: []
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        console.log(JSON.stringify(await response.json()));
      })
      .catch((error) => {console.error('Error: ' + error)})
  }



  return (
    <div className='App'>
      <section className='topbar-container'>
        <p className='login' onClick={() => {
          setShowLogin(true);
        }}>Login</p>
        <p className='sign-up' onClick={() => {
          setShowLogin(false);
        }}>Sign up</p>
      </section>

      {
        showLogin ? <>
        <section className='login-container'>
          <h4 className='username-text'>Username:</h4>
          <input className='username-input' onChange={(event) => {
            setUsernameLogin(event.target.value);
          }} placeholder='Input username' value={usernameLogin}></input>
          <h4 className='password-text'>Password:</h4>
          <input className='password-input' onChange={(event) => {
            setPasswordLogin(event.target.value);
          }} placeholder='Input password' value={passwordLogin}></input>
          <button className='login-button' onClick={() => {
            requestDatabase();
          }}>Login</button>
        </section> </>
          : <>
        <section className='sign-up-container'>
          <h4 className='username-text'>Username:</h4>
          <input className='username-input' onChange={(event) => {
              setUsernameSignUp(event.target.value);
            }} placeholder='Input username' value={usernameSignUp}></input>
          <h4 className='password-text'>Password:</h4>
          <input className='password-input' onChange={(event) => {
              setPasswordSignUp(event.target.value);
            }} placeholder='Input password' value={passwordSignUp}></input>
          <button className='sign-up-button' onClick={() => {
              requestDatabase();
            }}>Sign Up</button>
        </section>
        </>
      }
    </div>
  );
}

export default App;

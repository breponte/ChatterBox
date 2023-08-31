import './App.css';
import { useState } from 'react';

// const createUser = () => {
//   fetch('http://localhost:3001/createUser', { method: "POST" }).then(() => {});
// }

// const getUser = () => {
//   fetch('http://localhost:3001/getUsers', { method: "GET" })
//     .then((response) => {
//       alert(response);    
//   });
// }

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [] = useState();

  return (
    <div className="App">
      <section className="topbar-container">
        <p className="login" onClick={() => {
          setShowLogin(true);
        }}>Login</p>
        <p className="sign-up" onClick={() => {
          setShowLogin(false);
        }}>Sign up</p>
      </section>

      {
        showLogin ? <>
        <section className="login-container">
          <h4 className="username-text">Username:</h4>
          <input className="username-input"></input>
          <h4 className="password-text">Password:</h4>
          <input className="password-input"></input>
          <button className="login-button" onClick={() => {
            alert("Login?")
          }}>Login</button>
        </section> </>
          : <>
        <section className="sign-up-container">
        <h4 className="username-text">Username:</h4>
          <input className="username-input"></input>
          <h4 className="password-text">Password:</h4>
          <input className="password-input"></input>
          <button className="sign-up-button" onClick={() => {
            alert("Sign up?")
          }}>Sign up</button>
        </section>
        </>
      }
    </div>
  );
}

export default App;

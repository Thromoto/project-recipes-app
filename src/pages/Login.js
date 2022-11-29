import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const INITIAL_USER_STATE = {
  email: '',
  password: '',
};

function Login({ history: { push } }) {
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [disable, setDisable] = useState(true);

  const { email, password } = user;

  const validateEntries = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    const minLen = 6;
    if (regex.test(email) && password.length > minLen) {
      return setDisable(false);
    }
    setDisable(true);
  };

  useEffect(() => {
    validateEntries();
  }, [password, email]);

  const handleInput = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    const saveInfo = { email };
    localStorage.setItem('user', JSON.stringify(saveInfo));
    push('/meals');
  };

  return (
    <div>
      <input
        name="email"
        placeholder="Email"
        type="text"
        data-testid="email-input"
        value={ email }
        onChange={ handleInput }
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        data-testid="password-input"
        value={ password }
        onChange={ handleInput }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ disable }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

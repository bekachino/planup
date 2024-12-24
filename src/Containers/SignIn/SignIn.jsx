import React, { useState } from 'react';
import mainLogo from '../../assets/skynet-logo.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signIn } from '../../features/user/userThunk';
import Alerts from '../../Components/Alerts/Alerts';
import './signIn.css';

const SignIn = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const { signInLoading } = useAppSelector((state) => state.userState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signIn(state));
  };

  return (
    <div className="form-container sign-in">
      <Alerts />
      <img src={mainLogo} alt="Skynet" />
      <form onSubmit={onSubmit}>
        <input
          name="username"
          value={state.username}
          type="text"
          placeholder="Логин"
          onChange={onChange}
          required
        />
        <input
          name="password"
          value={state.password}
          type="password"
          placeholder="Пароль"
          onChange={onChange}
          required
        />
        <button
          type="submit"
          className={`form-submit-btn ${signInLoading ? 'loading' : ''}`}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;

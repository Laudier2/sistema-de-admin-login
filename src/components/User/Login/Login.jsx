import React, { useState, useContext } from 'react';
import StoreContext from '../../../Context/SatateDate'

import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

  const { auth, login, users } = useContext(StoreContext)

  console.log(users)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nsvigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit", { email, password })

    if (password === "123456") {
      login(email, password)
      nsvigate("/")
      toast.success("Login realizado com sucesso")
    } else {
      nsvigate("/login")
      toast.error("Usuario ou senha invalida tente novamente")
    }
  }

  return (
    <div className="user-login">
      <p className="text-light">{String(auth)}</p>
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={handleSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="text"
            name="user"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          theme="contained-green"
          className="user-login__submit-button btb btn-success"
          rounded
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default UserLogin;

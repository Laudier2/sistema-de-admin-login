import React, { useState, useContext } from 'react';
import FormularioCadastro from '../formulario/FormularioCadastro';
import './cadastro.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../modal/ModalWiel';
import { toast } from 'react-toastify';
import AppContext from '../../Context/SatateDate'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {

  const { users, logout, VerUser } = useContext(AppContext)

  //console.log(users)

  const URL = "http://15.228.82.63/"

  /**
   * Esse hook useState esta recebendo o valor do evento onClick e assim
   * passo como parâmetro para o componente FormularioCadastro para que assim
   * possamos preencher os campos imput e atualizá-lo com identificação via id
   *
   */
  const [idAtual, setIdAtual] = useState('');
  const [item, setItem] = useState('');

  const navigate = useNavigate()

  /**
   * Essa função é responsável por apaga um usuario via id,
   * que esta vindo via evento do onClick
   */
  const Apagausuario = (id) => {
    axios //Esse process.env.REACT_APP_API_URL é uma variave de ambiente que contem a url da api
      .delete(URL + id)
      .then((res) => {
        toast.success('O usuário foi deletado com sucesso');
        setTimeout(() => {
          navigate('/')  //window.location.reload()
        }, 6280)
      })
      .catch((erro) => {
        toast.error(
          'Houve um erro ao tenta apaga esse usuário, erro relacionado a ' +
          erro
        );
        setTimeout(() => {
          navigate('/')  //window.location.reload()
        }, 6280)
      });
  };

  return (
    <div>
      <section>
        <h1 className="h5 col-md-12 mrg titolo text-white">
          Sistema de Cadastro e Gerenciamento de Usuários
        </h1>
        <button className="btn btn-danger mt-2" onClick={logout}>Logout</button>
        <button className="btn btn-danger mt-2 ml-5" onClick={VerUser}>Ver</button>
      </section>
      <div className="jumbotron jumbotron-fuid bg-img mt-5"></div>

      <div className="row">
        <div className="col-md-5">
          <FormularioCadastro {...{ idAtual, users }} />
        </div>
        <div className="col-md-7 ">
          <h2 className="titolo mx-auto">Lista de Usuários na database</h2>
          <table class="table">
            <thead>
              <tr className="text-white">
                <th scope="col">
                  <i className="fas fa-coins" />
                </th>
                <th scope="col">Usuario</th>
                <th scope="col">E-mail</th>
              </tr>
            </thead>

            {users.map((r) => (
              <tbody key={r.id}>
                <tr className="btn-outline-secondary text-white">
                  <th scope="row">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setItem(r);
                      }}
                    >
                      <i className="fas fa-eye" />
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5
                              class="modal-title titolo2"
                              id="exampleModalLabel"
                            >
                              Dados do Usuário
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              className="btn-outline-secondary"
                            ></button>
                          </div>
                          <div class="modal-body text-dark">
                            <Modal dadosItem={item} />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-outline-secondary btn-block "
                              data-bs-dismiss="modal"
                            >
                              Fecha
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    {r.name}
                  </td>
                  <td>{r.email}</td>
                  <td>
                    <Link
                      to="/"
                      onClick={() => {
                        setIdAtual(r._id);
                      }}
                      className="mr-2"
                    >
                      <i className="fas fa-edit mt-2 p-2 text-info btn btn-light card" />
                    </Link>
                    <Link to="/" onClick={() => Apagausuario(r._id)}>
                      <i className="fas fa-trash-alt mt-2 p-2 text-danger btn btn-light card" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

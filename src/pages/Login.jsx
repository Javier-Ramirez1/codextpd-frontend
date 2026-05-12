import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    logiUsua: '',
    passUsua: ''
  })

  const iniciarSesion = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.post(
        'http://api.codextpd.com/api/usuarios/login',
        login
      )

      if (response.data.mensaje) {
        alert(response.data.mensaje)
      } else {
        localStorage.setItem('usuario', JSON.stringify(response.data))
        navigate('/clientes')
      }

    } catch (error) {
      console.log(error)
      alert('Error al iniciar sesión')
    }
  }

  return (
    <div className='container'>

      <form className='card' onSubmit={iniciarSesion}>

        <h1>LOGIN</h1>

        <input
          type='text'
          placeholder='Usuario'
          onChange={(e) => setLogin({
            ...login,
            logiUsua: e.target.value
          })}
        />

        <input
          type='password'
          placeholder='Contraseña'
          onChange={(e) => setLogin({
            ...login,
            passUsua: e.target.value
          })}
        />

        <button type='submit'>Ingresar</button>

      </form>

    </div>
  )
}

export default Login
import Cookie from 'js-cookie'

class Session {
  constructor() {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const id = localStorage.getItem('id')
    this.token =  token
    this.name = name
    this.id = id
  }

  get isLoggedIn() {
    return !!this.token
  }

  login(token) {
    this.token = token
    localStorage.setItem('token', token)
  }

  setUser(id, name) {
    this.id = id
    this.name = name
    localStorage.setItem('name', name)
    localStorage.setItem('id', id)
  }

  logout() {
    this.id = null
    this.name = null
    this.token = null
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
  }
}

export default new Session()

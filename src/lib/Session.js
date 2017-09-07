import Cookie from 'js-cookie'

class Session {
  constructor(accessToken) {
    this.accessToken = accessToken || true
  }

  get isLoggedIn() {
    return !!this.accessToken
  }

  login(accessToken) {
    this.accessToken = accessToken
    Cookie.set('__acT', accessToken)
  }
}

const accessToken = Cookie.get('__acT')

export default new Session(accessToken)

// Next Auth Imports
import { CredentialsSignin } from 'next-auth'

export default class InvalidLoginError extends CredentialsSignin {
  code: string
  constructor(msg: string, code: number) {
    super()
    this.code = JSON.stringify({ msg, code })
  }
}

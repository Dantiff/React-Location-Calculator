import { apiWrapper } from './ApiFunctions'

class UsersApi {

  static getUsers() {
    const url = '/api/users';
    return apiWrapper('GET', url, {})
  }
}

export default UsersApi;

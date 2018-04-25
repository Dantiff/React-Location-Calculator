import { apiWrapper } from './ApiFunctions'

class Api {
  static calculate(payload) {
    const url = '/ngc-calculator-api/calculations';
    return apiWrapper('POST', url, payload)
  }
}

export default Api;

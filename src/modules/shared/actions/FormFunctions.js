
import { history } from '../../../store/configureStore';

class FormFunctions {

  //Global Form Functions
  static handleChange(event) {
    const field = event.target.name;

    const form = this.state.form;

    form[field] = event.target.value;

    return this.setState({form: form});
  }

  static handleCheck (event, isInputChecked) {

    const field = event.target.name;

    const form = this.state.form;

    form[field] = isInputChecked;

    return this.setState({form: form});
  }

  static handleFileChange(e) {
    const field = e.target.name;

    const form = this.state.form;
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])

      reader.onload = () => {
        if (!!reader.result) {
          resolve(reader.result)
          form[field] = reader.result
        }
        else {
          reject(Error("Failed converting to base64"))
        }
      }
    });

    promise.then(result => {
      return this.setState({form: form});
    }, err => {
      console.log(err)
    })

  }

  static handleDateChange (event, date) {

    const { form, shareholderForm } = this.state;

    if (shareholderForm) {
      form.date_of_birth = date;
    } else {
      form.date_of_incorporation = date;
    }

    return this.setState({form: form});
  }

  static handleIDChange(event) {
    const field = event.target.name;

    var { form } = this.state;

    form.identification[field] = event.target.value;  

    this.setState({ form: form })
  }

  static handleLocationChange(event) {
    const field = event.target.name;

    const form = this.state.form;

    form.location[field] = event.target.value;

    return this.setState({form: form});
  }

  static handlePeopleChange(event) {
    const field = event.target.name;

    const form = this.state.form;

    form.people[0][field] = event.target.value;

    return this.setState({form: form});
  }

  //Clients Module Form Functions
  static onClientAction(event, key, value) {  

    this.setState({ open: false });

    if (value !== "" && value !== undefined) {
      this.props.clientActions.requestUpdateClient({ event: 'add', alias: value });
    }
    if (event === "edit_client_contact") {
        this.props.clientActions.requestUpdateClient({ event: event, alias: null, profileClientContact: key });
    }
    if (event === "add_client_shareholder") {
        this.props.clientActions.requestUpdateClient({ event: event, alias: null, profileClientShareholder: null, domain: value });
    }
    if (event === "edit_client_shareholder") {
        this.props.clientActions.requestUpdateClient({ event: event, alias: null, profileClientShareholder: key, domain: value });
    }
    if (value === undefined) {
      if (event === "view") {
        history.push('/clients/'.concat(this.state.selectedClient.fingerprint));
      } else {
        this.props.clientActions.requestUpdateClient({ event: event, alias: null });
      }
    }
  }

  static handleCloseClientDialogs () {
    this.props.clientActions.cancelUpdateClient();
  }

  static handleClientTypeChange (event, index, value) {

    const form = this.state.form;

    form['client_type'] = value;

    return this.setState({form: form});
  }

  static handleClientCreate(e) {
    e.preventDefault();

    const { form } = this.state;

    form.initial_category = this.props.event.alias;

    this.setState({
      form: form,
    }, function () {
      this.props.clientActions.addClient({ client: this.state.form });
    });

  }

  static handleClientUpdate(e) {
    e.preventDefault();

    var { form } = this.state;
    var { event } = this.props;

    if (Object.keys(event).length !== 0) {
      if (event.event === "add" && event.alias === "Supplier") {
        form = Object.assign({}, this.props.selectedClient.attributes);
        form.signing_mandate = this.state.form.signing_mandate;
        form.signing_mandate = this.state.form.signing_mandate;
      }
    }

    this.setState({
      form: form,
    }, function () {
      this.props.clientActions.updateClient({ client: this.state.form });
    });

  }
}

export default FormFunctions;

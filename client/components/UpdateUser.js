import React from 'react';
import Validation from 'react-validation';
import validator from'validator';
import appActions from './../actions';
import moment from 'moment';

Validation.extendErrors({
  isRequired: {
    className: 'error',
    message: 'Campo requerido',
    rule: function(value) {
      return Boolean(validator.trim(value));
    }
  },
  isEmail: {
    className: 'ui-input_state_email-pattern-failed',
    message: 'debe tener formato de email'
  }
});

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    appActions.getUser(this.props.params.id, (err, res) => {
      if (err) {
        res.status(500).json(err);
      }
      this.refs.name.setValue(res.body.name);
      this.refs.lastName.setValue(res.body.lastName);
      this.refs.email.setValue(res.body.email);
      var day = moment(res.body.birthOfdate).format('YYYY-MM-DD');
      this.refs.birthOfdate.setValue(day);
    });
  }
  onSubmit(event) {
    event.preventDefault();
    appActions.updateUser(this.props.params.id, this.getFormData(), function(err, res) {
      if (err) {
        res.status(500).json(err);
      }
    });
  }
  getFormData() {
    var form = document.querySelector('#form');
    var elements = form && form.elements ? form.elements : [];
    var item = {};
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      item[element.name] = element.value;
    }
    return item;
  }
  render() {
    return (<Validation.Form id="form" ref="formUser" method="POST" className="small-12 large-4 columns" onSubmit={this.onSubmit.bind(this)}>
      <div className="row">
        <div className="name-field small-12 columns">
          <label>Nombre <small>requerido</small>
            <Validation.Input
                        blocking="input"
                        className="ui-input"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        invalidClassName="error"
                        name="name"
                        ref="name"
                        type="text"
                        />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="name-field small-12 columns">
          <label>Apellido <small>requerido</small>
            <Validation.Input
                        blocking="input"
                        className="ui-input"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        invalidClassName="error"
                        name="lastName"
                        ref="lastName"
                        type="text"/>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="name-field small-12 columns">
          <label>Email <small>requerido</small>
            <Validation.Input
                        blocking="input"
                        className="ui-input"
                        validations={[
                          {
                              rule: 'isRequired'
                          },
                          {
                              rule: 'isEmail'
                          }
                        ]}
                        invalidClassName="error"
                        name="email"
                        ref="email"
                        type="text"/>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="name-field small-12 columns">
          <label>Fecha de Nacimiento <small>requerido</small>
            <Validation.Input
                        blocking="input"
                        className="ui-input"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        invalidClassName="error"
                        name="birthOfdate"
                        ref="birthOfdate"
                        type="date"/>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-12 columns">
          <Validation.Button blocking="button" className="button" value="Guardar"/>
        </div>
      </div>
    </Validation.Form>);
  }

  clean() {
    this.refs.formUser.reset();
  }
}
module.exports = UpdateUser;

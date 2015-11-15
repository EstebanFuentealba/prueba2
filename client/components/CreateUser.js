import React from 'react';
import Validation from 'react-validation';
import validator from'validator';

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

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.getFormData());
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
                        placeholder="Nombre"
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
                        type="text"
                        placeholder="Apellido"
                        />
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
                        type="text"
                        placeholder="Email"
                        />
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
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="name-field small-12 columns">
          <label>Contraseña <small>requerido</small>
            <Validation.Input
                        blocking="input"
                        className="ui-input"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        invalidClassName="error"
                        ref="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        />
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
module.exports = CreateUser;

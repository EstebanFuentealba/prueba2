import React from 'react';
import Validation from 'react-validation';
import validator from'validator';
import { Row, Col } from 'react-bootstrap';
import appActions from './../actions';
import userStore from './../stores/userStore';

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
    userStore.addUser(this.getFormData()).then((userAdded) => {
      this.props.history.pushState(null, "users");
    }).catch(function(error) {
      console.log("ocurrio un error");
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
    return (<Col sm={12} md={3} lg={3}>
      <Validation.Form id="form" ref="formUser" method="POST" onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label for="name">Nombre <small>requerido</small></label>
            <Validation.Input
                        blocking="input"
                        className="form-control"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        id="name"
                        invalidClassName="error"
                        name="name"
                        ref="name"
                        type="text"
                        placeholder="Nombre"
                        />
        </div>

        <div className="form-group">
          <label for="lastName">Apellido <small>requerido</small></label>
            <Validation.Input
                        blocking="input"
                        className="form-control"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        id="lastName"
                        invalidClassName="error"
                        name="lastName"
                        ref="lastName"
                        type="text"
                        placeholder="Apellido"
                        />
        </div>
        <div className="form-group">
          <label for="email">Email <small>requerido</small></label>
            <Validation.Input
                        blocking="input"
                        className="form-control"
                        validations={[
                          {
                              rule: 'isRequired'
                          },
                          {
                              rule: 'isEmail'
                          }
                        ]}
                        id="email"
                        invalidClassName="error"
                        name="email"
                        ref="email"
                        type="text"
                        placeholder="Email"
                        />
        </div>
        <div className="form-group">
          <label for="birthOfdate">Fecha de Nacimiento <small>requerido</small></label>
            <Validation.Input
                        blocking="input"
                        className="form-control"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        id="birthOfdate"
                        invalidClassName="error"
                        name="birthOfdate"
                        ref="birthOfdate"
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        />
        </div>

        <div className="form-group">
          <label for="password">Contraseña <small>requerido</small></label>
            <Validation.Input
                        blocking="input"
                        className="form-control"
                        validations={[
                          {
                              rule: 'isRequired'
                          }
                        ]}
                        id="password"
                        invalidClassName="error"
                        name="password"
                        ref="password"
                        type="password"
                        placeholder="Contraseña"
                        />
        </div>
        <Validation.Button blocking="button" className="btn btn-primary" value="Guardar"/>
      </Validation.Form>
    </Col>);
  }
}
module.exports = CreateUser;

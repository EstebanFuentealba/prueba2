import React from 'react';
import Validation from 'react-validation';
import validator from'validator';
import appActions from './../actions';
import moment from 'moment';
import { Row, Col, Panel } from 'react-bootstrap';

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
      console.log(res);
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
    return (<Panel>
      <Row>
        <Col sm={12} md={12}>
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
            <Validation.Button blocking="button" className="btn btn-primary" value="Guardar"/>
          </Validation.Form>
        </Col>
      </Row>
    </Panel>);
  }

  clean() {
    this.refs.formUser.reset();
  }
}
module.exports = UpdateUser;

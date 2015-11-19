import React from 'react';
import Validation,{Input} from 'react-validation';
import validator from'validator';
import appActions from './../actions';
import userStore from './../stores/userStore';
import moment from 'moment';
import { Row, Col, Panel } from 'react-bootstrap';
import reactMixin from 'react-mixin';
import Reflux from 'reflux';

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
    this.state = {
      user: {}
    };
    this.listenTo(userStore, this.userStoreListener);
  }
  userStoreListener(users) {
    if(users.length == 1) {
      this.setState({ user: users[0] });
      this.refs.name.setValue(this.state.user.name);
      this.refs.lastName.setValue(this.state.user.lastName);
      this.refs.email.setValue(this.state.user.email);
      this.refs.birthOfdate.setValue(moment(this.state.user.birthOfdate).format('YYYY-MM-DD'));
    }
  }
  componentWillMount() {
    appActions.getUser(this.props.params.id);
  }
  onSubmit(event) {
    event.preventDefault();
    userStore.updateUser(this.props.params.id, this.getFormData()).then((userUpdated) => {
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
    return (<Panel>
      <Row>
        <Col sm={12} md={12}>
          <Validation.Form id="form" ref="formUser" method="POST" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label for="name">Nombre <small>requerido</small></label>
                <Input
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
}

reactMixin(UpdateUser.prototype, Reflux.ListenerMixin);
module.exports = UpdateUser;

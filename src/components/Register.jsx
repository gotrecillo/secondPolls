import React, { Component, PropTypes } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { errorText: props.registerStatus };
  }

  componentWillReceiveProps(newProps){
    this.setState({ errorText: newProps.registerStatus });
  }

  handleRegister(){
    const { createUser } = this.props;
    const userName = this.refs.userName.value.trim();
    const pass = this.refs.pass.value.trim();
    const pass2 = this.refs.pass2.value.trim();
    if (this.checkPass(pass, pass2)) {
      createUser(userName, pass);
    } else {
      this.setState({ errorText: 'Passwords do not match' });
    }

  }

  checkPass(pass, pass2){
    return (pass === pass2) ?  true : false;
  }

  render() {
    const { errorText } = this.state;
    return (
      <div className="row">
        <div className="panel col-md-6 col-md-offset-3 panel-default">
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label>User name</label>
                <input type="text" className="form-control" ref="userName" placeholder="User name"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" ref="pass"  placeholder="Password"/>
              </div>
              <div className="form-group">
                <label>Re-type Password</label>
                <input type="password" className="form-control" ref="pass2"  placeholder="Password"/>
              </div>
              <a href="/log-in"><span className="btn btn-default">Log In</span></a>
              <button type="submit" className="btn btn-default pull-right" onClick={ (e) => { e.preventDefault(); this.handleRegister();} }>Register</button>
            </form>
            <br/>
            { errorText ? <div className="alert alert-danger" role="alert">{errorText}</div> : null }
          </div>
        </div>
      </div>
    );
  }

}

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  registerStatus: PropTypes.string
};

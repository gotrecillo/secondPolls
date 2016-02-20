import React, { Component, PropTypes } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
  }

  handleRegister(){
    const { createUser } = this.props;
    const userName = this.refs.userName.value.trim();
    const pass = this.refs.pass.value.trim();
    const pass2 = this.refs.pass2.value.trim();
    if (this.checkPass(pass, pass2)) {
      createUser(userName, pass);
    } else {
      console.log('pick matching passwords');
    }

  }

  checkPass(pass, pass2){
    return (pass === pass2) ?  true : false;
  }

  render() {
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
              <button type="submit" className="btn btn-default pull-right" onClick={ (e) => { e.preventDefault(); this.handleRegister();} }>Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

Register.propTypes = {
  createUser: PropTypes.func.isRequired
};

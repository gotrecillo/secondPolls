import React, { Component, PropTypes } from 'react';

export default class LogIn extends Component {

  constructor(props) {
    super(props);
  }

  handleLogIn(){
    const { logIn } = this.props;
    const userName = this.refs.userName.value.trim();
    const pass = this.refs.pass.value.trim();
      logIn(userName, pass);
  }


  render() {
    const { auth } = this.props;

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
              <button type="submit" className="btn btn-default" onClick={ (e) => {e.preventDefault(); this.handleLogIn();} } >Log In</button>
              <a href="/log-up"><span className="btn btn-default pull-right" >Register</span></a>
            </form>
            <br/>
            { auth.fail ? <div className="alert alert-danger" role="alert">Wrong username or password</div> : null }
          </div>
        </div>
      </div>
    );
  }

}

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  auth: PropTypes.object
};

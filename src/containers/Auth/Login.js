import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginAPI } from "../../services/userService";
import { GoogleLogin } from '@react-oauth/google';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succeeds");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      } else {
        this.setState({
          errMessage: "An error occurred. Please try again.",
        });
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgot");
  }

  handleGoogleLoginSuccess = async (response) => {
    console.log("Google login success:", response);
    if (response.credential) {
      try {
        let data = await handleLoginAPI(response.credential);

        if (data && data.errCode !== 0) {
          this.setState({
            errMessage: data.message,
          });
        }
        if (data && data.errCode === 0) {
          this.props.userLoginSuccess(data.user);
          console.log("Google login succeeds");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        this.setState({
          errMessage: "An error occurred during Google login. Please try again.",
        });
      }
    }
  };

  handleGoogleLoginFailure = (response) => {
    console.error("Google login failed:", response);
    this.setState({
      errMessage: "Google login failed. Please try again."
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.handleOnChangeUsername}
                autoComplete="off"
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={this.handleOnChangePassword}
                  autoComplete="off"
                />
                <span onClick={this.handleShowHidePassword}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div>
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password" onClick={this.handleForgotPassword}>
                Forgot your password?
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login With:</span>
            </div>
            <div className="col-12 social-login">
              <GoogleLogin
                onSuccess={this.handleGoogleLoginSuccess}
                onFailure={this.handleGoogleLoginFailure}
                render={(renderProps) => (
                  <i
                    className="fab fa-google-plus-g google"
                    onClick={renderProps.onClick}
                  ></i>
                )}
              />
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

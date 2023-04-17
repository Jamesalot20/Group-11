import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';



export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fname, email, password } = this.state;
    console.log(fname, email, password);
    fetch("http://localhost:3000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "applicatoin/json",
        "Access-Control-Allow-Origin": "*",

      },
      body: JSON.stringify({
        email,
        password,
        fname
      }),
    }).then((res) => res.json()).then((data) => {
      console.log(data, "userRegister");
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={e => this.setState({ fname: e.target.value })}
          />
        </div>



        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}

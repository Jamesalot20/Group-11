import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const handleSubmit = (e) => {
  e.preventDeafault();

}




export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <a href="Store.js">
            <button ontype="submit" className="btn btn-primary" >
              Submit
            </button>
          </a>
        </div>
        <p className="forgot-password text-right">
          No Account? <a href="/Sign-Up">sign up</a>
        </p>
      </form>
    )
  }
}

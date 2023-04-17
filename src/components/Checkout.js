import React, { Component } from 'react'

export default class Checkout extends Component {
    render() {
        return (
            <form>

                <h1>Checkout</h1>
                <h2>Total:</h2>

                <div className="Products">

                </div>

                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="address"
                        className="form-control"
                        placeholder="Enter address"
                    />
                </div>
                <div className="mb-3">
                    <label>Card Number</label>
                    <input
                        type="card number"
                        className="form-control"
                        placeholder="Enter card number"
                    />
                </div>
                <div className="mb-3">
                    <label>City</label>
                    <input
                        type="city"
                        className="form-control"
                        placeholder="Enter city"
                    />
                </div>
                <div className="mb-3">
                    <label>State</label>
                    <input
                        type="state"
                        className="form-control"
                        placeholder="Enter state"
                    />
                </div>
                <div className="d-grid">
                    <a href="Completion">
                        Submit
                        <button ontype="submit" className="btn btn-primary" >
                            submit
                        </button>
                    </a>
                </div>







            </form>
        )
    }
}
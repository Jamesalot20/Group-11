import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';

export default class Checkout extends Component {
    render() {
        
        const handleSubmit = () => {
            // Redirect to the Login page
            navigate('/Store');
  };
        
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
                        <button ontype="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </a>
                </div>







            </form>
        )
    }
}

import React, { Component } from 'react'

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingProducts: [],
            approvedProducts: []
        }
    }

    componentDidMount() {
        // fetch pending products
        fetch('/api/products/pending')
            .then(res => res.json())
            .then(data => this.setState({ pendingProducts: data }));

        // fetch approved products
        fetch('/api/products/approved')
            .then(res => res.json())
            .then(data => this.setState({ approvedProducts: data }));
    }

    render() {
        const { pendingProducts, approvedProducts } = this.state;

        return (
            <html>
                <head>
                    <title>Admin Dashboard</title>
                </head>
                <body>
                    <h1>Admin Dashboard</h1>
                    <h2>New Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="new-products-body">
                            {pendingProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td><button onClick={() => this.approveProduct(product.id)}>Approve</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Approved Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody id="approved-products-body">
                            {approvedProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </body>
            </html>
        )
    }

    approveProduct(id) {
        fetch(`/api/products/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(() => {
                // refresh pending products after approving
                fetch('/api/products/pending')
                    .then(res => res.json())
                    .then(data => this.setState({ pendingProducts: data }));
            })
            .catch(error => console.log(error));
    }
}

import React, { Component } from 'react'


export default class Store extends Component {
    render() {
        return (
            <form>
                <h1>TechTonic</h1>
                <div className="input-wrapper">
                    <input placeholder="Type to search products" />
                </div>
                <div className="Products">

                </div>


            </form>
        )
    }
}
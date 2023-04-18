import React, { Component } from 'react'

import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";



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
                <div className="cart">
                    <h2>ShoppingCart</h2>
                </div>





            </form>
        )
    }
}

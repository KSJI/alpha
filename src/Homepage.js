import React, { Component } from 'react';
import { DisplayHeader } from './DisplayHeader';
import { DisplayCards } from './DisplayCards';
import './HomePage.css';

export class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }
    render() {
        return (
            <div>
                <DisplayHeader />
                <div className='container'>
                    <DisplayCards history={this.props.history}/>
                </div>
            </div >
        )
    }
}


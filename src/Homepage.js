import React, { Component } from 'react';
import { DisplayHeader } from './DisplayHeader';
import { DisplayCards } from './DisplayCards';
import './HomePage.css';

export class Homepage extends Component {

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


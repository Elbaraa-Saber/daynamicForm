import React, { Component } from "react";
import './userContact.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
interface UserContactState {
    country: string;
}
class UserContact extends Component<{}, UserContactState> {
    constructor(props) {
        super(props);
        this.state = { country: ''};
        this.selectCountry = this.selectCountry.bind(this);
    }
    selectCountry(val) {
        this.setState({ country: val });
    }

    render() {
        const { country } = this.state;
        return (
            <div className="userContent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33496 16.0462C5.88802 16.4931 5.88802 17.2177 6.33496 17.6647C6.78189 18.1116 7.50652 18.1116 7.95346 17.6647L11.9998 13.6183L16.0463 17.6648C16.4932 18.1118 17.2179 18.1118 17.6648 17.6648C18.1117 17.2179 18.1117 16.4933 17.6648 16.0463L13.6183 11.9998L17.6645 7.95367C18.1114 7.50673 18.1114 6.78211 17.6645 6.33517C17.2175 5.88824 16.4929 5.88824 16.046 6.33517L11.9998 10.3813L7.95379 6.33533C7.50685 5.88839 6.78223 5.88839 6.33529 6.33533C5.88835 6.78226 5.88835 7.50689 6.33529 7.95382L10.3813 11.9998L6.33496 16.0462Z" fill="white"/>
                </svg>
                <div className="headContent">
                    <h3>Leave your contact</h3>
                    <p>We want to know all about you</p>
                </div>
                <div className="info">
                    <input className="name box" type="text" placeholder="Your name"/>
                    <input className="number box" type="tel" placeholder="Your phone" pattern="[+]{1}[0-9]{11,14}" required/>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => this.selectCountry(val)} />
                </div>
                <input className="send" type="submit" value="Send"/>
            </div>
        );
    }
}

export default UserContact;

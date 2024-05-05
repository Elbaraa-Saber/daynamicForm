import React, { useState, useRef } from "react";
import './userContact.css';
interface FormData {
    [key: string]: string;
}

function UserContact(props) {
    const [formData, setFormData] = useState<FormData>({}); 
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const notCorrect = useRef<HTMLSpanElement>(null);
    const { header, description, fields, buttons } = props;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const isValid = RegExp(e.target.pattern).test(value);
        setFieldErrors({ ...fieldErrors, [id]: !isValid ? 'Input is not correct' : '' });
        setFormData({ ...formData, [id]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const hasError = Object.values(fieldErrors).some(error => error !== '');
        if (hasError) {
            Object.entries(formData).forEach(([key, value]) => {
                const field = props.fields.find((field) => field.id === key);
                if (field && value) {
                    const isValid = RegExp(field.pattern).test(value);
                    if (!isValid) {
                        setFieldErrors({ ...fieldErrors, [key]: 'Input is not correct' });
                        const inputElement = document.getElementById(key);
                        if (inputElement) {
                            const nextSibling = inputElement.nextElementSibling;
                            if (nextSibling && nextSibling.tagName === "SPAN") {
                                nextSibling.classList.remove("disAppear");
                                nextSibling.classList.add("appear");
                            }
                        }
                    }
                }
            });
        } else {
            console.log("Form data:", formData);
            const inputElements = document.querySelectorAll('input');
            inputElements.forEach(inputElement => {
            const nextSibling = inputElement.nextElementSibling;
            if (nextSibling && nextSibling.tagName === "SPAN") {
                nextSibling.classList.remove("appear");
                nextSibling.classList.add("disAppear");
            }
            });
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="headContent">
                <h3>{header}</h3>
                <p>{description}</p>
            </div>
            <div className="info">
                {fields.map(field => (
                    <div className="field" key={field.id}>
                        {field.options ?
                            <>
                                <label htmlFor="">{field.label}</label>
                                <select id={field.id} onChange={handleInputChange}>
                                    {field.options.map(option => (
                                        <option key={option} style={{ backgroundColor: option }} value={option}>{option}</option>
                                    ))}
                                </select>
                            </> :
                            <>
                                <label htmlFor={field.id}>{field.label}:</label>
                                <input
                                    id={field.id} className="name box"
                                    accept={field.formats}
                                    size={field.max_size}
                                    pattern={field.pattern}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    maxLength={field.maxlength}
                                    minLength={field.minlength}
                                    required={field.required}
                                    onChange={handleInputChange}
                                />
                                <span className="notValid disAppear" ref={notCorrect}>This is not valid</span>
                            </>
                        }
                    </div>
                ))}
            </div>
            <div className="my-btns">
                {buttons.map(button => (
                    <React.Fragment key={button.type}>
                        {button.type === "button" ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.33496 16.0462C5.88802 16.4931 5.88802 17.2177 6.33496 17.6647C6.78189 18.1116 7.50652 18.1116 7.95346 17.6647L11.9998 13.6183L16.0463 17.6648C16.4932 18.1118 17.2179 18.1118 17.6648 17.6648C18.1117 17.2179 18.1117 16.4933 17.6648 16.0463L13.6183 11.9998L17.6645 7.95367C18.1114 7.50673 18.1114 6.78211 17.6645 6.33517C17.2175 5.88824 16.4929 5.88824 16.046 6.33517L11.9998 10.3813L7.95379 6.33533C7.50685 5.88839 6.78223 5.88839 6.33529 6.33533C5.88835 6.78226 5.88835 7.50689 6.33529 7.95382L10.3813 11.9998L6.33496 16.0462Z" fill="white"/>
                            </svg>
                            :
                            <input className="send" type={button.type} value={button.name} />
                        }
                    </React.Fragment>
                ))}
            </div>
        </form>
    )
}

export default UserContact;

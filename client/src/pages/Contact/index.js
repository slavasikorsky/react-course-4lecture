import React, { useEffect, useState } from 'react';

import Hero from '../../components/Hero';
import Form from '../../components/UI/Form';
import Input from '../../components/UI/Input';
import Container from '../../components/Container';
import Textarea from '../../components/UI/Textarea';
import notify from '../../helpers/Notification';

import heroImage from '../../assets/images/contact.jpg';
import './Contact.scss';

const Contact = () => { 
    const [contact, setContact] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        message: '',
    });
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [validMessage, setValidMessage] = useState(false);

    const formErrors = {
        name: 'Was contains at list 2 letters', 
        email: 'Mail doesn\'t valid', 
        phone: 'Please tell us your number please',
        message: 'Please enter long message',
    };

    useEffect(()=>{
        if(validName && validEmail && validPhone && validMessage)
            notify.success('Great success, very nice!', 'notify-success') 
    },[validName, validEmail, validPhone, validMessage])

    const nameValidation = (name) => {
        if (name.length < 2) {
            notify.error(formErrors.name, 'notify-name'); 
            setValidName(false);
        } else{
            setValidName(true)
        }
    }

    const emailValidation = (email) => {
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(emailValid) {
            setValidEmail(true);
        } else {
            notify.error(formErrors.email, 'notify-email');
            setValidEmail(false)
        }
    }

    const messageValidation = (message) => {
        if (message.length < 10) {
            notify.error(formErrors.message, 'notify-message');
            setValidMessage(false);
        } else {
            setValidMessage(true)
        }
    }


    const phoneValidation = (phone) => {
        if (phone.length < 7) {
            notify.error(formErrors.phone, 'notify-phone');
            setValidPhone(false);
        } else {
            setValidPhone(true)
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        Object.keys(contact).map((name) => {
            switch (name){
                case 'fname': 
                    nameValidation(contact.fname);
                    break;
                case 'email': 
                    emailValidation(contact.email);
                    break;
                case 'phone':
                    phoneValidation(contact.phone);
                    break;
                case 'message':
                    messageValidation(contact.message);
                    break;
                default:
                    break;
            }
            return false
        });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact({...contact, [name]: value});
    }

    return (
        <div className="contact-page">
            <Hero image={heroImage} title="Contact" />
            <Container>
                <div className="contact-wrapper">
                    <h1 className="contact-title">Contact Form</h1>
                    <Form onSubmit={handlerSubmit}>
                        <div className="row">
                            <Input 
                                className='input'
                                type="text" 
                                name={'fname'} 
                                value={contact.fname}
                                placeholder="Enter name" 
                                onChange={handleChange}
                            />
                            <Input 
                                className='input'
                                type="text" 
                                name={'lname'} 
                                value={contact.lname}
                                placeholder="Enter last name" 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <Input 
                                className='input'
                                type="text" 
                                name={'email'} 
                                value={contact.email}
                                placeholder="Enter email" 
                                onChange={handleChange}
                            />
                            <Input 
                                className='input'
                                type="tel" 
                                name={'phone'} 
                                value={contact.phone}
                                placeholder="Enter phone" 
                                onChange={handleChange}
                            />
                        </div>
                        <Textarea 
                            name={'message'} 
                            value={contact.message}
                            placeholder="Enter message" 
                            onChange={handleChange}
                        />
                        <button type="submit">Send</button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default Contact;
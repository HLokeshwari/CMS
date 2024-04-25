import React, { Component } from 'react';
import { callApi, errorResponse } from './main';
import './contact.css';
const styles = {
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  

  },
 
  // contactheader: {
  //   backgroundColor: 'rgb(21, 155, 162)',
  //   color: '#fff',
  //   padding: '10px',
  //   textAlign: 'right',
  //   zIndex: 2,
  //   position: 'fixed',
  //   width: '100%',
  //   height: '40px',
  // },
  // headerLink: {
  //   color: '#fff',
  //   textDecoration: 'none',
  // },
  footer: {
    backgroundColor: '#159ba2',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontSize: '10pt',
    zIndex: 2,
    position: 'fixed',
    width: '100%',
    bottom: 0,
    height: '20px',
  },
  contactbody: {
    background: '#fff',
    height: '100%',
    
  },
  input: {
    display: 'block',
    width: '100%',
    margin: '0 0 20px',
    padding: '10px',
    border: '1px solid #fff',
    borderRadius: '2px',
    background: '#FFF',
    fontSize: '17px',
    fontWeight: 'lighter',
    outline: 0,
    transition: 'border-color 0.3s ease-in-out',
    color: '#333',
  },
  textarea: {
    display: 'block',
    width: '100%',
    margin: '0 0 20px',
    padding: '10px',
    border: '1px solid #fff',
    borderRadius: '2px',
    background: '#FFF',
    fontSize: '17px',
    fontWeight: 'lighter',
    outline: 0,
    transition: 'border-color 0.3s ease-in-out',
    color: '#333',
    resize: 'none',
    height: '120px',
  },
  button: {
    display: 'block',
    height: '40px',
    background: '#fff',
    border: '1px solid #4D4D4D',
    borderRadius: '40px',
    cursor: 'pointer',
    color: '#4D4D4D',
    padding: '10px 0',
    outline: 0,
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 auto',
    transition: 'all 0.25s',
    width: '300px',
  },
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.contactRegister = this.contactRegister.bind(this);
  }

  contactRegister(event) {
    event.preventDefault();

    const RT1 = document.getElementById('RT1');
    const RT2 = document.getElementById('RT2');
    const RT3 = document.getElementById('RT3');
    const RT4 = document.getElementById('RT4');
    const RT5 = document.getElementById('RT5');

    const inputs = [RT1, RT2, RT3, RT4, RT5];
    let isEmptyField = false;

    for (let input of inputs) {
      if (input.value === '') {
        isEmptyField = true;
        input.style.border = '1px solid Red';
      } else {
        input.style.border = '1px solid #ccc';
      }
    }

    if (isEmptyField) {
      inputs.find(input => input.value === '').focus();
      return;
    }

    const url = 'http://localhost:5000/contactregistration/submit';
    const data = JSON.stringify({
      FirstName: RT1.value,
      LastName: RT2.value,
      Email: RT3.value,
      ContactNumber: RT4.value,
      Message: RT5.value,
    });

    callApi('POST', url, data, this.contactRegisteredSuccess, errorResponse);

    for (let input of inputs) {
      input.value = '';
    }
  }

  contactRegisteredSuccess(res) {
    // Handle success response here
  }

  render() {
    return (
      <div style={styles.formWrapper}>
        <div className='contactheader'>
          <a href="http://localhost:3000" className={styles.headerLink}>🔒Login</a>
        </div>
        <div style={{ ...styles.wrapper, display: 'flex', justifyContent: 'center' }}>
          <form className="contactform" onSubmit={this.contactRegister} style={{ maxWidth: '460px', width: '100%' }}>
            <div className='title'>Contact Us</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '42%' }}>
                <input type="text" style={styles.input} placeholder="First Name" autoFocus required id="RT1" />
              </div>
                      <div class="visme_d" data-title="Untitled Project" data-url="w46wjrvz-untitled-project?fullPage=true" data-domain="forms" data-full-page="true" data-min-height="100vh" data-form-id="27787"></div><script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>

              <div style={{ width: '48%' }}>
                <input type="text" style={styles.input} placeholder="Last Name" required id="RT2" />
              </div>
            </div>
            <input type="email" style={styles.input} placeholder="Email" required id="RT3" />
            <input type="tel" style={styles.input} placeholder="Contact" required id="RT4" />
            <textarea style={styles.textarea} form="contactform" placeholder="Message" required id="RT5"></textarea>
            <button style={styles.button} type="submit">SUBMIT</button>
          </form>
        </div>
        <div style={styles.footer}>
          Copyright @ KL University. All rights reserved.
        </div>
      </div>
    );
  }
}

export default ContactForm;

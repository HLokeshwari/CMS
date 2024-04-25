import React, { Component } from 'react';
import { callApi, errorResponse, getSession, callApiFileUpload } from './main';

export function uploadAssign() {
  var FU = document.getElementById('FU');

  var url = "http://localhost:5000/assignments/upload";
  var data = new FormData();
  data.append("aname", getSession("sid"));
  data.append("myfile", FU.files[0]);
  callApiFileUpload("POST", url, data, uploadSuccess, errorResponse);
}

export function uploadSuccess(res) {
  var data = JSON.parse(res);
  alert(data);
}

class Cairo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Tripregister = this.Tripregister.bind(this);
  }

  Tripregister(event) {
    event.preventDefault();

    const RT1 = document.getElementById('RT1');


    // Validation
    const inputs = [RT1];
    for (let input of inputs) {
      if (input.value === '') {
        input.style.border = '1px solid Blue';
        input.focus();
        return;
      }
    }

    const url = 'http://localhost:5000/fcourseregistration/submit';
    const data = JSON.stringify({
      emailid: RT1.value,
    });

    callApi('POST', url, data, this.TripregisteredSuccess, errorResponse);

    // Clear input fields after submission
    for (let input of inputs) {
      input.value = '';
    }

    this.setState({ showOrderCard: true });
  }

  TripregisteredSuccess(res) {
    // You can handle success response here if needed
  }

  render() {
    return (
      <div className='full-height'>
        <section className="containerplace">
          <header>File Upload Form</header>
          <form className="form" onSubmit={this.Tripregister}>
            <div className="column">
              <div className="input-box">
                <label>Email id*</label>
                <input required="" placeholder="Enter Email id" type="text" id="RT1" />

              </div>
              <div className="uploadcontainer">
                <br></br>
                <label htmlFor="arquivo">Upload Assignment:</label>
                <input accept=".pdf" className="inpdddut" id="FU" type="file" onChange={uploadAssign} />
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default Cairo;

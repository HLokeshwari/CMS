import React, { Component } from 'react';
import { callApi, errorResponse, getSession, callApiFileUpload } from './main';
import RecordRTC from 'recordrtc';
import './Courseform.css';

export function uploadVideo(file) {
    var url = "http://localhost:5000/uploadvideo";
    var data = new FormData();
    data.append("fname", getSession("sid"));
    data.append("myfile", file);
    callApiFileUpload("POST", url, data, uploadSuccess, errorResponse);
}

export function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

class Certificate extends Component {
    constructor(props) {
        super(props);
        this.Certificate = this.Certificate.bind(this);
        this.CertificateSuccess = this.CertificateSuccess.bind(this); // Binding the success function
        this.state = {
            isRecording: false,
            recordedURL: '',
            mediaStream: null, // Track the media stream for camera access
            recorder: null
        };
        this.stopRecording = this.stopRecording.bind(this);
    }

    componentDidMount() {
        this.startRecording();
    }

    startRecording() {
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" } })
                .then(stream => {
                    const recorder = new RecordRTC(stream, { type: 'video' });
                    recorder.startRecording();
                    this.setState({ isRecording: true, recorder, mediaStream: stream });
                })
                .catch(error => console.error('Error accessing screen:', error));
        } else {
            console.error("getDisplayMedia not supported");
        }
    }

    stopRecording() {
        const { recorder, mediaStream } = this.state;
        if (recorder) {
            recorder.stopRecording(() => {
                const recordedBlob = recorder.getBlob();
                // Disable camera access
                mediaStream.getTracks().forEach(track => track.stop());
                this.setState({ isRecording: false, recordedURL: URL.createObjectURL(recordedBlob), mediaStream: null });
                uploadVideo(recordedBlob); // Upload the recorded video
            });
        }
    }

    Certificate(event) {
      event.preventDefault();
      const RT1 = document.getElementById('RT1');
      const RT2 = document.getElementById('RT2');
      const RT3 = document.getElementById('RT3');
      const RT4 = document.getElementById('RT4');
      const RT5 = document.getElementById('RT5');
      // Validation
      const inputs = [RT1, RT2, RT3, RT4, RT5];
      for (let input of inputs) {
          if (input.value === '') {
              input.style.border = '1px solid Blue';
              input.focus();
              return;
          }
      }
  
      const { recorder, mediaStream } = this.state;
      if (recorder) {
          // Stop recording and upload the video
          recorder.stopRecording(() => {
              const recordedBlob = recorder.getBlob();
              // Disable camera access
              mediaStream.getTracks().forEach(track => track.stop());
              this.setState({ isRecording: false, recordedURL: URL.createObjectURL(recordedBlob), mediaStream: null });
              // Upload the recorded video
              uploadVideo(recordedBlob);
  
              // Submit certificate details
              const url = 'http://localhost:5000/certificate/submit';
              const data = JSON.stringify({
                  AcademicYear: RT1.value,
                  FullName: RT2.value,
                  Email: RT3.value,
                  PhoneNumber: RT4.value,
                  certification: RT5.value
              });
              callApi('POST', url, data, this.CertificateSuccess, errorResponse);
              
              // Clear input fields after submission
              for (let input of inputs) {
                  input.value = '';
              }
          });
      } else {
          // If no recording, just submit certificate details
          const url = 'http://localhost:5000/certificate/submit';
          const data = JSON.stringify({
              AcademicYear: RT1.value,
              FullName: RT2.value,
              Email: RT3.value,
              PhoneNumber: RT4.value,
              certification: RT5.value
          });
          callApi('POST', url, data, this.CertificateSuccess, errorResponse);
  
          // Clear input fields after submission
          for (let input of inputs) {
              input.value = '';
          }
      }
  }

    CertificateSuccess(res) {
        // You can handle success response here if needed
    }

    render() {
        const { isRecording, recordedURL } = this.state;

        return (
            <div className='full-height'>
                <section className="containercer">
                    <header>Certificate Course Registration Form</header>
                    <form className="cerform" onSubmit={this.Certificate}>
                        <div className="cercolumn">
                            <div className="cerinput-box">
                                <label htmlFor="AcademicYear">Academic Year*</label>
                                <select required id="RT1" name="Academic Year">
                                    <option value="" disabled selected>Select Academic Year</option>
                                    <option value="2023-2024">2023-2024</option>
                                    <option value="2024-2025">2024-2025</option>
                                    <option value="2025-2026">2025-2026</option>
                                </select>
                            </div>
                            <div className="cerinput-box">
                                <label>Full Name*</label>
                                <input required="" placeholder="Enter full name" type="text" id="RT2" />
                            </div>
                            <div className="cerinput-box">
                                <label>Email Id*</label>
                                <input required="" placeholder="Enter Email Id" type="text" id="RT3" />
                            </div>
                            <div className="cerinput-box">
                                <label>Phone Number*</label>
                                <input required="" placeholder="Enter phone number" type="tel" id="RT4" />
                            </div>
                            <div className="cerinput-box">
                                <label htmlFor="certification">Certification Course*</label>
                                <select required id="RT5" name="certification">
                                    <option value="" disabled selected>Select Certification</option>
                                    <option value="AWS-Cloud Practioner Level-I">AWS-Cloud Practioner Level-I</option>
                                    <option value="Salesforce+Mulesoft Certified LEVEL-I">Salesforce+Mulesoft Certified LEVEL-I</option>
                                    <option value="Oracle Certified Trainer Level-I">Oracle Certified Trainer Level-I</option>
                                </select>
                            </div>
                        </div>

                        {isRecording && (
                            <button className='recordbutton' onClick={this.stopRecording}>
                                Submit
                            </button>
                        )}
                        {recordedURL && (
                            <video className="recorded-video" controls src={recordedURL} />
                        )}

                      
                    </form>
                </section>
            </div>
        );
    }
}

export default Certificate;
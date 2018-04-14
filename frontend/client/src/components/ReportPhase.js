import React, { Component } from 'react';

import axios from 'axios';

class ReportPhase extends Component {

  state = {
    note: '',
    disableInput: false,
    noteSent: false
  }

  sendNoteHandler = () => {
    let text = document.getElementById("note-entry").value;
    if(text){
      const id = window.location.href.split("/").pop();
      axios.put(`http://localhost:3000/disturbances/${id}`, {
        notes: text,
        status: "ACTIVE"
      })
      .then((response) => {
        this.setState({note: text, disableInput: true, noteSent: true });
        console.log(response);
      })
      .catch((error) => {
      })
    }
  }

  undoHandler = () => {
    const id = window.location.href.split("/").pop();
    axios.put(`http://localhost:3000/disturbances/${id}`, {
      notes: "",
      status: "FAULTY"
    })
    .then((response) => {
      this.props.history.push({pathname: `/${id}`})
    })
  }

  toStartHandler = () => {
    this.props.history.push({pathname: '/'});
  }

  unlockTextareaHandler = () => {
    this.setState({disableInput: false});
  }

  textareaChanged() {
    let text = document.getElementById("note-entry").value;
    if(text) {
      this.setState({note: text});
    }
  }

  render(){
    let { note, disableInput, noteSent } = this.state;
    const back = "< Back to start";
    const undo = "< Undo";
    console.log(disableInput);
    let button = null;
    if(!noteSent && !disableInput){
      button = <div 
      className="send-button"
      onClick={this.sendNoteHandler}
      >Send >
      </div>;
    } else if (noteSent && !disableInput) {
      button = <div 
      className="send-button-no-animation"
      onClick={this.sendNoteHandler}
      >Update >
      </div>;
    } else {
      button = <div 
      className="disappear-button"
      >Sent!
      </div>;
    }
    <div 
    className="send-button"
    onClick={this.sendNoteHandler}
    >Send >
    </div>;

    const textArea = disableInput ? <textarea 
      placeholder="Enter message" 
      readOnly 
      rows="9" 
      className="text-area disabled"
      id="note-entry"
      onClick={this.unlockTextareaHandler}
    /> : <textarea 
      placeholder="Enter message" 
      autoFocus 
      rows="9" 
      className="text-area"
      id="note-entry"
    />;
    
    return(
      <div className="start-container">
        <div className="second-upper-half">
          <div 
            className="undo-button"
            onClick={this.undoHandler}>{undo}</div>
          {!noteSent ? 
          <span>Report sent</span> :
          <span className="completed">Report and info sent</span>
          }
          <div className="checkmarks">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            {noteSent && 
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            }
          </div>
          <p>Add a description below and attach it to the report</p>
        </div>
        <div className="second-bottom-half">
          {textArea}
          {button}
          <div 
            className="back-button"
            onClick={this.toStartHandler}
            >{back}</div>
        </div>
      </div>
      

      /*
      <Frame>
        <div className="title">
          <span>Report sent</span>
          <p>Fill in the box to add more information to the report</p>
        </div>
        {disableInput &&
        <div className="submit-title">
         <span>Information sent</span>
         <p>Click the input area to edit your report</p>         
        </div>  
        }
        {disableInput ? 
        <div className="sent-module">
          <div 
          className="undo-button"
          onClick={this.undoHandler}
          >
            <span>Clicked accidentally? Click here to undo</span>
          </div>
          <textarea 
            readOnly 
            rows="12" 
            id="note-entry"
            onChange={this.textareaChanged}
            onClick={this.unlockTextareaHandler}></textarea> 
          <div 
            className="sent-button"
            onClick={this.editNoteHandler}
            >
            <span>Sent!</span>
          </div>
        </div>
        :
        <div className="send-module">
          <div 
            className="undo-button"
            onClick={this.undoHandler}
            >
            <span>Clicked accidentally? Click here to undo</span>
          </div>
          <textarea autoFocus rows="12" id="note-entry"></textarea>
          <div 
            className="send-button"
            onClick={this.sendNoteHandler}
            >
            <span>Send</span>
          </div>           
        </div>
        }
      </Frame>
      */
    );
  }
}

export default ReportPhase;


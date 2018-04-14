import React, { Component } from 'react';
import Frame from '../hoc/Frame';

import axios from 'axios';

class ReportPhase extends Component {

  state = {
    note: '',
    disableInput: false
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
        this.setState({note: text, disableInput: true });
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
    let { note, disableInput } = this.state;
    console.log(note);
    return(
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
    );
  }
}

export default ReportPhase;


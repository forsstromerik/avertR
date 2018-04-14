import React, { Component } from 'react';
import Frame from '../hoc/Frame';

class ReportPhase extends Component {

  state = {
    note: '',
    disableInput: false
  }

  sendNoteHandler = () => {
    let text = document.getElementById("note-entry").value;
    if(text){
      this.setState({note: text, disableInput: true});

    }
  }

  render(){
    let { note, disableInput } = this.state;
    return(
      <Frame>
        <div className="title">
          <span>Report sent</span>
          <p>Fill in the box to add more information to the report</p>
        </div>
        {disableInput &&
        <div className="submit-title">
         <span>Information sent</span>
        </div>  
        }
        {disableInput ? 
        <div className="send-module">
          <textarea disabled rows="12" id="note-entry"></textarea> 
          <div 
            className="sent-button"
            onClick={this.editNoteHandler}
            >
            <span>Sent!</span>
          </div>
        </div>
        :
        <div className="send-module">
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


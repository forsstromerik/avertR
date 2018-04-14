import React, { Component } from 'react';

class Group extends Component {
    constructor(props) {
      super(props)
      this.state = {
          members : []
      }
    }
    componentWillMount() {
      console.log(this.props);
    }

  render() {
    return (
        <div>
          <p>Hi</p>
        </div>
    );
  }
}

export default Group;

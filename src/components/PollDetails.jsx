import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

export default class PollDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      errorEditing: false
    };
  }

  handleRemoveButtonClick(idPoll, titlePoll) {
    this.props.removePoll(idPoll, titlePoll);
  }

  handleEditClick() {
    const node = this.refs.title;
    const { poll } = this.props;

    this.setState({
      editing: true
    });

    node.value = poll.title;
    setTimeout(() => node.focus(), 0);
    setTimeout(() => node.setSelectionRange(0, node.value.length), 0);
  }

  handleCancelClick() {
    this.setState({
      editing: false,
      errorEditing: false
    });
  }

  handleOkClick() {
    const node = this.refs.title;
    const { poll, editPollTitle, polls } = this.props;
    const title = node.value.trim();
    const isRepeated = find(polls, poll => poll.title === title);
    if (title === poll.title){
      this.setState({
        editing: false,
        errorEditing: false
      });
    }else if (title.length === 0) {
      this.setState({ errorEditing: 'Please don`t use an empty name' });
    } else if (isRepeated){
      this.setState({ errorEditing: 'You already own a poll with this title' });
    } else {
      this.setState({
        editing: false,
        errorEditing: false
      });
      editPollTitle(poll.id, title);
    }
  }

  render() {
    const { poll } = this.props;
    return (
      <div className="panel-heading">
          <h3>
            <span  className={`${this.state.editing ? 'hidden' : ''}`}>
              { poll.title }
              <span style={{'marginLeft': '20px'}} className="btn glyphicon glyphicon-edit" onClick={ () => this.handleEditClick() }/>
              <button onClick={() => this.handleRemoveButtonClick(poll.id, poll.title)} className="btn btn-warning glyphicon glyphicon-trash pull-right"></button>
            </span>
            <div className={`input-group ${this.state.errorEditing ? 'has-error' : ''} ${this.state.editing ? '' : 'hidden'}`}>
              <input className="form-control" ref="title"/>
              <span className="input-group-btn">
                <button className="btn btn-danger" type="button" onClick={e => this.handleCancelClick(e)}><span className="glyphicon glyphicon-remove" /></button>
                <button className="btn btn-success" type="button" onClick={e => this.handleOkClick(e)}><span className="glyphicon glyphicon-ok" /></button>
              </span>
            </div>
          </h3>
          <p className={`${this.state.errorEditing ? 'text-danger' : 'hidden'}`}>{this.state.errorEditing}</p>
      </div>
    );
  }
}

PollDetails.propTypes = {
  poll: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  removePoll: PropTypes.func.isRequired,
  editPollTitle: PropTypes.func.isRequired
 };

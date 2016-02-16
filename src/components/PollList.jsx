import React, { Component, PropTypes } from 'react';
import PollItem from './PollItem';
import Spinner from './Spinner';
import { find } from 'lodash';

export default class PollList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addDisabled: true,
      loading: true,
      repeatedPoll: false
    };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if (!nextProps.auth.authenticated) {
      history.replaceState(null, '/');
    }

    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }


  handleAddButtonClick() {
    const { addPoll, polls } = this.props;
    const node = this.refs.title;
    const title =  node.value.trim();
    const isRepeated = find(polls, poll => poll.title === title);
    if (isRepeated) {
      this.setState({
        addDisabled: true,
        repeatedPoll: true
      });
    } else {
      addPoll(title);
      node.value = '';
      this.setState({
        addDisabled: true
      });
    }
  }

  handleOnChangeTitle() {
    const node = this.refs.title;
    const title =  node.value.trim();
    this.setState({
      addDisabled: title.length === 0,
      repeatedPoll: false
    });
  }

  handleOnTitleKeyDown(event) {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY && !this.state.addDisabled) {
      this.handleAddButtonClick();
    }
  }

  render() {

    const { polls, removePoll } = this.props;

    const contents = this.state.loading ?
      <Spinner /> :
      (
        <ul className="list-group">
            {
              polls.map( (poll, index) =>  <PollItem key={index} poll={poll} onRemovePoll={removePoll} /> )
            }
         </ul>
      );

    const alert = this.state.repeatedPoll ?
      <div className="alert alert-danger" role="alert">You can't have multiple polls with the same name</div> :
      null;

    return (
      <div className="row">
        <div className="col-md-6">
          { contents }
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Pull Title" ref="title" onKeyDown={e => this.handleOnTitleKeyDown(e)} onChange={e => this.handleOnChangeTitle(e)}/>
            <span className="input-group-btn">
              <button disabled={this.state.addDisabled} className="btn btn-info" type="button" onClick={e => this.handleAddButtonClick(e)}><span className="glyphicon glyphicon-ok-sign" /></button>
            </span>
          </div>
          <br/>
          { alert }
        </div>
      </div>
    );
  }
}

PollList.propTypes = {
  polls: PropTypes.array,
  addPoll: PropTypes.func.isRequired,
  removePoll: PropTypes.func.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

PollList.defaultProps = {
  polls: []
};

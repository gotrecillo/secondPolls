import React, { Component, PropTypes } from 'react';

export default class EntryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  handleEditClick() {
    const node = this.refs.title;
    const { entryTitle } = this.props;

    this.setState({
      editing: true
    });

    node.value = entryTitle;
    setTimeout(() => node.focus(), 0);
    setTimeout(() => node.setSelectionRange(0, node.value.length), 0);
  }

  handleCancelClick() {
    this.setState({
      editing: false
    });
  }

  handleOkClick() {
    const node = this.refs.title;
    const { poll, entryId, editEntryTitle } = this.props;

    this.setState({
      editing: false
    });

    editEntryTitle(poll.id, entryId, node.value.trim());
  }

  handleRemoveButtonClick(idPoll, idEntry) {
    this.props.removeEntry(idPoll, idEntry);
  }

  render() {
    const { poll, entryId, entryTitle } = this.props;

    return (
      <li style={{height: '55px'}} className="list-group-item">
        <span  className={`${this.state.editing ? 'hidden' : ''}`}>
          {entryTitle}
          <span style={{'marginLeft': '20px'}} className="btn glyphicon glyphicon-edit" onClick={ () => this.handleEditClick() }/>
          <button onClick={() => this.handleRemoveButtonClick(poll.id, entryId)} className="btn btn-warning pull-right">
            <span className="glyphicon glyphicon-trash"/>
          </button>
        </span>
        <div className={`input-group ${this.state.editing ? '' : 'hidden'}`}>
          <input className="form-control" ref="title"/>
          <span className="input-group-btn">
            <button className="btn btn-danger" type="button" onClick={e => this.handleCancelClick(e)}><span className="glyphicon glyphicon-remove" /></button>
            <button className="btn btn-success" type="button" onClick={e => this.handleOkClick(e)}><span className="glyphicon glyphicon-ok" /></button>
          </span>
        </div>
      </li>
    );
  }
}

EntryItem.propTypes = {
  poll: PropTypes.object.isRequired,
  editEntryTitle: PropTypes.func.isRequired,
  entryId: PropTypes.string.isRequired,
  entryTitle: PropTypes.string.isRequired,
  removeEntry: PropTypes.func.isRequired
};

EntryItem.defaultProps = {
  entries: []
};

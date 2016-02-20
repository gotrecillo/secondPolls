import React, { Component, PropTypes } from 'react';

export default class NotificationItem extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setNotificationAsReaded, message } = this.props;
    setNotificationAsReaded(message.id);
  }

  handleRemoveButtonClick(id) {
    this.props.removeNotification(id);
  }

  render() {
    const { message } = this.props;
    const className = message.isNew ? 'alert alert-info' : 'alert alert-success';
    return (
      <div className={className} role="alert">
        <button type="button" className="close" onClick={ () => this.handleRemoveButtonClick(message.id)}><span>&times;</span></button>
        <strong>Info:</strong> {message.text} at: {message.created.toLocaleString()}
      </div>
    );
  }
}

NotificationItem.propTypes = {
  message: PropTypes.object.isRequired,
  removeNotification: PropTypes.func.isRequired,
  setNotificationAsReaded: PropTypes.func.isRequired
};

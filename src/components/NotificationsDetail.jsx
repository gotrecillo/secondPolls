import React, { Component, PropTypes } from 'react';
import NotificationItem from './NotificationItem';

const PAGE_SIZE = 5;

export default class NotificationsDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxMessages: PAGE_SIZE
    };
  }

  handleRemoveAllButtonClick() {
    this.props.removeAllNotifications();
  }

  handleLoadMoreButtonClick() {
    this.setState({
      maxMessages: this.state.maxMessages + PAGE_SIZE
    });
  }

  render() {
    const { messages } = this.props;
    const { maxMessages } = this.state;
    const noMessages = messages.length === 0 ? <h3>No messages</h3> : null;
    const loadMore = maxMessages < messages.length ? <button style={{'margin-left': '10px'}} className="btn btn-default pull-right" onClick={ () => this.handleLoadMoreButtonClick() }>Load More</button> : null;
    const clean = messages.length > 0 ? <button className="btn btn-danger pull-right" onClick={ () => this.handleRemoveAllButtonClick() }>Clean</button> : null;
    return (
      <div className="col-md-6">
        { noMessages }
        { messages.slice(0, maxMessages).map( message => <NotificationItem key={message.id} message={message} {...this.props}/> ) }
        { loadMore }
        { clean }
      </div>
    );
  }
}

NotificationsDetail.propTypes = {
  messages: PropTypes.array,
  removeAllNotifications: PropTypes.func.isRequired
 };

 NotificationsDetail.defaultProps = {
  messages: []
};

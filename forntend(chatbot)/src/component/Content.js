import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import VoicePlayer from '../lib/VoicePlayer.js'

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
      conversationai: [],
      newmassage: "",
      play: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userMessage: event.target.value });


  }

  handleSubmit(event) {
    this.setState({ play: false })
    event.preventDefault();
    const msg = {
      text: this.state.userMessage,
      user: 'user',
    };


    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    axios.post('http://localhost:3001/test', {
      id: this.state.userMessage
    }).then((response) => {

      if (response.data.entities.intent === undefined) {
        let msgi = {
          text: "Sorry I don't understand what are you mean",
          user: 'ai'
        }
        this.setState({ newmassage: "Sorry I don't understand what are you mean" })
        this.setState({ play: true })
        this.setState({
          conversation: [...this.state.conversation, msgi],
        });
      } else {
        this.setState({ newmassage: response.data.entities.intent[0].value })
        this.setState({ play: true })
        var msgi = {
          text: response.data.entities.intent[0].value,
          user: 'ai'
        }

        this.setState({
          conversation: [...this.state.conversation, msgi],
        });
      }
    })

    this.setState({ userMessage: '' });
  }

  render() {

    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <h1 className="box" style={{ color: "#dc6a3d", paddingTop: "20px" }}>Please Input Indonesia text in Chatbot</h1>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your text and Clik Enter to send"
              />
              {this.state.play && (
                <VoicePlayer
                  play
                  pause={this.state.pause}
                  text={this.state.newmassage}
                />
              )}
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default Content;
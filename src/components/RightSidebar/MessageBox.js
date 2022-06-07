import React, { useEffect, useState } from 'react';
import LeftChatBubble from './LeftChatBubble';
import { useDispatch } from 'react-redux';
import RightChatBubble from './RightChatBubble';
import MessageInput from './MessageInput';
// import img from '..../'
import { addNewMessage } from '../../actions/contact';
import ProfileHeader from '../LeftSidebar/ProfileHeader';
function MessageBox(props) {
  const [chat, setChat] = useState([]);
  const [length, setLength] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setChat(props.user.chatlog);
    setLength(props.user.chatlog.length);
  }, [props]);
  let updateMesssages = (message) => {
    let object = {
      text: message,
      timestamp: '12:00',
      sender: 'me',
      message_id: length + 1,
    };
    dispatch(addNewMessage(object, props.user.id));
    // updatelength
    setLength(object.message_id);

    setChat([...chat, object]);
  };

  return (
    <>
      <div className="message-box">
        <div className="message-box-header" xs={6} sm={7} md={8} lg={7} xl={8}>
          <ProfileHeader user={props.user} />
        </div>
        {chat.length === 0 && (
          <p className="no-message-alert">NO MESSAGES FOUND</p>
        )}
        {chat.length > 0 && (
          <div className="messages-section">
            {chat.map((m, index) =>
              m.sender === "me" ? (
                <RightChatBubble
                  message={m}
                  key={index}
                  name={"Rupesh"}
                  image={""}
                   
                />
              ) : (
                <LeftChatBubble
                  message={m}
                  key={index}
                  name={props.user.name}
                  image={props.user.image}
                />
              )
            )}
          </div>
        )}

        <MessageInput newMessageHandler={updateMesssages} user={props.user} />
      </div>
    </>
  );
}

export default MessageBox;

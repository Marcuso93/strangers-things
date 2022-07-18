import React from "react";

const Profile = ({ userData }) => {
    return <>
        <h2 className="profileTitle">Sent Messages</h2>
        {userData.messages?.map((message, index) => {
            if (message.fromUser._id === userData._id) {
                return (

                    <div className="messages" key={index}>
                        <div><b>Sender:</b> {message.fromUser.username}</div>
                        <div><b>Message:</b> {message.content}</div>
                    </div>
                )
            }
        })
        }

        <h2 className="profileTitle">Recieved Messages</h2>
        {userData.messages?.map((message) => {
            if (message.fromUser._id !== userData._id) {
                return (

                    <div className="messages" key={message._id}>
                        <div><b>Sender:</b> {message.fromUser.username}</div>
                        <div><b>Message:</b> {message.content}</div>
                    </div>
                )
            }
        })
        }
    </>
}

export default Profile;
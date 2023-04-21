/* eslint-disable @typescript-eslint/restrict-template-expressions */
import './chat.scss';
import { useSocket } from "../../../hooks/useSocket";
import { type Gentleman, type Lady, selectUserConversationsWithUsersData, selectUserConversation } from "../../../redux/user/userSlice";
import { ChatWithUser } from './chatWithUser/chatWithUser';
import { useEffect, useState } from 'react';
import { Button } from '../../layout/button/button';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useGetConversationUserData } from '../../../hooks/useGetConversationUserData';
import { DisplayMessage } from './displayMessage/displayMessage';

export function Chat (): JSX.Element {
  const userConversationsWithUsersData = useTypedSelector(selectUserConversationsWithUsersData);
  const conversation = useTypedSelector(selectUserConversation);

  const { socket, onlineUsers, newUnreadedMessage, clearMessage } = useSocket();

  const [currentUser, setCurrentUser] = useState<Lady | Gentleman | any>([]);
  const [displayMessage, setDisplayMessage] = useState(0);
  const [page, setPage] = useState(0);
  const [finished, setFinished] = useState(false);

  useGetConversationUserData(page);

  useEffect(() => {
    if (userConversationsWithUsersData.length !== 0) return;
    const delay = setTimeout(() => { setFinished(true) }, 1000);

    return () => { clearTimeout(delay); }
  }, []);

  return (
    <div className='chat-container' style={{ transform: `translate(-${displayMessage}%)` }}>
      {
        conversation === null || conversation.length === 0
          ? <span>Vase konversacije ce se pojaviti ovde</span>
          : <div className='chat-online-users'>
            {
              finished
                ? <>
                  {onlineUsers?.map((friend: Lady | Gentleman, index): JSX.Element => (
                    <ChatWithUser
                      key={index}
                      user={friend}
                      onLine={true}
                      onClick={() => { setDisplayMessage(50); setCurrentUser(friend) }}
                      unreadedMessage={newUnreadedMessage} />
                  ))}
                  <span>Offline</span>
                  {userConversationsWithUsersData?.map((friend: Lady | Gentleman, index): JSX.Element | '' => (
                    onlineUsers.some(user => user.username === friend.username)
                      ? ''
                      : <ChatWithUser
                          key={index}
                          user={friend}
                          onLine={false}
                          onClick={() => { setDisplayMessage(50); setCurrentUser(friend) }}
                          unreadedMessage={newUnreadedMessage} />
                  ))}
                  {
                    conversation?.length !== userConversationsWithUsersData.length
                      ? <Button title={'Jos...'} onClickFunction={() => { setPage(prev => prev + 1) }} />
                      : ''
                  }
                </>
                : ''
            }
          </div>
      }
      <DisplayMessage
        socket={socket}
        currentUser={currentUser}
        clearMessage={clearMessage}
        setDisplayMessage={setDisplayMessage}
        finished={ finished } />
    </div>
  )
}

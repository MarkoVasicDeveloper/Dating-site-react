/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Gentleman, type Lady, selectUserRole, selectUserId, selectUserMessage, setMessage, selectUsersPhoto } from "../../../../redux/user/userSlice";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import './chatWithUser.scss';
import { type ApiResponse, apiRequest } from "../../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMessage } from "@fortawesome/free-solid-svg-icons";

interface ChatProps {
  user: Lady | Gentleman | any
  onClick: () => void
  unreadedMessage: Record<string, any>
  onLine: boolean
};

export function ChatWithUser ({ user, onClick, unreadedMessage, onLine }: ChatProps): JSX.Element {
  const dispatch = useDispatch();

  const usersPhotosDestination = useTypedSelector(selectUsersPhoto);
  const userRole = useTypedSelector(selectUserRole);
  const userId = useTypedSelector(selectUserId);
  const message = useTypedSelector(selectUserMessage);

  const getMessage = (): void => {
    const key = userRole === 'lady' ? 'gentlemanId' : 'ladyId';
    if (user[key] in message) { onClick(); return; }

    const newMessage = async (): Promise<ApiResponse> => {
      return await apiRequest(`api/getMessage/${userRole === 'lady' ? user.gentlemanId : userId}/${userRole === 'lady' ? userId : user.ladyId}`, 'get', null, userRole);
    };

    newMessage()
      .then((res) => { dispatch(setMessage({ [userRole === 'lady' ? user.gentlemanId : user.ladyId]: { ...res.data[0] } })) })
      .catch((error) => { console.log(error) })
    onClick()
  }

  const keyPhoto = userRole === 'lady' ? 'photosGentlemen' : 'photosLadies';

  return (
    <div className="chat-with-user-container" onClick={() => { getMessage() }}>
      <div className="chat-img">
        <img src={`${usersPhotosDestination}/${user.username}/${user[keyPhoto][0]?.path}`} alt={user.username} />
      </div>
      <div className="chat-user-info">
        <div>
          <span>{user.username}</span>
          <span>{user.city}</span>
          <span>{onLine ? <FontAwesomeIcon icon={faCircle} /> : ''}</span>
          <span>{unreadedMessage[userRole === 'lady' ? user.gentlemanId : user.ladyId] !== undefined
            ? <FontAwesomeIcon icon={faMessage} />
            : ''}</span>
        </div>
      </div>
    </div>
  )
}

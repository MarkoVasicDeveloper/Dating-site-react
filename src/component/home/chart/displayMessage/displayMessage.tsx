/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../layout/button/button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../../layout/input/input";
import { useInputText } from "../../../../hooks/useInputText";
import { type Socket } from "socket.io-client";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { type Gentleman, type Lady, selectUser, selectUserMessage, selectUserRole } from "../../../../redux/user/userSlice";
import { useRef } from "react";

interface DisplayMessageProps {
  socket: Socket
  currentUser: Lady | Gentleman | any
  clearMessage: (id: number) => void
  setDisplayMessage: React.Dispatch<React.SetStateAction<number>>
  finished: boolean
}

export function DisplayMessage ({ socket, currentUser, clearMessage, setDisplayMessage, finished }: DisplayMessageProps): JSX.Element {
  const user = useTypedSelector(selectUser);
  const userRole = useTypedSelector(selectUserRole);
  const message = useTypedSelector(selectUserMessage);

  const { data, edit } = useInputText({});

  const messageDiv = useRef<HTMLDivElement | null>(null);

  const currentUserId = userRole === 'lady' ? currentUser.gentlemanId : currentUser.ladyId;

  const newMessage = (): void => {
    socket.emit('newMessage', JSON.stringify({
      id: user.id,
      username: user.username,
      lady: user.role === 'lady',
      connectonId: currentUser[user.role === 'lady' ? 'gentlemanId' : 'ladyId'],
      connectionUsername: currentUser?.username,
      message: data.message
    }));

    const div = document.createElement('div');
    div.classList.add('left', 'message-container');
    div.innerHTML = `<p>${data.message}</p>`
    messageDiv?.current?.appendChild(div);
  };

  return (
    <div className="user-message">
      {
        finished
          ? <>
            <Button title={<FontAwesomeIcon icon={faClose} />} onClickFunction={() => { setDisplayMessage(0); clearMessage(currentUserId); } } /><div className="display-message" ref={messageDiv}>
              {message !== undefined && message !== null
                ? message[currentUserId]?.message?.map((message: any, index: number) => (
                  <div key={index} className={message.from === currentUserId ? 'right message-container' : 'left message-container'}>{message.message}</div>
                ))
                : ''}
            </div>
            <div>
              <Input onChangeInput={edit} name={'message'} id={"message"} title={"Poruka"} onEnter={newMessage} />
            </div>
          </>
          : ''
      }
    </div>
  )
}

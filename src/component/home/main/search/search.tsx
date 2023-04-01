/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Input } from '../../../layout/input/input'
import './search.scss'
import { useSearch } from '../../../../hooks/useSearch'
import { type User } from '../../../../redux/user/userSlice'
import { UserInfo } from '../../conversationRequest/userInfo/userInfo'
import { Button } from '../../../layout/button/button'

interface SearchProps {
  onClick: () => void
}

export function Search ({ onClick }: SearchProps): JSX.Element {
  const { array, filteredArray } = useSearch()

  return (
    <div className='search-container'>
      <div>
        <Button implementClass='back-button' title={'Nazad'} onClickFunction={onClick} />
      </div>
      <div className="input-div">
        <Input onChangeInput={(event: React.ChangeEvent<HTMLInputElement>) => { filteredArray(event.target.value) }} name={'query'} id={''} title={'Pretrazi: '} />
      </div>
      <div className="search-result">
        <div className="request">
        {
          array.map((user: User, index) => (
            <UserInfo key={index} conversation={user} index={0} interact={false} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

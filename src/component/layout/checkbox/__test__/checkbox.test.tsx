import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { renderWithProviders } from '../../../../utils/testUtils'
import { Checkbox } from '../checkbox'

describe('<Checkbox/>', () => {
  it('has required attributes', () => {
    const comp = renderWithProviders(
      <Checkbox id={'test'}
      onChange={undefined}
      value={'test value'}
      title={'test title'}/>)

    const input = comp.container.getElementsByTagName('input')[0]
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('checkedbox')
    expect(input).toHaveAttribute('type', 'checkbox')
  })

  it('should trigger the function', async () => {
    const click = jest.fn()
    const comp = renderWithProviders(
      <Checkbox id={'test'}
      onChange={click}
      value={'test value'}
      title={'test title'}/>)

    const input = comp.container.getElementsByTagName('input')[0]
    expect(input).toBeValid()

    act(() => { input.focus() })
    userEvent.type(input, 'text')
    expect(click).toBeCalled()
  })
})

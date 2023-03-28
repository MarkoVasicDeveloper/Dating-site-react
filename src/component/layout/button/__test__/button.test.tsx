import { findByText, fireEvent } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../../../utils/testUtils'
import { Button } from '../button'

describe('<Button/>', () => {
  describe('class implementation', () => {
    it('implement class when button is disabled', () => {
      const comp = renderWithProviders(<Button title={'Some button'} onClickFunction={undefined} type="submit" disabled={true}/>)

      expect(comp.container.firstChild).toHaveTextContent('Some button')
      expect(comp.container.firstChild).toHaveClass('disabled')
      expect(comp.container.firstChild).toBeDisabled()
    })

    it('implement class when button is not disabled', () => {
      const comp = renderWithProviders(<Button title={'Some button'} onClickFunction={undefined} type="submit" disabled={false}/>)

      expect(comp.container.firstChild).toHaveTextContent('Some button')
      expect(comp.container.firstChild).toHaveClass('succes-button')
      expect(comp.container.firstChild).toBeEnabled()
    })

    it('implement own class', () => {
      const comp = renderWithProviders(<Button title={'Some button'} onClickFunction={undefined} implementClass="Some class"/>)

      expect(comp.container.firstChild).toHaveTextContent('Some button')
      expect(comp.container.firstChild).toHaveClass('Some class')
      expect(comp.container.firstChild).toBeEnabled()
    })

    it('defaul button class', () => {
      const comp = renderWithProviders(<Button title={'Some button'} onClickFunction={undefined} default={true}/>)

      expect(comp.container.firstChild).toHaveClass('default')
      expect(comp.container.firstChild).toBeEnabled()
    })
  })
  describe('props', () => {
    it('test props', () => {
      const comp = renderWithProviders(<Button
        title={'Some button'}
        onClickFunction={undefined}
        default={true}
        titleFusnote="Some title"/>)

      expect(comp.container.firstChild).toHaveAttribute('type', 'button')
    })
  })

  describe('click', () => {
    it('on click', async () => {
      const onCLick = jest.fn()
      const comp = renderWithProviders(<Button
        title={'Some button'}
        onClickFunction={onCLick}/>)

      fireEvent.click(await findByText(comp.container, 'Some button'))

      expect(onCLick).toBeCalled()
    })
  })
})

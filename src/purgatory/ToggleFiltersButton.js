import React from 'react'
import { withTheme } from '../utils/theme'

let ToggleFiltersButton = ({ onClick, theme: { AlternateButton, Icon } }) => (
  <AlternateButton title="Toggle Filters" onClick={onClick}>
    <Icon icon="FilterAdd" />
  </AlternateButton>
)
export default withTheme(ToggleFiltersButton)

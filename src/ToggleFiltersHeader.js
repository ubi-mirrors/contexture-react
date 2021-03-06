import React from 'react'
import ToggleFiltersButton from './purgatory/ToggleFiltersButton'
import { Flex } from './greyVest'

let ToggleFiltersHeader = ({ mode, setMode, children }) => (
  <Flex style={{ alignItems: 'center' }}>
    {mode === 'resultsOnly' && (
      <span style={{ marginRight: 5 }}>
        <ToggleFiltersButton onClick={() => setMode('basic')} />
      </span>
    )}
    <h1>{children}</h1>
  </Flex>
)

export default ToggleFiltersHeader

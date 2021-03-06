import React from 'react'
import F from 'futil'
import _ from 'lodash/fp'
import greyVest from '../themes/greyVest'
import blueberry from '../themes/blueberry'
import base from '../themes/base'
import material from '../themes/material'
import { ThemeProvider, ThemeConsumer } from '../utils/theme'
import { Flex } from '../greyVest'

let themes = { base, blueberry, greyVest, material }

export let ThemeSwitcher = ({ defaultTheme = 'base', children }) => {
  let theme = React.useState(defaultTheme)
  return (
    <ThemeProvider theme={themes[F.view(theme)]}>
      <ThemeConsumer>
        {({ Box, Select }) => (
          <Box>
            <Flex alignItems="center">
              <p
                className="filter-field-label"
                style={{ margin: 0, marginRight: 8 }}
              >
                Current theme:
              </p>
              <Select
                options={F.autoLabelOptions(_.keys(themes))}
                {...F.domLens.value(theme)}
                placeholder={false}
                style={{ width: 'auto', minWidth: 200 }}
              />
            </Flex>
          </Box>
        )}
      </ThemeConsumer>
      {children}
    </ThemeProvider>
  )
}

export default defaultTheme => Story => (
  <ThemeSwitcher defaultTheme={defaultTheme}>
    <Story />
  </ThemeSwitcher>
)

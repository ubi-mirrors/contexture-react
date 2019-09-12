import React from 'react'

import {
  Button,
  ButtonGroup,
  DropdownItem,
  Modal,
  Input,
  Table,
} from 'reactstrap'
import { defaultProps } from 'recompose'
import F from 'futil-js'
import { expandProp } from '../../utils/react'

let openBinding = (...lens) => ({
  isOpen: F.view(...lens),
  toggle: F.flip(...lens),
})
let lensConvert = expandProp('open', openBinding)

// import Popover from './Popover'
import Select from './Select'
import Root from './Root'
import Icon from './Icon'

export default {
  Button,
  AlternateButton: props => <div style={{ padding: 10 }} {...props} />,
  ButtonGroup: defaultProps({ style: { display: 'flex' } })(ButtonGroup),
  DropdownItem,
  //Popover,
  Modal: lensConvert(Modal),
  Root,
  Icon,
  Select,
  TextInput: defaultProps({ type: 'text' })(Input),
  NumberInput: defaultProps({ type: 'number' })(Input),
  // Checkbox:  defaultProps({ type: 'checkbox' })(Input),
  Table,
}

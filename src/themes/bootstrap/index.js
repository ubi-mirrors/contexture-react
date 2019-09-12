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

/*
let baseTheme = {
  AlternateButton: 'button',
  Box: 'div',
  ButtonGroup: 'div',
  Checkbox: props => <input type="checkbox" {...props} />,
  DateInput: defaultProps({ native: true })(DateInput),
  Icon,
  Input: 'input',
  DropdownItem: 'li',
  Modal,
  NumberInput: props => <input type="number" {...props} />,
  NestedPicker,
  PagerItem: ({ children }) => <span>{children}</span>,
  Popover,
  RadioList: defaultProps({ native: true })(RadioList),
  Select,
  Table: 'table',
  Tag,
  TagsInput,
  TextHighlight,
  TextInput: 'input',
}
*/

export default {
  //Box: Card,
  Button,
  AlternateButton: defaultProps({ outline: true })(Button),
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

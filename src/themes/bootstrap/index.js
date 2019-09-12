import React from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  DropdownItem,
  Modal,
  Input,
  Table,
} from 'reactstrap'
import { defaultProps } from 'recompose'
import F from 'futil-js'
import { lensify } from '../../utils/react'

let conversion = (...lens) => ({
  isOpen: F.view(...lens),
  toggle: F.flip(...lens),
})
let lensConvert = lensify(conversion, 'isOpen')

// import Popover from './Popover'
import Select from './Select'

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
  Box: Card,
  Button,
  ButtonGroup: defaultProps({ style: { display: 'flex' } })(ButtonGroup),
  DropdownItem,
  //Popover,
  Modal: lensConvert(Modal),
  Root: ({ children }) => (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      {children}
    </>
  ),
  Select,
  TextInput: defaultProps({ type: 'text' })(Input),
  Table,
}

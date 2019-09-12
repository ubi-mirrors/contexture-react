import React from 'react'
import { Dropdown, DropdownMenu } from 'reactstrap'
import F from 'futil-js'
import { lensify } from '../../utils/react'

let conversion = (...lens) => ({
  isOpen: F.view(...lens),
  toggle: F.flip(...lens),
})
export let lensConvert = lensify(conversion, 'isOpen')

let Popover = ({ children, isOpen, ...props }) => (
  <DropdownMenu>{children}</DropdownMenu>
)

export default Popover

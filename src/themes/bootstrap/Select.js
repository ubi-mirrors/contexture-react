import React from 'react'
import { Input } from 'reactstrap'
import _ from 'lodash/fp'
import { observer } from 'mobx-react'

let Select = ({ options, placeholder = 'Please Select...', ...props }, ref) => (
  <Input type="select" {...props} ref={ref}>
    {placeholder && <option value="">{placeholder}</option>}
    {_.map(
      x => (
        <option key={x.value} value={x.value}>
          {x.label}
        </option>
      ),
      options
    )}
  </Input>
)

export default _.flow(
  React.forwardRef,
  observer
)(Select)

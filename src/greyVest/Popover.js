import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { observer } from 'mobx-react'
import * as F from 'futil-js'

// Simple popover
let Popover = observer(
  ({ isOpen, children, style }) =>
    F.view(isOpen) && (
      <OutsideClickHandler onOutsideClick={F.off(isOpen)}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            className="popover"
            style={{
              position: 'absolute',
              zIndex: 100,
              fontWeight: 'normal',
              textAlign: 'left',
              background: 'white',
              border: '1px solid #ebebeb',
              ...style,
            }}
          >
            {children}
          </div>
        </div>
      </OutsideClickHandler>
    )
)
Popover.displayName = 'Popover'

export default Popover
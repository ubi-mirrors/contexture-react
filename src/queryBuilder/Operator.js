import React from 'react'
import * as F from 'futil-js'
import { Component, lenservable } from '../utils/mobx-react-utils'
import styles from '../styles'
import Popover from '../layout/Popover'
import OperatorMenu from './OperatorMenu'
import { OperatorMoveTarget } from './DragDrop/MoveTargets'

let BlankOperator = ({ state, tree, child }) => (
  <div>
    <div
      onClick={F.flip(state.lens.isOpen)}
      style={{
        ...styles.blankOperator,
        borderBottomColor: styles.joinColor(tree.join),
      }}
    />
    {child.join &&
      child.join !== 'not' && (
        <div
          style={{
            ...styles.operatorLine,
            ...styles.blankOperatorLineExtended,
            ...styles.bgJoin(tree),
          }}
        />
      )}
  </div>
)
let OperatorLine = Component(({ tree, child, style }) => (
  <div
    style={{
      ...styles.operatorLine,
      ...(child.join && child.join !== 'not' && styles.operatorLineExtended),
      ...styles.bgJoin(tree),
      ...style,
    }}
  />
))
let JoinOperator = ({ state, tree, child, parent }) => (
  <div>
    <div
      onClick={F.flip(state.lens.isOpen)}
      style={{ ...styles.operator, ...styles.bgJoin(parent.joinHover || tree) }}
    >
      <span
        style={{
          ...(parent.joinHover && {
            fontStyle: 'italic',
            opacity: 0.5,
          }),
        }}
      >
        {parent.joinHover || tree.join}
      </span>
    </div>
    <OperatorLine {...{ tree, child }} />
  </div>
)
let Operator = Component(
  () => ({
    state: lenservable({
      isOpen: false,
    }),
  }),
  ({ state, tree, child, parent, root, parentTree, index }) => (
    <div>
      {!(index !== 0 || tree.join === 'not') ? (
        <BlankOperator {...{ state, tree, child }} />
      ) : (
        <JoinOperator {...{ state, tree, child, parent }} />
      )}
      <OperatorMoveTarget {...{ tree, root, index }} />
      <Popover
        isOpen={state.lens.isOpen}
        style={{
          ...styles.operatorPopover,
          ...styles.bdJoin(tree),
          ...(parent.wrapHover && { marginLeft: 0 }),
        }}
      >
        <OperatorMenu {...{ tree, parent, root, parentTree }} />
      </Popover>
    </div>
  )
)

export default Operator
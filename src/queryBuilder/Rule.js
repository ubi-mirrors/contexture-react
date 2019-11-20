import React from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash/fp'
import F from 'futil'
import styles from '../styles'
import Indentable from './preview/Indentable'
import FilterContents from './FilterContents'
import FilterDragSource from './DragDrop/FilterDragSource'
import { oppositeJoin, indent } from '../utils/search'
import { useLensObject } from '../utils/react'
import { withTheme } from '../utils/theme'

let Rule = ({
  node,
  parent,
  tree,
  connectDragSource,
  isDragging,
  theme: { AlternateButton, ButtonGroup, Icon },
  ...props
}) => {
  let hover = useLensObject({
    indent: false,
    remove: false,
    rule: false,
  })
  return connectDragSource(
    <div style={styles.w100}>
      <Indentable parent={parent} indent={hover.indent}>
        <div
          style={{
            ...styles.condition,
            ...styles.bdJoin(parent),
            ...(F.view(hover.remove) && {
              borderStyle: 'dashed',
              opacity: 0.25,
              ...styles.bgStriped,
            }),
            ...(isDragging && { opacity: 0.25 }),
            ...(F.view(hover.rule) && { background: styles.background }),
          }}
          {...F.domLens.hover(hover.rule)}
        >
          <FilterContents {...{ node, tree, ...props }} />
          <ButtonGroup
            style={{
              ...(F.view(hover.rule) || { visibility: 'hidden' }),
              overflow: 'visible',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}
          >
            <AlternateButton
              {...F.domLens.hover(hover.indent)}
              style={{
                color: styles.joinColor(oppositeJoin(parent.join)),
              }}
              onClick={() => indent(tree, parent, node)}
            >
              <Icon icon="MoveRight" />
            </AlternateButton>
            <AlternateButton
              {...F.domLens.hover(hover.remove)}
              onClick={() => tree.remove(node.path)}
            >
              <Icon icon="RemoveColumn" />
            </AlternateButton>
          </ButtonGroup>
        </div>
      </Indentable>
    </div>
  )
}

export default _.flow(
  observer,
  withTheme,
  FilterDragSource
)(Rule)

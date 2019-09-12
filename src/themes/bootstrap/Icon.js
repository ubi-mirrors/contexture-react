import React from 'react'
import _ from 'lodash/fp'
import Dynamic from '../../greyVest/Dynamic'

let toIcon = key => props => <i className={`fa fa-${key}`} {...props} />

let iconMap = {
  SortAscending: 'sort-up',
  SortDescending: 'sort-down',
  MoveLeft: 'chevron-left',
  MoveRight: 'chevron-right',
  RemoveColumn: 'minus',
  AddColumn: 'plus',
  FilterExpand: 'filter',
  FilterCollapse: 'filter',
  FilterAdd: 'filter',
  TableColumnMenu: 'ellipsis-v',
  FilterListExpand: 'plus',
  FilterListCollapse: 'minus',
  TreePause: 'minus-square',
  TreeUnpause: 'plus-square',
  PreviousPage: 'chevron-left',
  NextPage: 'chevron-right',
  Previous5Pages: 'ellipsis-h',
  Next5Pages: 'ellipsis-h',
  Refresh: 'repeat',
  AutoUpdate: 'refresh',
  New: 'eraser',
}

let iconComponents = _.mapValues(toIcon, iconMap)

export default ({ icon, ...props }) => (
  <Dynamic component={iconComponents[icon]} {...props} />
)

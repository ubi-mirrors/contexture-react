import React from 'react'
import F from 'futil'
import { TableFooter } from 'grey-vest'
import { contexturifyWithoutLoader } from '../../utils/hoc'

let ResultTableFooter = ({ tree, node, pageSizeOptions }) => {
  let getFromContext = key =>
    F.cascade([`context.response.${key}`, `context.${key}`], node)
  return (
    <TableFooter
      page={node.page || 1}
      onChangePage={page => tree.mutate(node.path, { page })}
      pageSize={node.pageSize}
      onChangePageSize={pageSize => tree.mutate(node.path, { pageSize })}
      pageSizeOptions={pageSizeOptions}
      {...F.arrayToObject(x => x, getFromContext, [
        'hasMore',
        'totalRecords',
        'startRecord',
        'endRecord',
      ])}
    />
  )
}

export default contexturifyWithoutLoader(ResultTableFooter)

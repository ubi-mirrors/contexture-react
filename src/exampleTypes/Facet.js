import React, { useState } from 'react'
import _ from 'lodash/fp'
import F from 'futil-js'
import { observer, Observer } from 'mobx-react'
import { exampleTypes } from 'contexture-client'
import treeLens from 'contexture-client/src/lens'
import { Flex } from '../layout/Flex'
import injectTreeNode from '../utils/injectTreeNode'

let CheckboxDefault = props => <input type="checkbox" {...props} />
let RadioListDefault = ({ value, onChange, options }) => (
  <Flex style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
    {_.map(
      x => (
        <label key={x.value} onClick={() => onChange(x.value)}>
          <input type="radio" checked={x.value === value} onChange={() => {}} />
          {x.label}
        </label>
      ),
      options
    )}
  </Flex>
)

let SelectAll = observer(({ node, tree, Checkbox }) => {
  let missingOptions = _.difference(
    _.map('name', _.get('context.options', node)),
    node.values
  )
  let allSelected = _.isEmpty(missingOptions)
  return (
    <label
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer',
      }}
    >
      <Checkbox
        checked={allSelected}
        onChange={() => {
          if (allSelected)
            tree.mutate(node.path, {
              values: [],
            })
          else
            tree.mutate(node.path, {
              values: node.values.concat(missingOptions),
            })
        }}
      />
      <div style={{ flex: 2, padding: '0 5px' }}>Select All</div>
    </label>
  )
})

let FacetOptionsFilter = ({ tree, node, TextInput, Button, ButtonGroup }) => {
  let [val, setVal] = useState(node.optionsFilter)
  let buttonEnabled = val !== node.optionsFilter
  let submit = () =>
    buttonEnabled && tree.mutate(node.path, { optionsFilter: val })
  return (
    <Observer>
      {() => (
        <ButtonGroup>
          <TextInput
            value={val}
            onChange={e => {
              setVal(e.target.value)
            }}
            onKeyPress={e => e.key === 'Enter' && submit()}
            onBlur={submit}
            placeholder="Find..."
          />
          <Button
            style={{ display: buttonEnabled ? 'block' : 'none' }}
            onClick={submit}
          >
            Submit
          </Button>
        </ButtonGroup>
      )}
    </Observer>
  )
}

let clampModel = (lens, interval = 10, min = interval, max = Infinity) => {
  let increased = (x = min) => x + interval - (x % interval)
  let decreased = (x = min) => x - interval - (x % interval)

  let canIncrease = increased(F.view(lens)) <= max
  let canDecrease = decreased(F.view(lens)) >= min

  let increase = canIncrease && F.sets(increased(F.view(lens)), lens)
  let decrease = canDecrease && F.sets(decreased(F.view(lens)), lens)
  return {
    increased,
    decreased,
    canIncrease,
    canDecrease,
    increase,
    decrease,
    more: increase,
    less: decrease,
  }
}

let clampModel2 = (value, interval = 10, min = interval, max = 999999999) => {
  let increased = value + interval - (value % interval)
  let decreased = value - interval - (value % interval)
  let canIncrease = increased <= max
  let canDecrease = decreased >= min
  return {
    max, min, interval, value,
    increased,
    decreased,
    canIncrease,
    canDecrease
  }
}

let clampLens = (lens, interval, min, max) => {
  let model = clampModel2(F.view(lens) || min, interval, min, max)
  return {
    ...model,
    more: F.sets(model.increased, lens),
    less: model.canDecrease && F.sets(model.decreased, lens),
  }
}

let Facet = injectTreeNode(
  observer(
    ({
      tree,
      node,
      hide = {},
      TextInput = 'input',
      Button = 'button',
      Checkbox = CheckboxDefault,
      RadioList = RadioListDefault,
      display = x => x,
      displayBlank = () => <i>Not Specified</i>,
      formatCount = x => x,
      ButtonGroup = 'div',
      minSize = 10,
      sizeInterval = 10,
    }) => {
      let clamp =  clampLens(
        treeLens(tree, node.path, 'size'),
        sizeInterval, minSize,
        node.context.cardinality
      )
      let { canIncrease, canDecrease, more, less } = clamp
      console.log(clamp)
      console.log(node.size)
      console.log(node.context.options.length)
      return (
      <div className="contexture-facet">
        <RadioList
          value={node.mode || 'include'} // Fix by changing defaults in client example type
          onChange={mode => tree.mutate(node.path, { mode })}
          options={F.autoLabelOptions(['include', 'exclude'])}
        />
        {!hide.facetFilter && (
          <FacetOptionsFilter
            tree={tree}
            node={node}
            TextInput={TextInput}
            Button={Button}
            ButtonGroup={ButtonGroup}
          />
        )}
        <SelectAll node={node} tree={tree} Checkbox={Checkbox} />
        {_.map(({ name, count }) => {
          let lens = tree.lens(node.path, 'values')
          return (
            <label
              key={name}
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              <Checkbox {...F.domLens.checkboxValues(name, lens)} />
              <div style={{ flex: 2, padding: '0 5px' }}>
                {display(name) || displayBlank()}
              </div>
              <div>{formatCount(count)}</div>
            </label>
          )
        }, _.get('context.options', node))}
        {!!node.context.cardinality && (
          <Flex
            className="contexture-facet-cardinality"
            justifyContent="space-between"
          >
            <div>
              Showing{' '}
              {_.min([node.size || minSize, node.context.options.length])} of{' '}
              {node.context.cardinality}
            </div>
            <div>
              {_.flow(
                _.compact,
                F.intersperse(' — ')
              )([
                true && (
                  <a key="less" onClick={less} style={{ cursor: 'pointer' }}>
                    View Less
                  </a>
                ),
                true && (
                  <a key="more" onClick={more} style={{ cursor: 'pointer' }}>
                    View More
                  </a>
                ),
              ])}
            </div>
          </Flex>
        )}
      </div>
    )}
  ),
  exampleTypes.facet
)
Facet.displayName = 'Facet'

export default Facet

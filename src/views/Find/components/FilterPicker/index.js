import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  render () {
    let {data,cols} =this.props
    return (
      <React.Fragment>
        {/* 选择器组件： */}
        <PickerView data={data}  cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={this.props.onCancel} onSave={this.props.onSave} />
      </React.Fragment>
    )
  }
}

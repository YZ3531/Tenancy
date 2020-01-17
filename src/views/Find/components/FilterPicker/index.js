import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  state={
    value:''
  }
  onChange=(value)=>{
    this.setState({
      value
    })
  }
  render () {
    let {data,cols,openType} =this.props
    let value = this.state
    return (
      <React.Fragment>
        {/* 选择器组件： */}
        <PickerView data={data} cols={cols} value={this.state.value} onChange={this.onChange} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={this.props.onCancel} onSave={()=>{
          this.props.onSave(openType,value)
        }} />
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  // 状态的初始化仅仅发生在组件第一次渲染时，当数据更新时，不会再次初始化
  state = {
    value: this.props.defaultValue
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }

  // 该生命周期函数触发条件：组件的相关数据（props和state）发生变化
  componentDidUpdate (prevProps, prevState) {
    // 不使用key的方式，而是使用生命周期的方式实现下拉列表组件的重用
    // 如果父组件defaultValue的props值发生变化时，手动进行更新
    // 必须添加条件判断：只有对应的值更新后才触发状态变更动作
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: this.props.defaultValue
      })
    }
  }

  render () {
    let { data, cols, openType } = this.props
    let { value } = this.state
    return (
      <React.Fragment>
        {/* 选择器组件： */}
        <PickerView data={data} cols={cols} value={this.state.value} onChange={this.onChange} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={this.props.onCancel} onSave={() => {
          this.props.onSave(openType, value)
        }} />
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

import { getCurrentCity } from '../../../../utils/API'


export default class Filter extends Component {
  state = {
    // 四个菜单高亮状态
    menuStatus: {
      area: false,
      mode: true,
      price: false,
      more: false
    },
    // 四个菜单选中的值
    menuValue: {
      area: '',
      mode: '',
      price: '',
      more: ''
    },
    // 当前选中的筛选条件
    openType: null,
    // 弹窗内容信息
    filtersData: [],
  }
  // 获取弹窗内容信息
  loadData = async () => {
    // 获取城市信息
    let city = await getCurrentCity()

    // 使用当前城市value值进行查询
    let res = await this.$axios.get('/houses/condition', {
      params: {
        id: city.value
      }
    })

    // 设置给本地数据
    this.setState({
      filtersData: res.body
    })

  }
  componentDidMount () {
    this.loadData()
  }
  // 修改菜单高亮状态
  changeStatus = (type) => {
    // 不要把自定义属性绑定到第三方组件中，因为不方便获取自定义属性值
    // 绑定click事件一个箭头函数，直接传递值过来

    // 麻烦写法
    // let newMenuStatus={...this.state.menuStatus}
    // newMenuStatus[type] = !newMenuStatus[type]
    // this.setState({
    //   menuStatus:newMenuStatus
    // })

    // 简单写法
    this.setState({
      menuStatus: {
        ...this.state.menuStatus,
        // 对象属性的名称可以是动态的
        [type]: true
      },
      // 当前选中的筛选条件
      openType: type
    })

  }
  // 控制弹窗的关闭-取消
  onCancel = () => {
    this.setState({
      openType: null
    })
  }
  // 控制弹窗的关闭-确定
  onSave = (type, value) => {
    // console.log(type,value);

    this.setState({
      menuValue: {
        ...this.state.menuValue,
        [type]: value
      },
      openType: null
    }, () => {
      let { menuValue } = this.state
      // 组合请求参数
      let filter = {}

      // 1. 区域筛选
      if (menuValue.area) {
        // 选中了条件，取出数组第一项数据，area或者subway
        let key = menuValue.area[0]

        // 判断数组第三项值是否为null
        if (menuValue.area[2] === 'null') {
          // 仅仅选择了两项数据，获取第二项数据
          filter[key] = menuValue.area[1]
        } else {
          // 选择了三项数据，获取第三项数据
          filter[key] = menuValue.area[2]
        }
      }

      // 2. 方式筛选
      if (menuValue.mode) {
        // 选中条件
        filter.mode = menuValue.mode[0]
      }

      // 3. 租金筛选
      if (menuValue.price) {
        // 选中条件
        filter.price = menuValue.price[0]
      }

      // 4. 更多筛选
      if (menuValue.more) {
        // 选中条件
        filter.more = ''
      }

    })
  }
  render () {
    let { openType, filtersData: { area, subway, rentType, price } } = this.state

    // 根据点击的筛选条件组装弹窗的列表数据
    let data = null // 数据
    let cols = 1 // 列
    // 下拉弹窗组件只有一份，但是数据可以动态填充
    switch (openType) {
      case 'area':
        // 区域筛选
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        cols = 1
        break;
      case 'price':
        data = price
        cols = 1
        break;
      default:
        break;
    }
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {openType === 'area' || openType === 'mode' || openType === 'price' ? <div className={styles.mask} /> : ''}


        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle changeStatus={this.changeStatus} menuStatus={this.state.menuStatus} />

          {/* 前三个菜单对应的内容： */}
          {openType === 'area' || openType === 'mode' || openType === 'price' ? <FilterPicker data={data} cols={cols} openType={openType} onSave={this.onSave} onCancel={this.onCancel} /> : ''}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

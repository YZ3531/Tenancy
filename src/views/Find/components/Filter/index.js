import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  state={
    menuStatus:{
      area:false,
      mode:true,
      price:false,
      more:false
    }
  }
  // 修改菜单高亮状态
  changeStatus=(type)=>{
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
      menuStatus:{
        ...this.state.menuStatus,
        // 对象属性的名称可以是动态的
        [type]:true
      }
    })
    
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle changeStatus={this.changeStatus} menuStatus={this.state.menuStatus}/>

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle (props) {
  let menus = titleList.map(item => {

    // 根据类型获取当前项是否需要高亮
    let flag = props.menuStatus[item.type]
    let cls = [styles.dropdown, flag ? styles.selected : ''].join(' ')
    return (
      <Flex.Item
        key={item.type}
        data-type={item.type}
        onClick={() => {
          props.changeStatus(item.type)
        }}
      >
        {/* 选中类名： selected */}
        <span className={cls}>
          <span>{item.title}</span>
          <i className="iconfont icon-arrow" />
        </span>
      </Flex.Item>
    )
  })
  return (
    <Flex align="center" className={styles.root}>
      {menus}
    </Flex>
  )
}

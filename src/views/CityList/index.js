/*
    城市列表组件

    使用React.Fragment组件可以作为唯一的跟元素，但是它本身不会被渲染
    类似Vue中template标签，<template v-show='flag'></template>
    也类似于小程序中block标签
*/

import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { AutoSizer, List } from 'react-virtualized'
import { getCurrentCity } from '../../utils/API'
import 'react-virtualized/styles.css'
import './index.scss'

class CityList extends React.Component {
    state = {
        cityData: {
            // 列表索引（标题）
            cityIndex: [],
            // 列表对象（存储每个索引对应的城市数组）
            cityObj: []
        },
        // 右侧索引当前选中
        activeIndex: 0,

    }

    // 创建一个标签或者组件的引用对象
    listRef = React.createRef()

    // 监听列表滚动
    onRowsRendered = ({ startIndex }) => {
        // 解构出长列表滚动时的起始索引
        // console.log(startIndex);
        // 根据startIndex值的变化更新右侧索引的值
        if (this.state.activeIndex !== startIndex) {
            // 如果起始索引不同于state中的activeIndex才去更新，
            // 防止setState重复调用，性能更好
            // console.log(startIndex);
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    // 动态计算当前行的高度
    calculateRowHeight = ({ index }) => {
        // 结构城市索引及数组对象
        let { cityIndex, cityObj } = this.state.cityData
        let firstLetter = cityIndex[index]
        let cityList = cityObj[firstLetter]

        // 行高的计算规则 : 标题的高度 + 每个城市高度 * 城市的数量
        return 36 + 50 * cityList.length
    }

    // 列表中每个条码渲染模板
    rowRenderer = ({ key, index, style }) => {
        // key表示唯一标识
        // index表示行的索引
        // style表示行的样式
        let { cityIndex, cityObj } = this.state.cityData

        // 根据当前的索引，获取标题的字符
        let firstLetter = cityIndex[index]
        let cityList = cityObj[firstLetter]

        // 生成每一个分组下的城市列表结构
        let cityListTag = cityList.map(item => (
            <div
                onClick={() => {
                    // 获取点击城市信息，并进行缓存
                    // 只允许选择一线城市 
                    // 允许选择的城市(仅一线城市)
                    let fCity = ['北京', '上海', '广州', '深圳']

                    // 不是一线城市，提示无法选中
                    if (!fCity.includes(item.label)) {

                        Toast.info('该城市暂无房源讯息', 1, null, false)
                        return
                    }

                    // 是一线城市，缓存数据
                    localStorage.setItem('currentCity', JSON.stringify({
                        label: item.label,
                        value: item.value
                    }))

                    // 跳回主页
                    this.props.history.push('/home')
                }}
                className='name'
                key={item.value + firstLetter}
            >
                {item.label}
            </div>
        ))

        // 返回模板
        return (
            <div key={key} style={style} className='city'>
                <div className='title'>{firstLetter}</div>
                {cityListTag}
            </div>
        )
    }

    // 加载城市列表数据
    loadCityData = async () => {
        let res = await this.$axios.get('/area/city', {
            params: {
                level: 1
            }
        })

        let ret = this.formatCityData(res.body)

        // 获取热门城市
        let hotCity = await this.$axios.get('/area/hot')
        ret.cityObj.hot = hotCity.body
        ret.cityIndex.unshift('hot')

        // 添加当前城市
        ret.cityIndex.unshift('#')
        let city = await getCurrentCity(this)
        ret.cityObj['#'] = [city]

        this.setState({
            cityData: ret
        }, () => {
            // 数据更新完成之后，计算列表的总高度
            // 从而保证滚动的准确性
            this.listRef.current.measureAllRows()
        })

        // 隐藏提示效果
        Toast.hide()
    }

    // 格式化城市列表数据
    formatCityData = (data) => {
        let cityObj = {}
        let cityIndex = []
        data.forEach(item => {
            // 获取城市首字母
            let firstLetter = item.short.substr(0, 1)

            // 将单个字符添加到数组中
            // cityIndex.push(firstLetter)
            // 判断cityObj中是否已经包含该字符
            // 如果包含，就继续添加一个新的城市
            // 否则，就初始化一个新的数组并且添加第一个城市
            if (cityObj.hasOwnProperty(firstLetter)) {
                // hasOwnProperty作用：判断对象中是否包含指定的属性
                cityObj[firstLetter].push(item)
            } else {
                // 不包含
                cityObj[firstLetter] = [item]
            }
        })

        // 先获取对象所有的key，然后对数组进行排序
        cityIndex = Object.keys(cityObj).sort()

        return {
            cityObj,
            cityIndex
        }
    }

    // 组件开始加载时进行提示
    componentDidMount () {
        Toast.loading('正在加载...', 0, null, false)
        // 调用接口获取数据
        this.loadCityData()
        // let w = document.documentElement.clientWidth
        // let h = document.documentElement.clientHeight
        // console.log(w, h)
    }

    // 生成城市列表模板
    renderCityList = () => {

        let { cityData } = this.state
        let cityIndex = cityData.cityIndex
        let cityObj = cityData.cityObj

        let list = []
        cityIndex && cityIndex.forEach((item, i) => {
            // 分组标题
            list.push(<div key={item + '-' + i}>{item}</div>)
            // 根据索引获取城市具体数据
            let city = cityObj[item]
            // 城市列表
            city.forEach((city, index) => {
                list.push(<div key={i + '-' + index}>{city.label}</div>)
            })
        })
        return list
    }

    // 生成右侧索引列表
    renderRightIndex = () => {
        let { cityIndex } = this.state.cityData
        // 解构state中选中索引
        let { activeIndex } = this.state
        return cityIndex.map((item, index) => (
            <li
                onClick={() => {
                    // 获取list实例组件
                    let list = this.listRef.current
                    // 调用组件的公共方法
                    list.scrollToRow(index)
                    // 只有点击索引最后一个字符时才触发
                    if (cityIndex.length - 1 === index) {
                        setTimeout(() => {
                            this.setState({
                                activeIndex: index
                            })
                        }, 0)
                    }
                }}
                key={index}
                className="city-index-item">
                {/* 如果选中索引与当前列表循环项索引一致，加上选中样式类名 */}
                <span className={activeIndex === index ? 'index-active' : ''}>
                    {/* 简单处理数据格式，hot改为热，其余改为大写字母 */}
                    {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
        ))
    }


    render () {
        let { cityIndex } = this.state.cityData
        return (
            <React.Fragment>
                {/* 导航栏 */}
                <NavBar
                    mode="light"
                    className='cityNavbar'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        // 控制路由的跳转,回调到上一次记录
                        this.props.history.go(-1)
                    }}
                >城市选择</NavBar>

                {/* 城市列表 */}
                <div className="cityList">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                scrollToAlignment={'start'}
                                width={width}
                                height={height}
                                ref={this.listRef}
                                rowCount={cityIndex.length}
                                onRowsRendered={this.onRowsRendered}
                                rowHeight={this.calculateRowHeight}
                                rowRenderer={this.rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>

                {/* 右侧索引 */}
                <ul className='city-index'>
                    {/* <li className="city-index-item">
                        <span className='index-active'>
                            A
                        </span>
                    </li>
                    <li className="city-index-item">
                        <span className='index-active'>
                            B
                        </span>
                    </li> */}
                    {this.renderRightIndex()}
                </ul>
            </React.Fragment>
        )
    }
}
export default CityList
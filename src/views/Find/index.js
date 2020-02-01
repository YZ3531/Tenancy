import React from 'react'
import { Flex } from 'antd-mobile'
import './index.scss'
import { getCurrentCity } from '../../utils/API'
import Filter from './components/Filter'
import { AutoSizer, List } from 'react-virtualized' // 长列表组件及样式
import 'react-virtualized/styles.css'

class Find extends React.Component {
    state = {
        currentCity: '',
        filter: null,
        total: -1,
        listData: []
    }
    async componentDidMount () {
        let res = await getCurrentCity()
        this.setState({
            currentCity: res.label
        })
    }
    // 获取筛选组件传递来的请求参数
    onFilter = (filter) => {
        console.log(filter);
        this.setState({
            filter: filter
        })
        this.loadData(filter)
    }
    // 根据请求参数，获取后台接口数据
    loadData = async (filter) => {
        let city = await getCurrentCity()
        filter.cityId = city.value
        let res = await this.$axios.get('/houses', {
            params: filter
        })
        console.log(res);
        this.setState({
            total: res.body.count,
            listData: res.body.list
        })

    }
    rowRenderer = ({ index, key, style }) => {
        return <div style={style} key={key}>内容：{index}</div>
    }
    render () {
        let { currentCity } = this.state
        return (
            <div className='find'>
                {/* 顶部导航栏 */}
                <Flex className='header'>
                    <i className="iconfont icon-back" />
                    <Flex className='search-box searchHeader'>
                        {/* 左侧白色区域 */}
                        <Flex className="search">
                            {/* 位置 */}
                            <div className="location" >
                                <span className="name">{currentCity}</span>
                                <i className="iconfont icon-arrow" />
                            </div>
                            {/* 搜索表单 */}
                            <div className="form" >
                                <i className="iconfont icon-seach" />
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </Flex>
                        {/* 右侧地图图标 */}
                        <i className="iconfont icon-map" />
                    </Flex>
                </Flex>

                {/* 筛选条件菜单 */}
                <Filter onFilter={this.onFilter}></Filter>

                {/* 房源列表 */}
                <AutoSizer>
                    {({ width, height }) => {
                        return (
                            <List
                                width={width}
                                height={height}
                                rowCount={20}
                                rowHeight={100}
                                rowRenderer={this.rowRenderer}
                            />
                        )
                    }}
                </AutoSizer>
            </div>

        )
    }
}

export default Find

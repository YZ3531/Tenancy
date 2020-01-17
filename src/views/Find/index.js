import React from 'react'
import { Flex } from 'antd-mobile'
import './index.scss'
import { getCurrentCity } from '../../utils/API'
// 引入组件
import Filter from './components/Filter'

class Find extends React.Component {
    state = {
        currentCity:""
    }
    async componentDidMount(){
        let res = await getCurrentCity()
        this.setState({
            currentCity:res.label
        })
    }
    render () {
        let {currentCity} = this.state
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
                <Filter></Filter>
            </div>

        )
    }
}

export default Find

import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import './index.scss'
import { IMG_BASE_URL } from '../../utils/API'
import navImg1 from '../../assets/images/nav-1.png'
import navImg2 from '../../assets/images/nav-2.png'
import navImg3 from '../../assets/images/nav-3.png'
import navImg4 from '../../assets/images/nav-4.png'


class HomeIndex extends React.Component {
    state = {
        swiperData: [],
        navData: [
            {
                id: 1,
                imgSrc: navImg1,
                name: '整租'
            },
            {
                id: 2,
                imgSrc: navImg2,
                name: '合租'
            },
            {
                id: 3,
                imgSrc: navImg3,
                name: '地图找房'
            },
            {
                id: 4,
                imgSrc: navImg4,
                name: '去出租'
            },
        ],
        groupData: []
    }
    // 获取轮播图数据
    loadSwiper = async () => {
        let { body } = await this.$axios('/home/swiper')

        this.setState({
            swiperData: body
        })
    }
    // 生成轮播图结构
    renderSwiperItem = () => {
        return this.state.swiperData.map(item => (
            <img key={item.id} src={'http://localhost:8080' + item.imgSrc} alt="" />
        ))
    }
    // 生成菜单栏结构
    renderNavItem = () => {
        return this.state.navData.map(item => (
            <Flex.Item key={item.id}>
                <img src={item.imgSrc} alt="" />
                <p>{item.name}</p>
            </Flex.Item>
        ))
    }
    // 获取租房小组数据
    loadGroup = async () => {
        let { body } = await this.$axios('/home/groups')
        this.setState({
            groupData: body
        })

    }
    // 声明周期钩子函数
    componentDidMount () {
        this.loadSwiper()
        this.loadGroup()
    }
    render () {
        return (
            <div>
                {/* 轮播图区域 */}
                <Carousel autoplay={true} infinite={true}>
                    {this.renderSwiperItem()}
                </Carousel>
                {/* 导航栏区域 */}
                <Flex>
                    {this.renderNavItem()}
                </Flex>
                {/* 租房小组区域 */}
                <div className="group">
                    {/* 标题 */}
                    <Flex className="group-title" justify="between">
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </Flex>
                    {/* 列表 */}
                    <Grid
                        hasLine={false}
                        activeStyle={false}
                        square={false}
                        data={this.state.groupData}
                        columnNum={2}
                        renderItem={item => (
                            <Flex className="grid-item" justify="between">
                                <div className="desc">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <img src={`${IMG_BASE_URL}${item.imgSrc}`} alt="" />
                            </Flex>
                        )}
                    />
                </div>
                {/* 最新资讯区域 */}

            </div>
        )
    }
}

export default HomeIndex
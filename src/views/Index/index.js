import React from 'react'
import { Carousel, Flex, Grid, NavBar, Icon } from 'antd-mobile'
import './index.scss'
import { IMG_BASE_URL , getCurrentCity} from '../../utils/API'
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
        groupData: [],
        newsData: [],
        currentCity: '北京'
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
            <img
                key={item.id}
                src={IMG_BASE_URL + item.imgSrc}
                alt="点击查看"
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                }}
            />
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
    // 获取资讯列表数据
    loadNews = async () => {
        let { body } = await this.$axios('/home/news')
        this.setState({
            newsData: body
        })
    }
    // 生成资讯列表结构
    renderNewsItem = () => {
        return this.state.newsData.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`${IMG_BASE_URL}${item.imgSrc}`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }
    // 声明周期钩子函数
    async componentDidMount () {
        this.loadSwiper()
        this.loadGroup()
        this.loadNews()

        // 获取缓存中的位置信息
        let city = await getCurrentCity(this)
        this.setState({
            currentCity: city.label
        })
    }
    render () {
        return (
            <div>
                {/* 顶部导航栏 */}
                <NavBar
                    mode="dark"
                    leftContent={this.state.currentCity}
                    onLeftClick={() => {
                        this.props.history.push('/cityList')
                    }}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '6px' }} />,
                    ]}
                >首页</NavBar>

                {/* 轮播图区域 */}
                <Carousel autoplay={true} infinite={true}>
                    {this.renderSwiperItem()}
                </Carousel>

                {/* 导航栏区域 */}
                <Flex className='navList'>
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
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    {this.renderNewsItem()}
                </div>
            </div>
        )
    }
}

export default HomeIndex
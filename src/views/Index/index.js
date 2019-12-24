import React from 'react'
import { Carousel } from 'antd-mobile'
// import axios from 'axios'

class HomeIndex extends React.Component {
    state = {
        swiperData: []
    }
    // 获取轮播图数据
    loadSwiper = async () => {
        let {body} = await this.$axios('/home/swiper')
        
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
    // 声明周期钩子函数
    componentDidMount () {
        this.loadSwiper()
    }
    render () {
        return (
            <div>
                <Carousel
                    autoplay
                    infinite>
                    {this.renderSwiperItem()}
                </Carousel>
            </div>
        )
    }
}

export default HomeIndex
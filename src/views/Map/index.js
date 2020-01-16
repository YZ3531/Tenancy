import React from 'react'
import './index.scss'

/*
    地图测试
    使用方式：
        - 注册百度地图账号
        - 申请地图接口秘钥，获取一个key
        - 引入百度地图js库文件
        - 使用百度地图API实现地图及相关应用
*/

class TestMap extends React.Component{
    initMap=()=>{
        // 1. 渲染到id为map的容器中
        let map = new window.BMap.Map('map')
        // 2. 经纬度
        let point = new window.BMap.Point(116.404,39,39.915)
        // 3. 参数一代表地图中心坐标，参数二代表缩放级别
        map.centerAndZoom(point,15)


        // 根据ip地址定位
        // const position = new window.BMap.LocalCity()
        // position.get((ret)=>{
        //     console.log(ret);
        // })
    }
    // 组件初始化的时候调用一次
    componentDidMount(){
        this.initMap()
    }
    render(){
        return(
            <div id='map'>
                测试
            </div>
        )
    }
}

export default TestMap
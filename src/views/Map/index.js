import React from 'react'
import './index.scss'

/*
    地图测试
*/

class TestMap extends React.Component{
    initMap=()=>{
        let map = new window.BMap.Map('map')
        let point = new window.BMap.Point(116.404,39,39.915)
        // 参数1代表地图中心坐标，参数二代表缩放级别
        map.centerAndZoom(point,15)
    }
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
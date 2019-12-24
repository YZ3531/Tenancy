/*
    首页模块
*/
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import './Home.css'

// 导入模块
import Index from './Index/index.js' 
import Find from './Find/index.js'
import Info from './Info/index.js'
import My from './My/index.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'index',

        };
    }
    // 动态生成底部菜单
    renderMenuItem = () => {
        let menuData = [
            {
                key: 'index',
                title: '主页',
                icon: 'icon-ind'
            }, {
                key: 'find',
                title: '找房',
                icon: 'icon-findHouse'
            }, {
                key: 'info',
                title: '资讯',
                icon: 'icon-myinfo'
            }, {
                key: 'my',
                title: '我的',
                icon: 'icon-my'
            }
        ]
        return menuData.map(item => (
            <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<i className={'iconfont ' + item.icon}></i>}
                selectedIcon={<i className={'iconfont ' + item.icon}></i>}
                selected={this.state.selectedTab === item.key}
                onPress={() => {
                    // 菜单的点击事件
                    this.setState({
                        selectedTab: item.key
                    });
                    // 编程式导航控制路由跳转
                    this.props.history.push('/home/' + item.key)
                }}
            />
        ))

    }
    render () {
        return (
            <div className='menu'>
                {/* 内容区 */}
                <Switch>
                    <Redirect exact from='/home' to="/home/index" />
                    <Route path='/home/index' component={Index} />
                    <Route path='/home/find' component={Find} />
                    <Route path='/home/info' component={Info} />
                    <Route path='/home/my' component={My} />
                </Switch>
                {/* 菜单区 */}
                <TabBar noRenderContent={true}>
                    {this.renderMenuItem()}
                </TabBar>
            </div>
        );
    }
}
export default Home
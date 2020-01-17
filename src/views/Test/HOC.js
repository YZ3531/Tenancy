// 测试高阶组件
import React from 'react'

class HOC extends React.Component {
    render () {
        // let { history } = this.props
        // history && history.push()

        // 传入的函数可以调用
        // let fn = this.props.children
        // fn({w:400,h:200})

        return (
            <div>
                <div>HOC:{this.props.width}{this.props.height}</div>
                {/* {this.props.children} */}
            </div>
        )
    }
}


class TestHOC extends React.Component {
    render () {
        return (
            <div>
                <h3>测试高阶组件</h3>

                {/* 基本使用 */}
                {/* <HOC></HOC>
                <WrapHOC></WrapHOC> */}

                {/* 可以传入元素 */}
                {/* <HOC>
                    <div>标签之间内容</div>
                </HOC> */}

                {/* 可以传入函数 */}
                {/* <HOC>
                    {({w,h})=>{
                        console.log(w,h);
                        console.log('可以传入函数');
                    }}
                </HOC> */}


                <AutoSizer>
                    {({ w, h }) => (
                        <HOC width={w} height={h} />
                    )}
                </AutoSizer>
            </div>
        )
    }
}


class AutoSizer extends React.Component {
    render () {
        let fn = this.props.children
        let WrapHoc=fn({ w: 400, h: 200 })

        return WrapHoc
        
    }
}

// 定义一个高阶组件
// 参数接受一个组件
// 返回值返回另一个组件
// withHoc向组件注入一个history属性
// 他的值是一个对象，其中包含一个方法
// 类似于之前React-router中的withRouter方法（其实它就是高阶组件）

function withHoc (Component) {
    // 所谓高阶组件
    // -接受一个组件作为参数
    // -返回一个另一个组件
    return class extends React.Component {
        state = {
            say: {
                push () {
                    console.log('哈哈哈');
                }
            }
        }

        render () {
            return <Component history={this.state.say} />
        }
    }
}

const WrapHOC = withHoc(HOC)


export default TestHOC
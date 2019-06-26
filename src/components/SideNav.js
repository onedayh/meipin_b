import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {connect} from 'react-redux';
import {changeSideNav} from "../action/nav";
import history from '../router/history';
const {SubMenu, Item} = Menu;

class SideNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            list: [
                {title: 'm1', sub: [], key: '/m1', icon: 'mail'},
                {title: 'page1', sub: [
                        {title: 'p1', sub: [], key: '/page1/p1'},
                        {title: 'p2', sub: [], key: '/page1/p2'},
                        {title: 'p3', sub: [], key: '/page1/p3'},
                    ], key: '/page1', icon: 'appstore'},
                {title: 'page2', sub: [
                        {title: 'v1', sub: [], key: '/page2/v1'},
                        {title: 'v2', sub: [], key: '/page2/v2'},
                        {title: 'v3', sub: [], key: '/page2/v3'},
                    ], key: '/page2', icon: 'setting'},

            ]
        }
        this.rootSubmenuKeys = ['/page1', '/page2']
    }


    componentWillMount() {
        this.setState({
            openKeys: this.props.$$curOpenKey
        })
    }

    getKey = item => {
        const {keyPath, key} = item;
        const firstKey = keyPath.find(key => this.rootSubmenuKeys.some(k => key === k));
        history.replace(key);
        this.props.__onChangeNav([key], firstKey ? [firstKey] : []);
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            })
        }
    }

    render() {
        const {list, openKeys} = this.state, {$$curOpenKey, $$curSelectKey} = this.props;
        return(
            <div style={styles.sideNav}>
                <Menu
                    mode="inline"
                    defaultOpenKeys={$$curOpenKey}
                    openKeys={openKeys}
                    defaultSelectedKeys={$$curSelectKey}
                    onOpenChange={this.onOpenChange}
                    style={{width: 180}}
                    onClick={item => this.getKey(item)}
                >
                    {
                        list.map(item =>
                            item.sub.length ? (
                                <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                                    {
                                        item.sub.map(it =>
                                            <Item key={it.key}>{it.title}</Item>
                                        )
                                    }
                                </SubMenu>
                            ) : (
                                <Item key={item.key}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Item>
                            )
                        )
                    }
                </Menu>
            </div>
        )
    }
}

const styles = {
    sideNav: {
        height: '100%',
        minHeight: '100%',
        overflowY: 'auto',
        width: '200px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9,
        backgroundColor: '#ccc',
        paddingTop: 110
    }
}

const mapStateToProps = state => ({
    $$curSelectKey: state.nav.curSelectKey,
    $$curOpenKey: state.nav.curOpenKey
})

const mapDispatchToProps = dispatch => {
    return {
        __onChangeNav: (selectKey, openKey) => dispatch(changeSideNav(selectKey, openKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
import React, {Component} from 'react';
import SideNav from '../components/SideNav';
import Headers from '../components/Headers';
import RouteView from '../router/RouteView';

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id='App'>
                <Headers />
                <SideNav />
                <div className='view-wrap'>
                    <RouteView />
                    <p className='footer'>footer</p>
                </div>
            </div>
        )
    }
}

export default Index
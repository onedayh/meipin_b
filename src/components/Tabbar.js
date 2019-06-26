import React, {Component} from 'react';

class Tabbar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div style={styles.tabbar}>tabbar</div>
        )
    }
}

export default Tabbar;

const styles = {
    tabbar: {
        backgroundColor: '#999',
        color: '#fff',
        height: '30px',
        paddingLeft: '230px',
    }
}
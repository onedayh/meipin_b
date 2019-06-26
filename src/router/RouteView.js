import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import BaseRoute from './BaseRoute';
import M1 from '../pages/page3/M1';
import P1 from '../pages/page1/P1';
import P2 from '../pages/page1/P2';
import P3 from '../pages/page1/P3';
import V1 from '../pages/page2/V1';
import V2 from '../pages/page2/V2';
import V3 from '../pages/page2/V3';

const RouteView = () => {
    return(
        <Switch>
            <BaseRoute exact path='/m1' component={M1}/>
            <BaseRoute exact path='/page1/p1' component={P1}/>
            <BaseRoute exact path='/page1/p2' component={P2}/>
            <BaseRoute exact path='/page1/p3' component={P3}/>
            <BaseRoute exact path='/page2/v1' component={V1}/>
            <BaseRoute exact path='/page2/v2' component={V2}/>
            <BaseRoute exact path='/page2/v3' component={V3}/>

            <Redirect exact from='/' to='/m1'/>
        </Switch>
    )
}

export default RouteView
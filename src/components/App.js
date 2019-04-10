import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import CelebListContainer from './celeb/CelebListContainer'; // eslint-disable-line import/no-named-as-default
import AddCelebContainer from './celeb/AddCelebContainer'; // eslint-disable-line import/no-named-as-default
import ShowCelebContainer from './celeb/ShowCelebContainer';
import createBrowserHistory from 'history/createBrowserHistory';
import HeaderNavContainer from './landing/HeaderNavContainer'; // eslint-disable-line import/no-named-as-default
import HomeContainer from './landing/HomeContainer';



const history = createBrowserHistory();


const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>

                    <HeaderNavContainer />

                    <Switch>
                        <Route exact path="/" component={HomeContainer} />
                        <Route path="/celebs" component={CelebListContainer} />
                        <Route exact path="/celeb" component={AddCelebContainer} />
                        <Route path="/celeb/:id" component={ShowCelebContainer} />
                        <Route exact path="/login" component={HomeContainer} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;
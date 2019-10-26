import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Finder from './pages/Finder';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import About from './pages/About';
import NetworkError from './pages/NetworkError'

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Finder,
    Details,
    Favorites,
    About,
    NetworkError
  })
);

export default Routes;
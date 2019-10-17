import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Finder from './pages/Finder';
import Details from './pages/Details';
import Favorites from './pages/Favorites';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Finder,
    Details,
    Favorites
  })
);

export default Routes;
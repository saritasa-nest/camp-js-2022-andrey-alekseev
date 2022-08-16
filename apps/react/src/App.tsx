import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { NavBar } from './components/Navbar';

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <NavBar/>
        <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
          <RootRouter />
        </Suspense>
      </div>
    </HashRouter>
  </Provider>
);

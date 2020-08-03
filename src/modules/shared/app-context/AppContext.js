import { createContext } from 'react';
import AppContextData from './AppContextData';

const AppContext = createContext(new AppContextData());

export default AppContext;

import ReactDOM from 'react-dom/client';
import './index.css';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import createTheme from '@mui/material/styles/createTheme';
import bootstrap from './appInitializer.tsx';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F2542D'
    },
    secondary: {
      main: '#aeb29b'
      // b6b8a9
    },
    error: {
      main: '#f44336'
    },
    background: {
      default: '#242424',
      paper: '#3d3d3d'
      // 6e6e6d
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
      disabled: '#666'
    },
    divider: '#333',
    action: {
      active: '#fff',
      hover: '#555',
      selected: '#666',
      disabled: '#333',
      disabledBackground: '#555',
      focus: '#777'
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#ff9800'
    },
    info: {
      main: '#2196f3'
    }
  },
  components: {
    MuiPagination: {
      defaultProps: {
        dir: 'ltr'
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'black'
        }
      }
    }
  },
  direction: 'rtl'
});

ReactDOM.createRoot(document.getElementById('root')!).render(bootstrap({ theme, cacheRtl }));

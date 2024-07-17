import ReactDOM from 'react-dom/client';
import './index.css';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import bootstrap from './appInitializer.tsx';
import { createTheme } from '@mui/material/styles';

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
      main: '#f48fb1'
    },
    error: {
      main: '#f44336'
    },
    background: {
      default: '#3f3f3f',
      paper: '#082032'
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
    },
    tonalOffset: 0.2,
    common: {
      black: '#000',
      white: '#fff'
    },
    contrastThreshold: 3
  },
  components: {
    MuiPagination: {
      defaultProps: {
        dir: 'ltr'
      },
      variants: [
        {
          props: { dir: 'rtl' },
          style: {
            direction: 'rtl'
          }
        }
      ],
      styleOverrides: {
        root: {
          direction: 'rtl'
        }
      }
    }
  },
  direction: 'rtl'
});

ReactDOM.createRoot(document.getElementById('root')!).render(bootstrap({ theme, cacheRtl }));

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
  components: {
    MuiPagination: {
      defaultProps: {
        dir: 'ltr'
      }
    }
  },
  direction: 'rtl'
});

ReactDOM.createRoot(document.getElementById('root')!).render(bootstrap({ theme, cacheRtl }));

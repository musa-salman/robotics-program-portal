import { styled } from '@mui/material/styles';

const CustomScrollbar = styled('div')({
  '&::-webkit-scrollbar': {
    width: '12px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#3d3d3d',
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#F2542D',
    borderRadius: '10px',
    border: '3px solid #3d3d3d'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#aeb29b'
  }
});

export default CustomScrollbar;

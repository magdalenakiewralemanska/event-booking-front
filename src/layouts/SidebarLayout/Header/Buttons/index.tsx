import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderLogin from './Login';

function HeaderButtons() {
  return (
    <>
      <Box sx={{ mr: 1 }}>
        <HeaderSearch />
      </Box>
      <Box sx={{ mr: 1 }}>
        <HeaderLogin />
      </Box>
    </>
  );
}

export default HeaderButtons;

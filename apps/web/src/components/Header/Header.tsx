import { Box, Stack } from '@mui/material';

import arrowIcon from '/arrow-icon.svg';
import autoneLogoText from '/autone-logo-text.svg';

const Header = () => {
  return (
    <Box sx={{ px: 6.5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 3.5 }}>
        <img
          width={113}
          height={24}
          src={autoneLogoText}
          color="blue"
          alt="logo"
        />
        <img width={32} height={32} src={arrowIcon} alt="arrow-icon" />
      </Stack>
      <hr
        style={{
          height: '1px',
          backgroundImage:
            'linear-gradient(90deg, #CDDEFF, #CDDEFF 40%, transparent 40%, transparent 100%)',
          backgroundSize: '25px 1px',
          border: 'none',
          margin: 0,
        }}
      />
    </Box>
  );
};

export default Header;

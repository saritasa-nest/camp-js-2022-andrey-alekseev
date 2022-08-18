import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, memo } from 'react';

const PageLoaderComponent: FC = () => (
  <div>
    <Backdrop
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);

export const PageLoader = memo(PageLoaderComponent);

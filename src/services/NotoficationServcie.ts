import { useSnackbar, VariantType } from 'notistack';

const NotificationService = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (type: VariantType, message: string) => {
    enqueueSnackbar(message, { variant: type });
  };

  return {
    notify,
  };
};

export default NotificationService;

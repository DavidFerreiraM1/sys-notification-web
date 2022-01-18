import { useSnackbar, VariantType } from 'notistack';

export function useAlerts() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    render: (message: string, variant: VariantType, timer: number) => {
      enqueueSnackbar(message, {
        autoHideDuration: timer,
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    },
  }
}

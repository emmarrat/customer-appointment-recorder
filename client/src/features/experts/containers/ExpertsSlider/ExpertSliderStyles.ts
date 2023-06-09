import { boxShadow, gradient } from '../../../../stylesMui';
import hairdresser from '../../../../assets/images/hairdresser.jpg';

export const styles = {
  block: {
    background: `${gradient}, url(${hairdresser})`,
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    boxShadow,
  },
};

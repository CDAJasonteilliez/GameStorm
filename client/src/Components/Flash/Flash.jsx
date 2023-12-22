import { useContext } from 'react';
import { FlashContext } from '../../Context/FlashContext.jsx';

import styles from './Flash.module.scss'

const Flash = () => {
  const { flashMessage } = useContext(FlashContext);

  return (
    <>
    {flashMessage && (
        <section className={`${styles.flash} ${styles[flashMessage["type"]]}`}>
        {
            <div>{flashMessage.message}</div>
        }
        </section>
    )}
    </>
  );
}

export default Flash;
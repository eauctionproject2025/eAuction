'use client'; // if using in app router and animation hooks
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './greet.module.css';

const WelcomeAlert = ({ message = 'Welcome back!' }) => {
  const [visible, setVisible] = useState(false);
    const { data: session } = useSession();
  useEffect(() => {
    setVisible(true); // show on mount
    const timer = setTimeout(() => setVisible(false), 3000); // hide after 4s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.success} ${visible ? styles.show : styles.hide}`}>
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" fill="#393a37" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" clipRule="evenodd" />
        </svg>
      </div>
      <div className={styles.title}>{message}</div>
    </div>
  );
};

export default WelcomeAlert;

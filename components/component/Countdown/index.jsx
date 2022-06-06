import { useState, useEffect } from 'react';
import styles from './Countdown.module.scss';
import Link from 'next/link';

export const Countdown = ({ live }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [beforeLive, setBeforeLive] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [afterLive, setAfterLive] = useState(false);

    useEffect(() => {
        let start = new Date(live.debut_live);
        let end = new Date(live.fin_live);
        console.log(start);
        console.log(end);
        

        let countdown = setInterval(function() {

            // Get today's date and time
            let now = new Date().getTime();
          
            // Find the distance between now and the count down date
            let distance = start - now;
          
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
          
          
            if (distance < 0) {
                setBeforeLive(false);
            } else {
                setBeforeLive(true);
            }
          }, 1000);
        
        return () => clearInterval(countdown);
    }, [live]);

    useEffect(() => {
        let start = new Date(live.debut_live);
        let end = new Date(live.fin_live);

        let countdown = setInterval(function() {

            let now = new Date().getTime();
            let distanceEnd = end - now;
            let distanceStart = start - now;

            // console.log(now);
            if (distanceEnd > 0 && distanceStart < 0) {
                setIsLive(true);
            } else {
                setIsLive(false);
            }

          }, 1000);
        
        return () => clearInterval(countdown);
    }, [live]);

    return (
        <>
        { beforeLive && <Link href={live.lien_live } passHref>
            <a target="_blank" rel="noreferrer">
                <div className={styles.countdown}>
                    <div className={styles.countdown__content}>
                        <span>En direct dans</span> <span className={styles.countdown__number}>{days !== 0 && <span >{days}j</span>} {hours !== 0 && <span >{hours}h</span>} {minutes !== 0 && <span >{minutes}m</span>} <span >{seconds}s</span></span>
                    </div>
                </div>
            </a>
        </Link>}
        {isLive && <Link href={live.lien_live} target='_blank'>
            <a target="_blank" rel="noreferrer">
                <div className={styles.enLive}>
                    <div className={styles.spinner}>
                        <div className={styles.spinner__center}></div>
                    </div>
                    <div className={styles.text}>En direct</div>
                </div>
            </a>
        </Link>}
        {/* {beforeLive && <Link href={live.lien_live} target='_blank'>
            <a target="_blank" rel="noreferrer">
                <div className={styles.noLive}>
                    <div className={styles.text}>En direct dans {days != 0 && `${days}j`}{hours != 0 && `${hours}h`}{minutes != 0 && `${minutes}m`}{seconds != 0 && `${seconds}s`}</div>
                </div>
            </a>
        </Link>} */}
        {(!beforeLive && !isLive) && <div className={styles.noLive}>
            Pas de live de prévu
        </div>}
        </>
    )
}

import Link from 'next/link';
import { joinStyles } from '../../../utils';
import ImagePerso from '../../bloc/image';
import styles from './Compagnon.module.scss'


export const Compagnon = ({compagnon}) => {
    console.log(compagnon);
    return (
            <a href={compagnon.attributes.url} target="_blank" rel="noreferrer" className={styles.compagnon} >
                <div className={styles.compagnon__image}><img src={compagnon.attributes.logo.data.attributes.url} /></div>
                
                <div className={styles.compagnon__infos}>
                    <h3 className={joinStyles(styles.compagnon__infos__name, 'p-4')}>{compagnon.attributes.nom}</h3>
                </div>
            </a>
    )
}
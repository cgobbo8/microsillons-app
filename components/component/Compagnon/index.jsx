
import Link from 'next/link';
import { joinStyles } from '../../../utils';
import ImagePerso from '../../bloc/image';
import styles from './Compagnon.module.scss'


export const Compagnon = ({compagnon}) => {
    if (!compagnon?.attributes) return null;

    return (
            <a href={compagnon.attributes?.url || '#'} target="_blank" rel="noreferrer" className={styles.compagnon} >
                { compagnon?.attributes?.logo?.data?.attributes?.url && <div className={styles.compagnon__image}><ImagePerso image={compagnon.attributes.logo.data.attributes.url} directUrl /></div> }

                <div className={styles.compagnon__infos}>
                    <h3 className={joinStyles(styles.compagnon__infos__name, 'p-4')}>{compagnon.attributes?.nom}</h3>
                </div>
            </a>
    )
}
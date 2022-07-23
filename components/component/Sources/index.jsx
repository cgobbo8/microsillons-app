
import styles from './Sources.module.scss'
import pdfLogo from '../../../public/icons/pdf_icon.png'
import pngLogo from '../../../public/icons/png_icon.png'
import Image from 'next/image';

export const Sources = ({ sources }) => {

    if (!sources && !sources.data ) return null;

    
    return (
        <div className={styles.source}>
            {
                sources.data.map((source, index) => 
                <a className={styles.source__button} href={source.attributes.url} key={index} rel="noreferrer" target="_blank" download>
                    {source.attributes.ext === '.pdf' && <Image src={pdfLogo} height={50} width={50} alt="pdf icon" />}
                    {source.attributes.ext === '.png' && <Image src={pngLogo} height={50} width={50} alt="png icon" />}
                    {source.attributes.ext === '.jpg' && <Image src={pngLogo} height={50} width={50} alt="png icon" />}
                    {source.attributes.ext === '.jpeg' && <Image src={pngLogo} height={50} width={50} alt="png icon" />}
                    <span className={styles['source__button--name']}>
                        {source.attributes.name}
                    </span>
                </a>)
            }
        </div>
    );
    }
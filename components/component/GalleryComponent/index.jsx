import Image from 'next/image';
import { useState } from 'react';
import ImagePerso from '../../bloc/image';
import { ImageModal } from '../ImageModal';
import styles from './GalleryComponent.module.scss'

export const GalleryComponent = ({images}) => {


    const [currentImage, setCurrentImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openImage = (image) => {
        setCurrentImage(image);
        openModal();
    }
    
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <div className={styles.gallery}>
            {
                images.map((image, index) =>
                    <div onClick={() => openImage(image)} className={`${styles.gallery__image} ${currentImage === image.id ? 'active' : ''}`} key={index}>
                        <ImagePerso image={image.attributes.url} directUrl />
                    </div>)
            }
            {isModalOpen && <ImageModal image={currentImage} closeModal={closeModal} /> }
        </div>
    );
}

import { createPortal } from "react-dom"
import ImagePerso from "../../bloc/image"
import { CloseButton } from "../../common/CloseButton"
import styles from './ImageModal.module.scss'

export const ImageModal = ({image, closeModal, shown}) => {


    return createPortal(
        (
            <div className={styles.image_modal} onClick={closeModal}>
                <div className={styles.image_modal__image}>
                    <ImagePerso image={image.attributes.url} directUrl contain />
                    <span className={styles.image_modal__image__close}>
                        <CloseButton onClick={closeModal} />
                    </span>
                </div>
            </div>
        ), document.body
    )
}
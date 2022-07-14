
import styles from './SoundcloudPlayer.module.scss'

import ReactPlayer from "react-player"
import { useState } from 'react';
import { PodcastContext } from '../../../contexts/PodcastContext';
import { useContext } from 'react';

export const SoundCloudPlayer = () => {

    const { currentPodcast } = useContext(PodcastContext);

    return (
        <div className={styles.soundcloud__player}>
            <ReactPlayer
                  url={currentPodcast.attributes.podcast_url}
                  playing={true}
                  controls={true}
                  width='320px'
                  height="200px"
              />
        </div>
    )
    
}
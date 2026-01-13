
import styles from './SoundcloudPlayer.module.scss'

import ReactPlayer from "react-player"
import { useState } from 'react';
import { PodcastContext } from '../../../contexts/PodcastContext';
import { useContext } from 'react';

export const SoundCloudPlayer = () => {

    const { currentPodcast } = useContext(PodcastContext);

    const podcastUrl = currentPodcast?.attributes?.podcast_url;

    // Don't render if no valid URL
    if (!podcastUrl || podcastUrl.trim() === '') {
        return null;
    }

    // Verify it's a valid SoundCloud URL
    if (!podcastUrl.includes('soundcloud.com')) {
        console.warn('Invalid SoundCloud URL:', podcastUrl);
        return null;
    }

    return (
        <div className={styles.soundcloud__player}>
            <ReactPlayer
                  url={podcastUrl}
                  playing={true}
                  controls={true}
                  width='320px'
                  height="200px"
              />
        </div>
    )

}
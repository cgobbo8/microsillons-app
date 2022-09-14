import styles from './PodcastsByType.module.scss';
import { Section } from '../../common/Section';
import Flickity from 'react-flickity-component';
import Link from 'next/link';
import { joinStyles } from '../../../utils';
import { useCallback, useEffect, useState } from 'react';
import { InfinitePodcasts } from './InfinitePodcasts';
import { fetchAPI } from '../../../lib/api';
import { debounce } from 'lodash';
import { Search } from '../../svgs';

export const PodcastsByType = ({ podcasts, categories }) => {
  const [podcastsToShow, setPodcastsToShow] = useState(podcasts);
  const [categorySelected, setCategorySelected] = useState(null);
  const [textFilter, setTextFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [podcastsLoading, setPodcastsLoading] = useState(false);

  useEffect(() => {
    console.log(filters);
  }, [filters.podcast_types, filters.$or]);

  const handleCategorySelected = async (category) => {
    setCategorySelected(category);
    setPodcastsLoading(true);
    console.log(filters);
    try {
      if (category) {
        console.log('category', category);
        const res = await fetchAPI('/podcasts', {
          populate: '*',
          pagination: {
            start: 0,
            limit: 8
          },
          filters: {
            ...filters,
            podcast_types: {
              id: category.id
            }
          },
          sort: 'publishedAt:DESC'
        });
        setFilters({
          ...filters,
          podcast_types: {
            id: category.id
          }
        });
        setPodcastsToShow(res.data);
      } else if (filters.$or && filters.$or[0] && filters.$or[0].auteurs?.nom?.$containsi) {
        console.log(filters.$or[0].auteurs?.nom?.$containsi);
        console.log(filters);

        setFilters((filters) => {
          let newFilters = { ...filters };
          delete newFilters.podcast_types;
          return newFilters;
        });
        console.log(filters);
        const res = await fetchAPI('/podcasts', {
          populate: '*',
          pagination: {
            start: 0,
            limit: 8
          },
          filters: {
            ...filters
          },
          sort: 'publishedAt:DESC'
        });

        setPodcastsToShow(res.data);
      } else {
        console.log('Dans le else');

        setFilters((filters) => {
          let newFilters = { ...filters };
          delete newFilters.podcast_types;
          return newFilters;
        });
        const res = await fetchAPI('/podcasts', {
          populate: '*',
          pagination: {
            start: 0,
            limit: 8
          },
          sort: 'publishedAt:DESC'
        });

        setPodcastsToShow(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPodcastsLoading(false);
    }
  };

  const updateTextFilter = (e) => {
    setPodcastsLoading(true);
    setTextFilter(e.target.value);
    debounceSave(e.target.value);
  };

  const debounceSave = useCallback(
    debounce(async (value) => {
      //   console.log(value);
      console.log(filters);
      let tabValue = value.split(' ');

      // remove empty values
      tabValue = tabValue.filter((v) => v !== '');
      console.log(tabValue);

      let $orTab = [];

      if (tabValue.length === 2) {
        $orTab = [
          {
            $and: [{ auteurs: { nom: { $containsi: tabValue[0] } } }, { auteurs: { prenom: { $containsi: tabValue[1] } } }]
          },
          {
            $and: [{ auteurs: { prenom: { $containsi: tabValue[0] } } }, { auteurs: { nom: { $containsi: tabValue[1] } } }]
          },
          { podcast_title: { $containsi: value } }
        ];
      } else if (tabValue.length === 1) {
        $orTab = [
          { auteurs: { nom: { $containsi: tabValue[0] } } },
          { auteurs: { prenom: { $containsi: tabValue[0] } } },
          { podcast_title: { $containsi: tabValue[0] } }
        ];
      } else {
        $orTab = [{ podcast_title: { $containsi: value } }];
      }

      try {
        const res = await fetchAPI('/podcasts', {
          populate: '*',
          pagination: {
            start: 0,
            limit: 8
          },
          filters: {
            ...filters,
            $or: [...$orTab]
          },
          sort: 'publishedAt:DESC'
        });

        setFilters({
          ...filters,
          $or: [...$orTab]
        });
        setPodcastsToShow(res.data);
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        setPodcastsLoading(false);
      }
    }, 500),
    [filters.podcast_types, filters.$or]
  );

  return (
    <Section className={styles.article_by_type}>
      <h3 className={styles['article_by_type--title']}>
        Explorer par <span className={styles['article_by_type--title--accent']}>types</span>
      </h3>
      <div className={styles['article_by_type__categories']}>
        <button
          onClick={() => handleCategorySelected(null)}
          className={joinStyles(
            styles['article_by_type__categories--category'],
            !categorySelected && styles['article_by_type__categories--category--active']
          )}>
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelected(category)}
            className={joinStyles(
              styles['article_by_type__categories--category'],
              categorySelected?.id === category.id && styles['article_by_type__categories--category--active']
            )}>
            {category.attributes.type}
          </button>
        ))}
      </div>
      <div className={styles['article_by_type__search']}>
        <input placeholder="Recherchez un titre, un auteur..." onChange={updateTextFilter} type="text" className="podcast_filter" />
        <button className={styles['article_by_type__search--button']}>
          <Search />
        </button>
      </div>

      <InfinitePodcasts podcasts={podcastsToShow} categorySelected={categorySelected} filters={filters} podcastsLoading={podcastsLoading} />
    </Section>
  );
};

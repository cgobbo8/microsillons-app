import { TitleTextBloc } from "../bloc/titletextbloc";
import { Divider } from "../common/Divider";
import { GridBloc } from "../common/GridBloc";
import { Section } from "../common/Section";
import { SerieComponent } from "../component/SerieComponent";


export const SeriesSection = ({seriesInfo, series = []}) => {

    return (
        <Section>
            <TitleTextBloc title={seriesInfo?.titre} text={seriesInfo?.texte} />
            <Divider />
            <GridBloc>
                {
                    series?.map(serie => {
                        return (
                            <SerieComponent key={serie.id} serie={serie} />
                        )
                    })
                }
            </GridBloc>
        </Section>
    )
}
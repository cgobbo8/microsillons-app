import { TitleTextBloc } from "../bloc/titletextbloc";
import { Section } from "../common/Section";


export const SeriesSection = ({seriesInfo, series}) => {

    return (
        <Section>
            <TitleTextBloc title={seriesInfo.titre} text={seriesInfo.texte} />

            {
                series.map(serie => {
                    return (
                        <div className="serie" key={serie.id}>
                            <h3 className="t-4">{serie.attributes.titre}</h3>
                            <h3 className="p-2">{serie.attributes.description}</h3>
                        </div>
                    )
                })
            }
            
            {/* <ListBloc list={series.liste} /> */}
        </Section>
    )
}
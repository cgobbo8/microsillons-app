import { TitleTextBloc } from "../bloc/titletextbloc";


export const SeriesSection = ({seriesInfo, series}) => {
    console.log('seriesInfo : ');
    console.log(seriesInfo);
    console.log('series : ');
    console.log(series);
    return (
        <section className="section">
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
        </section>
    )
}
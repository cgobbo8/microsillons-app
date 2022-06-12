import { TitleTextBloc } from "../bloc/titletextbloc";
import { Divider } from "../common/Divider";
import { GridBloc } from "../common/GridBloc";
import { Section } from "../common/Section";
import { SectionTitle } from "../common/SectionTitle";
import { Compagnon } from "../component/Compagnon";
import { Member } from "../component/Member";
import { SerieComponent } from "../component/SerieComponent";


export const CompagnonsSection = ({compagnons}) => {
    return (
        <Section style={{display : 'flex', flexDirection : 'column', alignItems: 'center'}} >
            <SectionTitle text='Nos compagnons de ' accentText={`route`} />
            <Divider />
            <GridBloc fullWidth>
                {
                    compagnons.map(compagnon => {
                        return (
                            <Compagnon key={compagnon.id} compagnon={compagnon} />
                        )
                    })
                }
            </GridBloc>

            
            {/* <ListBloc list={emissions.liste} /> */}
        </Section>
    )
}
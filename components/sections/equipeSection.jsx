import ImagePerso from "../bloc/image";
import { TitleTextBloc } from "../bloc/titletextbloc";
import { Section } from "../common/Section";
import { useEffect, useState } from "react";
import { Member } from "../component/Member";
import { Team } from "../component/Team";
import { Divider } from "../common/Divider";


export const EquipeSection = ({equipeInfo, equipe = []}) => {
    let [equipeList, setEquipeList] = useState({});

    useEffect(() => {
        setEquipeList({})
        if (!equipe || equipe.length === 0) return;

        equipe.forEach(membre => {
            // get first letter of the firstname
            const prenom = membre?.attributes?.prenom;
            if (!prenom) return;
            let firstLetter = prenom.charAt(0);
            setEquipeList(prevState => {
                return {
                    ...prevState,
                    [firstLetter]: [...prevState[firstLetter] || [], membre]
                    }})
        })

    }, [equipe])

    return (
        <Section>
            <TitleTextBloc title={equipeInfo?.titre} text={equipeInfo?.texte} />
            <Divider />
            <Team team={equipeList} />
        </Section>
    )
}
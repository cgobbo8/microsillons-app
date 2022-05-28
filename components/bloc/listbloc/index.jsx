

export const ListBloc = ({list}) => {
    return (
        <div className="">
            { list.map(item => <p key={item.id}>{item.texte}</p> ) }
                
        </div>
    )
}
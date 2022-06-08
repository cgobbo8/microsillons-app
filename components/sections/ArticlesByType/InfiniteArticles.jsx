import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";



export const InfiniteArticles = ({ articles, categorySelected }) => {

    const [articlesToShow, setArticlesToShow] = useState(articles);
    const [hasMore, setHasMore] = useState(true);

    const getMorePost = async () => {
        const res = await fetchAPI("/articles", {
            populate: "*", 
            pagination: {
              start: 0,
              limit: 3
            }, 
            sort: "publishedAt:DESC" })

        console.log(res);

        // const newPosts = await res.json();
        // setPosts((post) => [...post, ...newPosts]);
      };


    useEffect(() => {
        console.log(categorySelected);
    }, [categorySelected])


    return (
        <div style={{height : '200px', overflow : 'auto'}}>
            <InfiniteScroll
            style={{height : '100px', overflow : 'auto'}}
                dataLength={articlesToShow.length }
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
                >
                {articlesToShow.map((data) => (
                    <div key={data.id}>
                        <div style={{
                            margin : '50px'
                        }} className="back">
                            <strong> {data.attributes.titre}</strong> 
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>

    )

}
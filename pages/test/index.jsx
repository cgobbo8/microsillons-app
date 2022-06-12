import Content from "../../components/bloc/content";

export default function index(props) {
  return (
    <>
      <div>
        <Content data={props.data} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=50"
  ).then((response) => response.json());
  return {
    props: { data }
  };
};
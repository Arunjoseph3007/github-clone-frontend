import GraphLayout from "@/layouts/GraphLayout";

export default function GraphPage() {
  return <h1>Select a Representaion</h1>;
}

GraphPage.getLayout = GraphLayout;

export const getServerSideProps = (ctx) => ({ props: { data: null } });

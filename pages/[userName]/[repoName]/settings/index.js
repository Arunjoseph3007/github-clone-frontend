import MainRepoLayout from "@/layouts/MainRepoLayout";

export default function SettingsPage({data}) {
  return <div>SettingsPage</div>;
}

SettingsPage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  return { props: { data: null } };
};

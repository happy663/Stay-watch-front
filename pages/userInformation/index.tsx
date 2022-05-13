import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import useSWR, { SWRConfig } from "swr";
import Layout from "components/common/Layout";
import UserInformation from "components/userInformation/UserInformation";
import { baseURL } from "utils/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = `${baseURL}/user/v1/list`;
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log("SSG");

  return {
    props: {
      fallback: {
        [API_URL]: data,
      },
    },
  };
};

const UserInformationIndex: NextPage<Props> = (props) => {
  const { fallback } = props;
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <UserInformation />
      </Layout>
    </SWRConfig>
  );
};

export default UserInformationIndex;

import { gql, useQuery } from "@apollo/client";

import { IEnvironment } from '../../domain/environment';

const GET_ENVIRONMENTS = gql`
  query Environment {
    environments {
      name
    }
  }
`;

export const useGetEnvironments = (): IEnvironment[] | undefined => {
  const { data } = useQuery(GET_ENVIRONMENTS);
  return data?.environments;
}

import { gql, useQuery } from "@apollo/client";

import { IRegion } from '../../domain/region';

const GET_REGIONS = gql`
  query regions {
    regions {
      name
    }
  }
`;

export const useGetRegions = (): IRegion[] | undefined => {
  const { data } = useQuery(GET_REGIONS);
  return data?.regions;
}

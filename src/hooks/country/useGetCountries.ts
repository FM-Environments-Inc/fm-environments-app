import { gql, useQuery } from "@apollo/client";

import { ICountry } from '../../domain/country';

const GET_COUNTRIES = gql`
  query countries {
    countries {
      name
    }
  }
`;

export const useGetCountries = (): ICountry[] | undefined => {
  const { data } = useQuery(GET_COUNTRIES);
  return data?.countries;
}

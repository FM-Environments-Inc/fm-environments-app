import { gql, useQuery } from "@apollo/client";

import { IGetAllMatchesResponse } from '../../domain/match';

interface IGetMatchesArgs {
  environment: string;
  page: number;
  limit: number;
};

const GET_MATCHES = gql`
query matches(
  $environment: String!,
  $limit: Float,
  $page: Float,
) {
  matches(
    environment: $environment,
    limit: $limit,
    page: $page,
  ) {
    total,
    page,
    limit,
    data {
      id,
      team1,
      team2,
      winner,
      team1Goals,
      team2Goals,
      createdAt,
      finishedAt,
      teams {
        _id,
        logo,
        name,
      }
  	}
  }
}
`;

export const useGetMatches = (args: IGetMatchesArgs): IGetAllMatchesResponse | undefined => {
  const { data } = useQuery(GET_MATCHES, {
    variables: args
  });
  return data?.matches;
}


import { gql, useQuery } from "@apollo/client";

import { ITournament } from '../../domain/tournament';

interface IGetTournaments {
  environment?: string | null;
  page: number;
  limit: number;
  showFinished: boolean;
};

const GET_TOURNAMENTS = gql`
  query tournaments(
    $environment: String!,
    $page: Float,
    $limit: Float,
    $showFinished: Boolean
  ) {
    tournaments(
      environment: $environment,
      page: $page,
      limit: $limit,
      showFinished: $showFinished,
    ) {
      id,
      name,
      tier,
      isFinished
    }
  }
`;

export const useGetTournaments = (args: IGetTournaments): ITournament[] | undefined => {
  const { data } = useQuery(GET_TOURNAMENTS, {
    variables: args
  });
  return data?.tournaments;
}

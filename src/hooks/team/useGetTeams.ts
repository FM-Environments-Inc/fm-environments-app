import { gql, useQuery } from "@apollo/client";

import { ITeam } from '../../domain/team';

interface IGetTeamsArgs {
  environment: string;
  isNational: boolean;
  page: number;
  limit: number;
  order: string;
  sortBy?: string;
  country?: string;
  region?: string;
};

const GET_TEAMS = gql`
query teams(
  $environment: String!,
  $isNational: Boolean!,
  $page: Float,
  $limit: Float,
  $order: String!,
  $sortBy: String!,
  $country: String,
  $region: String
) {
    teams(
      environment: $environment,
      isNational: $isNational,
      page: $page,
      limit: $limit,
      order: $order,
      sortBy: $sortBy,
      country: $country,
      region: $region
    ) {
      name,
        logo,
        id,
        country { name },
        division { name },
        evaluation,
        matches,
        wins,
        draws,
        loses,
        points_earned,
        enemy_points_earned,
        points_difference
    }
}
`;

export const useGetTeams = (args: IGetTeamsArgs): ITeam[] | undefined => {
  const { data } = useQuery(GET_TEAMS, {
    variables: args
  });
  return data?.teams;
}

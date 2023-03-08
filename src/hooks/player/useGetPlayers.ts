import { gql, useQuery } from "@apollo/client";

import { IPlayer, PLAYER_ROLE } from '../../domain/player';

interface IGetPlayersArgs {
  environment: string;
  role?: string;
  page: number;
  limit: number;
  order: string;
  sortBy?: string;
  country?: string;
};

const GET_PLAYERS = gql`
  query players(
    $environment: String!,
    $role: String,
    $page: Float,
    $limit: Float,
    $order: String,
    $sortBy: String,
    $country: String
  ) {
      players(
        environment: $environment,
        page: $page,
        limit: $limit,
        order: $order,
        sortBy: $sortBy,
        country: $country,
        role: $role
      ) {
        firstName,
        lastName,
        age,
        height,
        _id,
        photo,
        country { name },
        evaluation,
        position,
        role,
        ratings {
          overall,
          pace,
          shot,
          pass,
          dribbling,
          defending,
          physics
        },
        playerTeam { name, logo }
      }
  }
`;

export const useGetPlayers = (args: IGetPlayersArgs): IPlayer[] | undefined => {
  const { data } = useQuery(GET_PLAYERS, {
    variables: args
  });
  return data?.players;
}

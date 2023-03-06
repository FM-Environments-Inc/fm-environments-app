import { gql, useMutation } from "@apollo/client";

const IMPORT_PLAYERS = gql`
mutation importPlayers(
  $file: Upload!,
  $environment: String!
) {
    importTeams(
      importPlayersData: { file: $file, environment: $environment }
    )
}
`;

export const useImportPlayers = () => {
  const [mutation] = useMutation(IMPORT_PLAYERS);
  return mutation;
}


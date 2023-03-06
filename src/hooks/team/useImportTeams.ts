import { gql, useMutation } from "@apollo/client";

import { ITeam } from '../../domain/team';

const IMPORT_TEAMS = gql`
mutation importTeams(
  $file: Upload!,
  $environment: String!
) {
    importTeams(
      importTeamsData: { file: $file, environment: $environment }
    )
}
`;

export const useImportTeams = () => {
  const [mutation] = useMutation(IMPORT_TEAMS);
  return mutation;
}


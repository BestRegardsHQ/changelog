import { Divider, Stack } from "@mantine/core";
import { Contributor } from "components/core/contributor";

export const Contributors = ({ authors }) => {
  return (
    <>
      <Divider mt={16} mb={8} />

      <Stack px={6} spacing="lg" mt="xl">
        {authors.map((author) => (
          <Contributor key={author.name} {...author} />
        ))}
      </Stack>
    </>
  );
};

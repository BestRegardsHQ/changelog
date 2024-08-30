import { Avatar, Flex, Group, Text } from "@mantine/core";

interface ContributorProps {
  avatarUrl?: string;
  name: string;
  description: string;
}

export function Contributor({ avatarUrl, name, description }: ContributorProps) {
  return (
    <Group spacing={4}>
      {!!avatarUrl && <Avatar src={avatarUrl} />}
      <Flex direction="column" align="flex-start" justify="center">
        <Text fw="semibold">{name}</Text>
        <Text color="gray.700">{description}</Text>
      </Flex>
    </Group>
  );
}

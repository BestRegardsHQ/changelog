import { Avatar, Group, Stack, Text } from "@mantine/core";

interface ContributorProps {
  avatarUrl?: string;
  name: string;
  description: string;
}

export function Contributor({ avatarUrl, name, description }: ContributorProps) {
  return (
    <Group spacing={4}>
      {!!avatarUrl && <Avatar src={avatarUrl} radius="xl" />}
      <Stack spacing={1} pl="sm">
        <Text fw={500} size="md">
          {name}
        </Text>
        <Text size="sm" color="green">
          {description}
        </Text>
      </Stack>
    </Group>
  );
}

import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { TbMoonStars } from "react-icons/tb";
import { BiSun } from "react-icons/bi";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <ActionIcon
        variant="transparent"
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? (
          <BiSun size="1.2rem" />
        ) : (
          <TbMoonStars size="1.2rem" />
        )}
      </ActionIcon>
    </Group>
  );
}

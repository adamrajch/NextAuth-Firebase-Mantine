import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Modal,
  NumberInput,
  Popover,
  Select,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useHover } from "@mantine/hooks"
import { PlusIcon } from "@modulz/radix-icons"
import React, { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"

type Props = {
  id: string
  data: any
}

export default function Book({ id, data }: Props) {
  const [opened, setOpened] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { hovered, ref } = useHover()

  useEffect(() => {
    hovered ? setOpened(true) : setOpened(false)
  }, [hovered])
  useEffect(() => {
    modalOpen && setOpened(false)
  }, [modalOpen])
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7]
  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        width={260}
        position="right"
        withArrow
        target={
          <Box>
            <Group
              ref={ref}
              direction="column"
              sx={(theme) => ({
                marginBottom: 5,
                marginTop: theme.spacing.sm,
                width: 185,
                "&:hover": {
                  color: theme.colors.blue[7],
                },
              })}
              grow
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  src={
                    data.imageLinks?.thumbnail ||
                    "https://chonjiacademy.com/wp-content/uploads/2017/04/default-image.jpg"
                  }
                  height={265}
                  width={185}
                  radius="sm"
                  alt={data.imageLinks?.thumbnail || "no cover"}
                />

                <ActionIcon
                  variant="filled"
                  radius="xl"
                  color="dark"
                  sx={{
                    zIndex: 1000,
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    display: opened ? "inline-block" : "none",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  <PlusIcon />
                </ActionIcon>
              </Box>

              <Text
                align="left"
                lineClamp={2}
                size="md"
                color={hovered ? "violet" : secondaryColor}
              >
                {data.title}
              </Text>
            </Group>
          </Box>
        }
      >
        <Group direction="column" spacing={0}>
          <Text>
            {data.authors?.length > 1 ? "Authors" : "Author"} :{" "}
            {data.authors?.map((a: string, i: number) => (
              <Text component="span">
                {a}
                {i === data.authors?.length - 1 ? "" : ", "}
              </Text>
            ))}
          </Text>
          {/* 
        <Text>{data.averageRating}</Text> */}
          <Text>Pages: {data.pageCount}</Text>
          {/* <Text color="violet">{data.publisher}</Text> */}
          <Text>Published: {data.publishedDate}</Text>

          <Group>
            {data.categories?.map((a: string) => (
              <Badge>{a}</Badge>
            ))}
          </Group>
        </Group>
      </Popover>
      <>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          size="xl"
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          padding={0}
          hideCloseButton={true}
          radius="md"
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              backgroundColor: "darkslategray",
              height: 150,
              padding: 16,
              borderRadius: "6px 6px 0 0",
            })}
          >
            <Image
              src={
                data.imageLinks?.smallThumbnail ||
                "https://chonjiacademy.com/wp-content/uploads/2017/04/default-image.jpg"
              }
              height={125}
              width={85}
              radius="sm"
              style={{
                position: "absolute",
                flexGrow: 0,
                bottom: -20,
              }}
              alt={data.imageLinks?.smallThumbnail || "no cover"}
            />

            <Group
              position="apart"
              align="flex-end"
              style={{ flexGrow: 1, marginLeft: 100 }}
            >
              <Title order={4} style={{ flexGrow: 1, color: "whitesmoke" }}>
                {data.title}
              </Title>
              <Group position="right" style={{ flexGrow: 0 }}>
                <ActionIcon>
                  <AiFillHeart />
                </ActionIcon>
                <Button size="xs">Save</Button>
              </Group>
            </Group>
          </Box>
          <div style={{ padding: 16, marginTop: 20 }}>
            <Grid grow>
              <Grid.Col sm={6} md={4}>
                <Select
                  label="Status"
                  placeholder="Status"
                  data={[
                    { value: "reading", label: "Reading" },
                    { value: "plan", label: "Plan to read" },
                    { value: "completed", label: "Completed" },
                    { value: "paused", label: "Paused" },
                    { value: "dropped", label: "Dropped" },
                  ]}
                />
              </Grid.Col>

              <Grid.Col sm={6} md={4}>
                <NumberInput label="Score" placeholder="" />
              </Grid.Col>
              <Grid.Col sm={6} md={4}>
                <NumberInput label="Page Progress" placeholder="" />
              </Grid.Col>
              <Grid.Col sm={6} md={4}>
                <DatePicker placeholder="Pick date" label="Start date" />
              </Grid.Col>
              <Grid.Col sm={6} md={4}>
                <DatePicker placeholder="Pick date" label="Finish date" />
              </Grid.Col>
              <Grid.Col sm={6} md={4}>
                <NumberInput label="Rereads" placeholder="Time reread" />
              </Grid.Col>
              <Grid.Col>
                <TextInput label="Note" />
              </Grid.Col>
            </Grid>
          </div>
        </Modal>
      </>
    </>
  )
}

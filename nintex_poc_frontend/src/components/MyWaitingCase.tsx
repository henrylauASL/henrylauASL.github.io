import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Badge,
  Anchor,
  Paper,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface taskInfo {
  name: string;
  url: string;
  createdDate: string;
  status: string;
  msg: string;
}

export default function MyWaitingCase() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [task, setTask] = useState<taskInfo[]>([]);
  const getTask = "https://au.nintex.io/workflows/v2/tasks";
  useEffect(() => {
    fetch(getTask, {
      method: "GET",
      headers: {
        Accept: "application/json, application/problem+json",
        Authorization:
          "Bearer sPtTUsPRPtWSsFtU2GsNFMOtRsJFQtVsKtVsFOtUURsRRtRWsKILtSPRsKtSTsOQJIFItVsRL2l2V2F2TsKRFPJQtR2x3BsNOJJ",
      },
    })
      .then((res) => res.json())
      .catch((err) => ({ error: String(err) }))
      .then((json) => {
        let newDataSet: taskInfo[] = [];
        json.tasks.forEach((task: any) => {
          task.taskAssignments.forEach((ta: any) => {
            if (ta.assignee == "henrylau@asl.com.hk") {
              let msg = task.message;
              const regex = /\((.*?)\)/;
              const matches = msg.match(regex);
              const value = matches[1].trim();
              const decoded = value.replace(/&nbsp;/g, " ");
              const trimmedMSG = decoded.trim();
              newDataSet.push({
                name: task.name,
                url: ta.urls.formUrl,
                createdDate: task.createdDate,
                status: task.status,
                msg: trimmedMSG,
              });
            }
          });
        });
        setTask(newDataSet);
      });
  }, []);
  const rows = task.map((row) => (
    <tr key={row.name}>
      <td style={{ width: "20rem" }}>
        <Anchor
          component="button"
          type="button"
          onClick={() => {
            window.open(`${row.url}`, "_blank", "noopener,noreferrer");
          }}
        >
          {row.name}
        </Anchor>
      </td>
      <td style={{ width: "20rem" }}>{row.msg}</td>
      <td style={{ width: "20rem" }}>{row.createdDate.slice(0, 10)}</td>
      <td style={{ width: "10rem" }}>{row.status}</td>
    </tr>
  ));

  return (
    <div>
      <Paper shadow="xs" p="md">
        <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
          You have {rows.length} new case
        </div>
        <ScrollArea
          h={300}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          style={{ margin: "10px", backgroundColor: "white" }}
        >
          <Table miw={700}>
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Task</th>
                <th>Case Title</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </div>
  );
}
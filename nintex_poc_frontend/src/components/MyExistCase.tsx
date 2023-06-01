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
import { api_origin } from "../Api";
import { getColorByText } from "./TableSort";

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

interface caseDetails {
  GUID: string;
  caseID: string;
  caseTitle: string;
  caseDescription: string;
  caseProgress: string;
  substantiveReply: string;
  PIC: string;
}

export default function MyExistCase() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [caseDetails, setCaseDetails] = useState<caseDetails[]>([]);
  useEffect(() => {
    fetch(`${api_origin}/getCase`)
      .then((res) => res.json())
      .catch((err) => ({ error: String(err) }))
      .then((json) => {
        setCaseDetails(json.recordset);
      });
  }, []);

  const url =
    "https://aslbdemo.workflowcloud.com/forms/9704b106-7517-4881-b154-daca88c913e2";
  let myCase = caseDetails.filter((x: any) => (x.PIC == "henrylau@asl.com.hk" && x.caseProgress == "In progress"));
  const rows = myCase.map((row) => (
    <tr key={row.GUID}>
      <td style={{ width: "10rem" }}>
        <Anchor
          component="button"
          type="button"
          onClick={() => {
            window.open(
              `${url}?caseID=${row.caseID}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          {row.caseID}
        </Anchor>
      </td>
      <td style={{ width: "20rem" }}>{row.caseTitle}</td>
      <td style={{ width: "20rem" }}>{row.caseDescription}</td>
      <td>
        <Badge color={getColorByText(row.caseProgress)} variant="light">
          {row.caseProgress}
        </Badge>
      </td>
      <td>{row.substantiveReply.slice(0, 10)}</td>
      <td>{row.PIC}</td>
    </tr>
  ));

  return (
    <div>
      <Paper shadow="xs" p="md">
        <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
          You have {rows.length} In progress case
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
                <th>Case ID</th>
                <th>Case Title</th>
                <th>Case Description</th>
                <th>Case Progress</th>
                <th>Substantive Reply</th>
                <th>PIC</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </div>
  );
}

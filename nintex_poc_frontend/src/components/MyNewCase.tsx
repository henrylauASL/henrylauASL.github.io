import { stringTypeAnnotation } from "@babel/types";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
interface taskInfo {
    name: string;
    url: string;
    createdDate: string;
    status: string;
}

export default function MyNewCase() {
  const { user } = useContext(UserContext);
  const [task, setTask] = useState<taskInfo[]>([]);
  const getTask = "https://au.nintex.io/workflows/v2/tasks";
  useEffect(() => {
    fetch(getTask, {
       method: 'GET',
      headers: {
        Accept: "application/json, application/problem+json",
        Authorization:
          "Bearer sPtTUsPRPtWSsFtU2GsNFMOtRsJFQtVsKtVsFOtUURsRRtRWsKILtSPRsKtSTsOQJIFItVsRL2l2V2F2TsKRFPJQtR2x3BsNOJJ",
      },
    })
      .then((res) => res.json())
      .catch((err) => ({ error: String(err) }))
      .then((json) => {
        let newDataSet:taskInfo[] = [];
        json.tasks.forEach((task: any) => {
          task.taskAssignments.forEach((ta: any) => {
            if (ta.assignee == user.email) {
              newDataSet.push({ name: task.name, url: ta.urls.formUrl, createdDate: task.createdDate, status: task.status });
            }
          });
        });
        setTask(newDataSet)
      });
  }, []);

  return (
    <div>
      <h2>You have {task.length} case need to accept</h2>
      {task.map((x: any) => {
        return (
          <List
            spacing="lg"
            size="lg">
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconCircleDashed size="1rem" />
                </ThemeIcon>
              }
            >
              <a target="_blank" href={x.url}>
                {x.name}-{x.status}-{x.createdDate.slice(0,10)}
              </a>
            </List.Item>
          </List>
        );
      })}
    </div>
  );
}

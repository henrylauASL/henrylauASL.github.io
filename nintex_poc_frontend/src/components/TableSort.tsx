import { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Button,
  Anchor,
  Badge,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

export interface RowData {
  GUID: string;
  caseID: string;
  caseTitle: string;
  caseDescription: string;
  caseProgress: string;
  substantiveReply: string;
  PIC: string;
}

export interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function getColorByText(text: string) {
  switch (text) {
    case "In progress":
      return "grape";
    case "New":
      return "red";
    case "Suspended":
      return "orange";
    case "Completed":
      return "blue";
    default:
      return "gray";
  }
}

export function TableSort({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  useEffect(() => {
    setSortedData(data);
  }, [data])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const url = 'https://aslbdemo.workflowcloud.com/forms/9704b106-7517-4881-b154-daca88c913e2'
  const rows = sortedData.map((row) => (
    <tr key={row.caseID}>
      <td>
        <Anchor component="button" type="button" onClick={() => { window.open(`${url}?caseID=${row.caseID}`, '_blank', 'noopener,noreferrer'); }}>
          {row.caseID}
        </Anchor>
      </td>
      <td>{row.caseTitle}</td>
      <td>{row.caseDescription}</td>
      <td>
        <Badge color={getColorByText(row.caseProgress)} variant="light">{row.caseProgress}</Badge>
      </td>
      <td>{row.substantiveReply.slice(0, 10)}</td>
      <td>{row.PIC}</td>
    </tr>
  ));

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table withBorder horizontalSpacing="xs" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'caseID'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('caseID')}
            >
              Case ID
            </Th>
            <Th
              sorted={sortBy === 'caseTitle'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('caseTitle')}
            >
              Case Title
            </Th>
            <Th
              sorted={sortBy === 'caseDescription'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('caseDescription')}
            >
              Case Description
            </Th>
            <Th
              sorted={sortBy === 'caseProgress'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('caseProgress')}
            >
              Case Status
            </Th>
            <Th
              sorted={sortBy === 'substantiveReply'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('substantiveReply')}
            >
              Substantive Reply Date
            </Th>
            <Th
              sorted={sortBy === 'PIC'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('PIC')}
            >
              PIC
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <Text weight={500} style={{ textAlign: "center" }}>
                Nothing found
              </Text>
            </tr>
          )}
        </tbody>
      </Table>        
    </>
  );
}

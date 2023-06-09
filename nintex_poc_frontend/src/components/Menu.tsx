import { useState } from 'react';
import { createStyles, Navbar, getStylesRef, rem } from '@mantine/core';
import {
  IconBriefcase,
  IconChartBar,
  IconFiles,
  IconLogout,
} from '@tabler/icons-react';
import { Link, useHref } from 'react-router-dom';
import { routes } from '../AppRoute';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

// const data = [
//   { url: '/', label: 'My Case', icon: IconBriefcase },
//   { url: '/', label: 'Dashboard', icon: IconChartBar },
//   { url: '/case_management', label: 'Case Management', icon: IconFiles },
// ];

export function Menu(props:any) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Dashboard');

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Link onClick={props.onClick} className={cx(classes.link)} to={useHref(routes.myCase)}><IconBriefcase className={classes.linkIcon} stroke={1.5} />My Case</Link>
        <Link onClick={props.onClick} className={cx(classes.link)} to={useHref(routes.dashboard)}><IconChartBar className={classes.linkIcon} stroke={1.5} />Dashboard</Link>
        <Link onClick={props.onClick} className={cx(classes.link)} to={useHref(routes.caseManagement)}><IconFiles className={classes.linkIcon} stroke={1.5} />Case Management</Link>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
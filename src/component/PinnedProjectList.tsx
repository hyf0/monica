import React, { useMemo, useCallback, SyntheticEvent } from 'react';
import { ListItem, List, ListItemText, ListSubheader, Fade, ListItemIcon, IconButton } from '@material-ui/core';
import { Star as PinnedIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { IReduxState } from '../store/reducers';
import { useShallowEqualSelector } from '../util/hooks';
import { globalActions, projectActions } from '../store/action';
import { projectEffects } from '../store/effects';

// import './index.scss';

const pinnedProjectListSelector = ({ project: { projects } }: IReduxState) => ({
  projects,
});

export default function PinnedProjectList() {
  const { projects } = useShallowEqualSelector(pinnedProjectListSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const jumpToTodoProjectPageById = useCallback(
    (projectId: string) => {
      dispatch(globalActions.createSetIsShowAsideMenu(false));
      history.push(`/todo-project/${projectId}`);
    },
    [dispatch, history],
  );

  const unpinOneProject = useCallback(
    (projectId: string) => {
      dispatch(projectEffects.setProjectIsPinned(projectId, false));
    },
    [dispatch],
  );

  const pinnedProjects = useMemo(() => (projects == null ? [] : projects.filter(p => p.isPinned)), [projects]);

  return (
    <List className="pinned-project-list" subheader={<ListSubheader>置顶任务项</ListSubheader>}>
      <TransitionGroup>
        {pinnedProjects.map(p => (
          <Fade timeout={500}key={p.id}>
            <ListItem
              style={{
                height: '64px',
              }}
              onClick={() => jumpToTodoProjectPageById(p.id)}
              button
            >
              <ListItemText>{p.name}</ListItemText>
              <ListItemIcon>
                <IconButton
                  onClick={(evt: SyntheticEvent) => {
                    evt.stopPropagation();
                    unpinOneProject(p.id);
                  }}
                >
                  <PinnedIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </Fade>
        ))}
      </TransitionGroup>
    </List>
  );
}

import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import {
  List,
  Slide,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Typography,
  ListSubheader,
  IconButton,
} from '@material-ui/core';
import { BorderColor as EditIcon } from '@material-ui/icons';

import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';
import { projectEffects } from '../../store/effects';
import FullScreenLoading from '../../ui/FullScreenLoading';
import { projectActions } from '../../store/action';

import './index.scss';

const todoProjectSelector = ({ project: { todoProject } }: IReduxState) => ({
  todoProject,
});

export default function TodoPorject() {
  const { id: projectId } = useParams();
  const { todoProject } = useShallowEqualSelector(todoProjectSelector);
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(projectActions.createClearTodoProject());
  }, [dispatch]);

  useEffect(() => { // 拉取 project
    if (projectId == null) return;
    if (todoProject == null || todoProject.id !== projectId) {
      if (todoProject != null) dispatch(projectActions.createClearTodoProject());
      dispatch(projectEffects.getTodoProject(projectId));
    }
  }, [projectId, todoProject, dispatch]);

  const checkedTasks = useMemo(() => (todoProject == null ? [] : todoProject.tasks.filter(t => t.checked)), [
    todoProject,
  ]);
  const uncheckedTasks = useMemo(() => (todoProject == null ? [] : todoProject.tasks.filter(t => !t.checked)), [
    todoProject,
  ]);

  // 页面跳转
  const history = useHistory();
  const jumpToEditPage = useCallback(() => {
    history.push(`/project-editor/${projectId}`);
  }, [history, projectId]);

  const toggleOneTask = useCallback(
    (taskId: string) => {
      dispatch(projectActions.createToggleCheckTaskInTodoProjectById(taskId));
    },
    [dispatch],
  );

  if (projectId == null) return <Redirect to="/" />;

  if (todoProject == null) return <FullScreenLoading />;

  return (
    <div className="todo-project">
      <List>
        <ListItem>
          <Typography variant="h4">{todoProject.name}</Typography>
          <IconButton onClick={jumpToEditPage}>
            <EditIcon />
          </IconButton>
        </ListItem>
        <List subheader={uncheckedTasks.length !== 0 ? <ListSubheader>未完成</ListSubheader> : undefined}>
          <TransitionGroup>
            {uncheckedTasks.map(t => (
              <Slide timeout={500} key={t.id} direction="right">
                <ListItem button onClick={() => toggleOneTask(t.id)}>
                  <ListItemIcon>
                    <Checkbox checked={t.checked} />
                  </ListItemIcon>
                  <ListItemText>{t.name}</ListItemText>
                </ListItem>
              </Slide>
            ))}
          </TransitionGroup>
        </List>
        <List subheader={checkedTasks.length !== 0 ? <ListSubheader>已完成</ListSubheader> : undefined}>
          <TransitionGroup>
            {checkedTasks.map(t => (
              <Slide timeout={500} key={t.id} direction="right">
                <ListItem button key={t.id} onClick={() => toggleOneTask(t.id)}>
                  <ListItemIcon>
                    <Checkbox checked={t.checked} />
                  </ListItemIcon>
                  <ListItemText>{t.name}</ListItemText>
                </ListItem>
              </Slide>
            ))}
          </TransitionGroup>
        </List>
      </List>
    </div>
  );
}

import React, { useState, useCallback, SyntheticEvent } from 'react';
import { ListItem, List, ListItemText, ListSubheader, IconButton, Switch, Slide } from '@material-ui/core';
import { Delete as DeleteIcon, BorderColor as EditIcon, StarBorder as UnpinnedIcon, Star as PinnedIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { IReduxState } from '../store/reducers';
import { useShallowEqualSelector } from '../util/hooks';
import { projectEffects } from '../store/effects';
import FullScreenLoading from '../ui/FullScreenLoading';
import { globalActions } from '../store/action';

// import './index.scss';

const projectSelector = ({ project: { projects } }: IReduxState) => ({
  projects,
});

const ProjectList = React.memo(function ProjectList() {
  const { projects } = useShallowEqualSelector(projectSelector);

  // 页面跳转相关
  const dispatch = useDispatch();
  const history = useHistory();
  const jumpToTodoProjectPageById = useCallback(
    // 跳转到 todo project 页面
    (projectId: string) => {
      dispatch(globalActions.createSetIsShowAsideMenu(false));
      history.push(`/todo-project/${projectId}`);
    },
    [dispatch, history],
  );

  const jumpToProjectEditorPageById = useCallback(
    // 跳转到 project editor 页面
    (projectId: string) => {
      dispatch(globalActions.createSetIsShowAsideMenu(false));
      history.push(`/project-editor/${projectId}`);
    },
    [dispatch, history],
  );


  // project 操作相关
  const deleteProject = useCallback(
    (proejctId: string) => {
      dispatch(projectEffects.delProjectById(proejctId));
    },
    [dispatch],
  );

  const pinOneProject = useCallback((projectId: string) => {
    dispatch(projectEffects.setProjectIsPinned(projectId, true))
  }, [dispatch]);

  const unpinOneProject = useCallback((projectId: string) => {
    dispatch(projectEffects.setProjectIsPinned(projectId, false))
  }, [dispatch]);

  // 编辑按钮相关
  const [isEdited, setIsEdited] = useState(false);
  const toggleIsEdited = useCallback(() => setIsEdited(prev => !prev), [setIsEdited]);

  if (projects == null) return <FullScreenLoading />;
  
  return (
    <List
      className="project-list"
      subheader={
        <ListSubheader>
          <div
            style={{
              display: 'flex',
            }}
          >
            <span style={{ flex: '1' }} className="title">
              项目
            </span>
            <div className="edit-button">
              编辑 <Switch checked={isEdited} onChange={toggleIsEdited} />
            </div>
          </div>
        </ListSubheader>
      }
    >
      <TransitionGroup>
        {projects.map(p => (
          <Slide timeout={500} direction="right" key={p.id}>
            <ListItem
              style={{
                height: '64px',
              }}
              onClick={() => jumpToTodoProjectPageById(p.id)}
              button
            >
              <ListItemText>{p.name}</ListItemText>
              {isEdited ? (
                <>
                  <IconButton
                    onClick={(evt: SyntheticEvent) => {
                      evt.stopPropagation();
                      jumpToProjectEditorPageById(p.id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(evt: SyntheticEvent) => {
                      evt.stopPropagation();
                      deleteProject(p.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : p.isPinned ? (
                <IconButton
                  onClick={(evt: SyntheticEvent) => {
                    evt.stopPropagation();
                    unpinOneProject(p.id);
                  }}
                >
                  <PinnedIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={(evt: SyntheticEvent) => {
                    evt.stopPropagation();
                    pinOneProject(p.id);
                  }}
                >
                  <UnpinnedIcon />
                </IconButton>
              )}
            </ListItem>
          </Slide>
        ))}
      </TransitionGroup>
    </List>
  );
})

export default ProjectList;

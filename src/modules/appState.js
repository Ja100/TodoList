import { createProjects } from './projects.js';

export const createAppState = () => {
  const projects = [];
  const defaultProject = createProjects('Default');
  projects.push(defaultProject);

  let activeProjectIndex = 0;

  const addProject = (name) => {
    const newProject = createProjects(name);
    projects.push(newProject);
    return newProject;
  };

  const getProjects = () => projects;

  const getActiveProject = () => projects[activeProjectIndex];

  const setActiveProject = (index) => {
    if (index >= 0 && index < projects.length) {
      activeProjectIndex = index;
    }
  };

  return {
    addProject, getProjects, getActiveProject, setActiveProject,
  };
};
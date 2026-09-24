import "./style/style.css"
import { createAppState } from './modules/appState.js';
import { createDOMController } from './modules/domController.js';
import { createTodo } from './modules/todo.js';

// Initialisation de l'application
const state = createAppState();
const ui = createDOMController(state);

//Exemple d'injection de données de démonstration
const defaultProject = state.getActiveProject();
defaultProject.addTodo(
  createTodo({
    title: 'Finaliser le projet JavaScript',
    description: 'Séparer la logique métier des composants DOM.',
    dueDate: '2026-10-01',
    priority: 'high',
    notes: 'Utiliser ES Modules.',
  })
);

ui.render();
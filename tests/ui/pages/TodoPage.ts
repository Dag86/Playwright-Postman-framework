// File: tests/ui/pages/TodoPage.ts

import { BasePage } from '../pages/BasePage';
import { Page } from '@playwright/test';

export class TodoPage extends BasePage {
  static selectors = {
    newTodoInput: '.new-todo',
    todoItems: '.todo-list li',
    toggleCompleteButton: '.toggle',
    filterCompletedButton: 'a[href="#/completed"]'
  };

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(todoText: string) {
    await this.fill(TodoPage.selectors.newTodoInput, todoText);
    await this.pressEnter();
  }

  async getTodoItems() {
    return this.getLocator(TodoPage.selectors.todoItems);
  }

  async completeFirstTodo() {
    await this.getLocator(TodoPage.selectors.toggleCompleteButton).first().click();
  }

  async filterCompleted() {
    await this.click(TodoPage.selectors.filterCompletedButton);
  }

  async getFirstTodoText() {
    return await this.getLocator(TodoPage.selectors.todoItems).first().textContent();
  }
}

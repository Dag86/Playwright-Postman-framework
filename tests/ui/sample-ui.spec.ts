// File: tests/ui/sample-ui.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';
import { todoItems } from './data/todos';  // 

test.describe('TodoMVC Tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  for (const item of todoItems) {
    test(`should add todo: "${item}"`, async () => {
      await todoPage.addTodo(item);
      const items = await todoPage.getTodoItems();

      // Assertion: For empty and whitespace-only strings, we might skip checking
      if (item.trim() !== '') {
        await expect(items).toContainText([item.trim()]);
      } else {
        // Optional: Check no new todo item added
        await expect(items).not.toContainText([item]);
      }
    });
  }

  test('should mark a todo item as completed', async () => {
    await todoPage.addTodo('Complete this task');
    await todoPage.completeFirstTodo();
    await todoPage.filterCompleted();
    const items = await todoPage.getTodoItems();
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText('Complete this task');
  });
});

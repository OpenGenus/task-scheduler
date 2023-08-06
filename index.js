class TaskScheduler {
  constructor() {
    this.tasks = [];
  }

  // Add new task
  addTask(task, priority, expectedDuration) {
    // Calculate the final priority based on the priority and the expected duration
    const finalPriority = Math.round(priority / expectedDuration);
    // We add the new task into the tasks array with its priority
    this.tasks.push({ task, priority, expectedDuration, finalPriority });
    // Then we call heapifyUp method to arrange the tasks order by priority
    this.heapifyUp(this.tasks.length - 1);
  }

  // Delete tasks
  deleteTask(task) {
    // Find the index of the task we want to delete
    const index = this.tasks.findIndex((t) => t.task === task);

    // If the task is found then we remove the task from the list
    if (index !== -1) {
      this.tasks.splice(index, 1);
    } else {
      // If it's not found then we just return and don't do anything
      return;
    }
  }

  // Get the next task in the list
  getNextTask() {
    // If there are no tasks then return null
    if (this.tasks.length === 0) {
      return null;
    }

    // Get the first task
    const nextTask = this.tasks[0]; // Task 1
    // If there are more than 1 tasks in the list
    if (this.tasks.length > 1) {
      // Then we take out the last task and place it in the first place
      this.tasks[0] = this.tasks.pop(); // Task 2
      // Then we arrange the tasks by minimum priority
      this.heapifyDown(0);
    } else {
      // If it's only one task in the list then we take it out of the list
      this.tasks.pop();
    }
    return nextTask.task;
  }

  // Arrange by priority
  heapifyUp(index) {
    // Get current task
    const currentTask = this.tasks[index];
    while (index > 0) {
      // Get parent task (the task before the current task)
      const parentIndex = Math.floor((index - 1) / 2);
      const parentTask = this.tasks[parentIndex];
      // If the final priority of the compared tasks is greater than or equal 0 then break out of the function
      if (this.compareTasks(currentTask, parentTask) >= 0) {
        break;
      }
      // Otherwise, swap places
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  heapifyDown(index) {
    // Get current task
    const currentTask = this.tasks[index];
    // Get the number of tasks in the list
    const length = this.tasks.length;
    // We start an infinite loop and will break when the task reaches its correct position
    while (true) {
      let childIndex = null;
      let minPriority = currentTask.finalPriority;

      // Get the index of the left child
      const leftChildIndex = 2 * index + 1;
      // Get the index of the right child
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftChild = this.tasks[leftChildIndex];

        if (this.compareTasks(leftChild, currentTask) < 0) {
          childIndex = leftChildIndex;
          minPriority = leftChild.finalPriority;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.tasks[rightChildIndex];

        if (this.compareTasks(rightChild, currentTask) < 0) {
          childIndex = rightChildIndex;
          minPriority = rightChild.finalPriority;
        }
      }

      // If the child index is null then we break out of the function
      if (childIndex === null) {
        break;
      }

      // We swap the places of the two tasks
      this.swap(index, childIndex);
      index = childIndex;
    }
  }

  // Compare the two tasks priority
  compareTasks(task1, task2) {
    return task1.finalPriority - task2.finalPriority;
  }

  // Swap places
  swap(x, y) {
    [this.tasks[x], this.tasks[y]] = [this.tasks[y], this.tasks[x]];
  }
}

const scheduler = new TaskScheduler(); // {tasks: []}

scheduler.addTask("Task 3", 1, 2); // final priority => 1
scheduler.addTask("Task 1", 2, 1); // final priority => 2
scheduler.addTask("Task 2", 3, 3); // final priority => 1

/*
TaskScheduler {
  tasks: [
    {
      task: 'Task 3',
      priority: 1,
      expectedDuration: 2,
      finalPriority: 1
    },
    {
      task: 'Task 1',
      priority: 2,
      expectedDuration: 1,
      finalPriority: 2
    },
    {
      task: 'Task 2',
      priority: 3,
      expectedDuration: 3,
      finalPriority: 1
    }
  ]
}
*/

console.log(scheduler.getNextTask()); // Task 3
console.log(scheduler.getNextTask()); // Task 2
console.log(scheduler.getNextTask()); // Task 1

scheduler.deleteTask("Task 1");

/*
TaskScheduler {
  tasks: [
    {
      task: 'Task 3',
      priority: 1,
      expectedDuration: 2,
      finalPriority: 1
    },
    {
      task: 'Task 2',
      priority: 3,
      expectedDuration: 3,
      finalPriority: 1
    }
  ]
}
*/

console.log(scheduler);

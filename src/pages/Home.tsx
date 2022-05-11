import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
 
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldTasks => [...oldTasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks.forEach(element => {
      if (element.id === id){ 
        element.done = !element.done;
        return;
      }
    })
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const newTasksArray = tasks.filter(item => {
      return item.id != id;
    });
    setTasks(newTasksArray);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
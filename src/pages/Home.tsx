import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
 
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface TaskNewTitleProps {
  taskId: number;
  taskNewTitle: string
}

export function Home() {
  
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const elementoExistente = tasks.find(element => element.title === newTaskTitle);
    if (elementoExistente === undefined){
      setTasks(oldTasks => [...oldTasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }]);
    } else {
      Alert.alert("Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome");
    }

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

  function handleRemoveTaskAlert(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Seleção de Não"),
          style: "cancel"
        },
        { text: "Sim",
          onPress:() => handleRemoveTask(id)
        }
      ]
    );
  }

  function handleRemoveTask(id: number) {
    const newTasksArray = tasks.filter(item => {
      return item.id != id;
    });
    setTasks(newTasksArray)
  }

  function handleEditTask(taskNewTitleProps: TaskNewTitleProps) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks.forEach(element => {
      if (element.id === taskNewTitleProps.taskId){ 
        element.title = taskNewTitleProps.taskNewTitle;
        return;
      }
    })
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.containerHome}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTaskAlert}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
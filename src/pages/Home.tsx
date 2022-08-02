import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type EditTask = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskRepeated = tasks.find(task => task.title === newTaskTitle)
    if(taskRepeated){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTask = updatedTasks.find(item => item.id === id)
    if(!foundTask){
      return
    }
    foundTask.done = !foundTask.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: 'Não',
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: () => {
            const newState = tasks.filter(task => task.id !== id)
            setTasks(newState)
          },
          style: 'destructive'
        }
      ]
    )    
  }

  function handleEditTask({taskId, taskNewTitle}: EditTask) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToSet = updatedTasks.find(item => item.id === taskId)
    if(!taskToSet){
      return
    }

    taskToSet.title = taskNewTitle
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
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
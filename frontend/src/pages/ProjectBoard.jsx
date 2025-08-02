import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react';
import KanbanBoard from '../components/KanbanBoard';
import AddTaskModal from '../components/AddTaskModal';

const ProjectBoard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      // Fetch project details (you might want to add a project details endpoint)
      // For now, we'll just fetch tasks
      const response = await axios.get(`/api/tasks/projects/${id}/tasks`);
      setTasks(response.data);
    } catch (error) {
      setError('Failed to load project data');
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const columnTasks = tasks.filter(task => task.status === source.droppableId);
      const reorderedTasks = Array.from(columnTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      const newTasks = tasks.map(task => {
        if (task.status === source.droppableId) {
          const reorderedTask = reorderedTasks.find(t => t._id === task._id);
          return reorderedTask || task;
        }
        return task;
      });

      setTasks(newTasks);
    } else {
      // Move to different column
      const taskToUpdate = tasks.find(task => task._id === draggableId);
      if (!taskToUpdate) return;

      try {
        await axios.put(`/api/tasks/${draggableId}`, {
          status: destination.droppableId
        });

        const updatedTasks = tasks.map(task =>
          task._id === draggableId
            ? { ...task, status: destination.droppableId }
            : task
        );

        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error updating task status:', error);
        // Revert the change if the API call fails
        fetchProjectAndTasks();
      }
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      setError('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(task =>
        task._id === editingTask._id ? response.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      setError('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      handleEditTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Projects
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {project?.name || 'Project Board'}
            </h1>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="h-[calc(100vh-200px)]">
        <KanbanBoard
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onAddTask={() => setShowAddModal(true)}
          onDeleteTask={handleDeleteTask}
          onEditTask={(task) => setEditingTask(task)}
        />
      </div>

      <AddTaskModal
        isOpen={showAddModal || !!editingTask}
        onClose={() => {
          setShowAddModal(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        projectId={id}
      />
    </div>
  );
};

export default ProjectBoard; 
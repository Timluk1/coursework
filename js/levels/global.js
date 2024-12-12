// Очистка задачи
export const clearTask = () => {
    const existingTask = document.querySelector(".task");
    if (existingTask) {
        existingTask.remove();
    }
};

export const getRandomType = () => {
    const types = ['easy', 'medium', 'hard']
    return types[Math.floor(Math.random() * 3)]
}
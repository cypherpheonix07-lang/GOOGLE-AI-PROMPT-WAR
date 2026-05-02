export const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case 'To Do': return 'In Progress';
    case 'In Progress': return 'Done';
    default: return 'To Do';
  }
};

export const getPrevStatus = (currentStatus) => {
  switch (currentStatus) {
    case 'Done': return 'In Progress';
    case 'In Progress': return 'To Do';
    default: return 'To Do';
  }
};

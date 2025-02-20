// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Add Todo
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  if (todoInput.value.trim()) {
    addTodoItem(todoInput.value.trim());
    todoInput.value = '';
    todoInput.focus();
  }
  boomEffect();
});

// Create Todo Item Element
function createTodoElement(text) {
  // li tag
  const li = document.createElement('li');
  li.className =
    'flex items-center justify-between bg-[#171c48] p-3 rounded-lg text-white w-full';

  //span tag
  const span = document.createElement('span');
  span.className = 'flex-1 mr-4';
  span.textContent = '★ ' + text;

  //edit button tag
  const editBtn = document.createElement('button');
  editBtn.className = 'text-blue-500 hover:text-blue-600 mr-4';
  //img tag into push editBtn
  const img = document.createElement('img');
  img.src = './img/edit.png';
  img.className = 'w-[24px] h-[24px]';
  editBtn.append(img);

  //Delete btn
  const deleteBtn = document.createElement('button');
  //img tag into push Delete btn
  const img2 = document.createElement('img');
  img2.src = './img/bin.png';
  img2.className = 'w-[20px] h-[20px]';
  deleteBtn.append(img2);

  // Edit functionality
  editBtn.addEventListener('click', () => {
    const isEditing = span.contentEditable === 'true';
    span.contentEditable = !isEditing;
    span.focus();
    if (isEditing) {
      editBtn.textContent = '';
      editBtn.append(img);
    } else {
      editBtn.textContent = 'Save';
    }
    boomEffect();
  });

  // Delete functionality
  deleteBtn.addEventListener('click', () => {
    li.remove();
    boomEffect();
  });

  // Save on pressing Enter
  span.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      span.contentEditable = 'false';
      editBtn.textContent = '';
      editBtn.append(img);
      // span.classList.remove('bg-yellow-100');
    }
  });

  li.append(span, editBtn, deleteBtn);
  return li;
}

// Add new Todo item
function addTodoItem(text) {
  const newTodo = createTodoElement(text);
  todoList.appendChild(newTodo);
}

//Boom Effect
const boomEffect = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

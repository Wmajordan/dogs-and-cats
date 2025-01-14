let animals = JSON.parse(localStorage.getItem('animals')) || [];

function saveAnimals() {
  localStorage.setItem('animals', JSON.stringify(animals));
}

function saveAnimal() {
  const id = document.getElementById('animal-id').value;
  const name = document.getElementById('animal-name').value;
  const type = document.getElementById('animal-type').value;
  const gender = document.getElementById('animal-gender').value;
  const kennelNumber = document.getElementById('kennel-number').value;
  const color = document.getElementById('animal-color').value;
  const intakeDate = document.getElementById('intake-date').value;
  const notes = document.getElementById('animal-notes').value;

  if (!name || !type || !gender || !kennelNumber || !color || !intakeDate) {
    alert('Please fill in all fields before saving.');
    return;
  }

  if (id) {
    const animal = animals.find(animal => animal.id === parseInt(id));
    if (animal) {
      animal.name = name;
      animal.type = type;
      animal.gender = gender;
      animal.kennelNumber = kennelNumber;
      animal.color = color;
      animal.intakeDate = intakeDate;
      animal.notes = notes;
      alert(`${animal.type} named ${animal.name} updated successfully.`);
    }
  } else {
    const newAnimal = {
      id: Date.now(),
      name,
      type,
      gender,
      kennelNumber,
      color,
      intakeDate,
      notes
    };
    animals.push(newAnimal);
    alert(`${type} named ${name} added successfully.`);
  }

  saveAnimals();
  resetForm();
  updateAnimalTable();
}

function resetForm() {
  document.getElementById('animal-id').value = '';
  document.getElementById('animal-name').value = '';
  document.getElementById('kennel-number').value = '';
  document.getElementById('intake-date').value = '';
  document.getElementById('animal-notes').value = '';
}

function updateAnimalTable() {
  const tableBody = document.querySelector('#animal-table tbody');
  tableBody.innerHTML = '';
  animals.forEach(animal => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${animal.name}</td>
      <td>${animal.type}</td>
      <td>${animal.gender}</td>
      <td>${animal.kennelNumber}</td>
      <td>${animal.color}</td>
      <td>${animal.intakeDate}</td>
      <td>${animal.notes}</td>
      <td>
        <button onclick="editAnimal(${animal.id})">Edit</button>
        <button onclick="removeAnimal(${animal.id})">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editAnimal(id) {
  const animal = animals.find(animal => animal.id === id);
  if (animal) {
    document.getElementById('animal-id').value = animal.id;
    document.getElementById('animal-name').value = animal.name;
    document.getElementById('animal-type').value = animal.type;
    document.getElementById('animal-gender').value = animal.gender;
    document.getElementById('kennel-number').value = animal.kennelNumber;
    document.getElementById('animal-color').value = animal.color;
    document.getElementById('intake-date').value = animal.intakeDate;
    document.getElementById('animal-notes').value = animal.notes;
  }
}

function removeAnimal(id) {
  animals = animals.filter(animal => animal.id !== id);
  saveAnimals();
  updateAnimalTable();
}

// Initialize table on load
updateAnimalTable();

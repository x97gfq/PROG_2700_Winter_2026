const API = 'http://localhost:3000/pokemon';

const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const addModal = new bootstrap.Modal(document.getElementById('addModal'));

// ── GET all ──────────────────────────────────────────────────────────────────
async function loadPokemon() {
    const res = await fetch(API);
    const data = await res.json();
    const tbody = document.getElementById('pokemon-table-body');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.type}</td>
            <td>${p.hp}</td>
            <td>${p.attack}</td>
            <td>${p.defense}</td>
            <td>${p.speed}</td>
            <td><button class="btn btn-sm btn-outline-primary" onclick="openEditModal(${p.id})">View / Edit</button></td>
        </tr>
    `).join('');
}

// ── GET by id (opens edit modal) ─────────────────────────────────────────────
async function openEditModal(id) {
    const res = await fetch(`${API}/${id}`);
    const p = await res.json();
    document.getElementById('edit-id').value = p.id;
    document.getElementById('edit-name').value = p.name;
    document.getElementById('edit-type').value = p.type;
    document.getElementById('edit-hp').value = p.hp;
    document.getElementById('edit-attack').value = p.attack;
    document.getElementById('edit-defense').value = p.defense;
    document.getElementById('edit-speed').value = p.speed;
    editModal.show();
}

// ── PUT (save edits) ──────────────────────────────────────────────────────────
async function savePokemon() {
    const id = document.getElementById('edit-id').value;
    const body = {
        name: document.getElementById('edit-name').value,
        type: document.getElementById('edit-type').value,
        hp: Number(document.getElementById('edit-hp').value),
        attack: Number(document.getElementById('edit-attack').value),
        defense: Number(document.getElementById('edit-defense').value),
        speed: Number(document.getElementById('edit-speed').value),
    };
    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    editModal.hide();
    loadPokemon();
}

// ── DELETE ────────────────────────────────────────────────────────────────────
async function deletePokemon() {
    const id = document.getElementById('edit-id').value;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    editModal.hide();
    loadPokemon();
}

// ── POST (add new) ────────────────────────────────────────────────────────────
function openAddModal() {
    document.getElementById('add-name').value = '';
    document.getElementById('add-type').value = '';
    document.getElementById('add-hp').value = '';
    document.getElementById('add-attack').value = '';
    document.getElementById('add-defense').value = '';
    document.getElementById('add-speed').value = '';
    addModal.show();
}

async function addPokemon() {
    const body = {
        name: document.getElementById('add-name').value,
        type: document.getElementById('add-type').value,
        hp: Number(document.getElementById('add-hp').value),
        attack: Number(document.getElementById('add-attack').value),
        defense: Number(document.getElementById('add-defense').value),
        speed: Number(document.getElementById('add-speed').value),
    };
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    addModal.hide();
    loadPokemon();
}

// Load on page start
loadPokemon();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const usersList = document.getElementById('usersList');
    const refreshBtn = document.getElementById('refreshBtn');
    
    // UI Elements for form state
    const submitBtnText = document.querySelector('.btn-text');
    const submitLoader = document.getElementById('submitLoader');
    const formMessage = document.getElementById('formMessage');
    
    // Initial fetch
    fetchUsers();

    // Refresh button event
    refreshBtn.addEventListener('click', () => {
        refreshBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => { refreshBtn.style.transform = 'none'; }, 300);
        fetchUsers();
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        formMessage.classList.add('hidden');
        formMessage.className = 'message hidden';
        
        // Setup loading state
        submitBtnText.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('User added successfully!', 'success');
                form.reset();
                fetchUsers();
            } else {
                showMessage(data.error || 'Failed to add user', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error('Error:', error);
        } finally {
            // Revert loading state
            submitBtnText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `message ${type}`;
        formMessage.classList.remove('hidden');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }

    async function fetchUsers() {
        // Show list loader
        usersList.innerHTML = `
            <div class="loader-container" id="listLoader">
                <div class="loader large"></div>
            </div>
        `;

        try {
            const response = await fetch('/api/users');
            const users = await response.json();

            if (response.ok) {
                renderUsers(users);
            } else {
                usersList.innerHTML = `<div class="empty-state">Failed to load users: ${users.error}</div>`;
            }
        } catch (error) {
            usersList.innerHTML = `<div class="empty-state">Network error. Is the server running?</div>`;
            console.error('Error fetching users:', error);
        }
    }

    function renderUsers(users) {
        if (!users || users.length === 0) {
            usersList.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; opacity: 0.5;">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <p>No users found. Add one to get started.</p>
                </div>
            `;
            return;
        }

        usersList.innerHTML = '';
        
        users.forEach((user, index) => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            // Staggered animation
            userEl.style.animationDelay = `${index * 0.1}s`;
            
            userEl.innerHTML = `
                <div class="user-item-header">
                    <span class="user-name">${escapeHTML(user.name)}</span>
                    ${user.age ? `<span class="user-age">${escapeHTML(user.age.toString())} yrs</span>` : ''}
                </div>
                <div class="user-email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    ${escapeHTML(user.email)}
                </div>
                <div class="user-actions">
                    <button class="btn-edit" onclick="window.openEditModal('${user._id}', '${escapeHTML(user.name)}', '${escapeHTML(user.email)}', '${user.age || ''}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit
                    </button>
                    <button class="btn-delete" onclick="window.deleteUser('${user._id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        Delete
                    </button>
                </div>
            `;
            
            usersList.appendChild(userEl);
        });
    }

    // Modal Logic
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    
    document.getElementById('closeModalBtn').addEventListener('click', closeEditModal);
    document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);

    function closeEditModal() {
        editModal.classList.add('hidden');
    }

    // Attach to window so onclick handlers in HTML can access them
    window.openEditModal = (id, name, email, age) => {
        document.getElementById('editUserId').value = id;
        document.getElementById('editName').value = name;
        document.getElementById('editEmail').value = email;
        document.getElementById('editAge').value = age;
        
        document.getElementById('editFormMessage').classList.add('hidden');
        editModal.classList.remove('hidden');
    };

    window.deleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        try {
            const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchUsers();
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Network error');
        }
    };

    // Edit form submission
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('editUserId').value;
        const submitBtnText = document.getElementById('editSubmitText');
        const submitLoader = document.getElementById('editSubmitLoader');
        const msg = document.getElementById('editFormMessage');
        
        msg.classList.add('hidden');
        submitBtnText.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        
        const formData = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            age: document.getElementById('editAge').value
        };

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                closeEditModal();
                fetchUsers();
            } else {
                const data = await response.json();
                msg.textContent = data.error || 'Failed to update';
                msg.className = 'message error';
                msg.classList.remove('hidden');
            }
        } catch (error) {
            msg.textContent = 'Network error';
            msg.className = 'message error';
            msg.classList.remove('hidden');
        } finally {
            submitBtnText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }
    });

    // Basic HTML escaping to prevent XSS
    function escapeHTML(str) {
        if (!str) return '';
        return str.toString().replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});

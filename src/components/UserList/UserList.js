import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    FormHelperText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', username: 'johndoe', role: 'Admin' },
        { id: 2, name: 'Jane Smith', username: 'janesmith', role: 'User' },
        { id: 3, name: 'Mike Johnson', username: 'mikejohnson', role: 'Moderator' },
    ]);

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'User',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newUser.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!newUser.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (users.some((user) => user.username === newUser.username.trim())) {
            newErrors.username = 'Username already exists';
        }

        if (!newUser.password) {
            newErrors.password = 'Password is required';
        } else if (newUser.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!newUser.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm password';
        } else if (newUser.password !== newUser.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddUser = () => {
        if (validateForm()) {
            const userId = Math.max(...users.map((u) => u.id), 0) + 1;
            const { confirmPassword, ...userWithoutConfirm } = newUser;
            setUsers([...users, { ...userWithoutConfirm, id: userId }]);
            handleCloseAddDialog();
        }
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewUser({
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            role: 'User',
        });
        setErrors({});
    };

    const handleDeleteUser = () => {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setSelectedUser(null);
        setOpenDeleteDialog(false);
    };

    const handleEdit = (userId) => {
        navigate(`/users/${userId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <Typography variant="h4">User Management</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add User
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(user.id)}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setOpenDeleteDialog(true);
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add User Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        value={newUser.confirmPassword}
                        onChange={(e) =>
                            setNewUser({ ...newUser, confirmPassword: e.target.value })
                        }
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={newUser.role}
                            label="Role"
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Moderator">Moderator</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button onClick={handleAddUser} variant="contained">
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedUser?.name}? This action cannot be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserList;

import { FC, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from './ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Link } from 'react-router-dom';

interface UsersProps {
  _id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
}

const Users: FC<UsersProps> = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UsersProps | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error: any) {
        toast.error('Something went wrong');
      }
    };

    getAllUsers();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setSelectedUser((prevState) => {
      return { ...prevState, [field]: e.target.value } as UsersProps;
    });
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        await axios.patch(
          `http://localhost:3000/users/${selectedUser._id}`,
          selectedUser
        );
        toast.success('User updated successfully!');
      } catch (error: any) {
        toast.error('Failed to update user. Please try again later.');
      }
    }
  };

  return (
    <div className='p-10'>
      <div>
        <Link to={'/add-user'}>
          <Button
            variant='default'
            className='flex item-start mb-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            Add new User
          </Button>
        </Link>
      </div>
      <Table className='min-w-full divide-y divide-gray-200'>
        <TableCaption>A list of users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='py-3 px-6 text-left'>Name</TableHead>
            <TableHead className='py-3 px-6 text-left'>Age</TableHead>
            <TableHead className='py-3 px-6 text-left'>Email</TableHead>
            <TableHead className='py-3 px-6 text-left'>Gender</TableHead>
            <TableHead className='py-3 px-6 text-left'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-white divide-y divide-gray-200'>
          {users.map((user) => (
            <TableRow key={user._id} className='text-gray-700'>
              <TableCell className='py-3 px-6 text-left'>{user.name}</TableCell>
              <TableCell className='py-3 px-6 text-left'>{user.age}</TableCell>
              <TableCell className='py-3 px-6 text-left'>
                {user.email}
              </TableCell>
              <TableCell className='py-3 px-6 text-left'>
                {user.gender}
              </TableCell>
              <TableCell className='py-3 px-6 text-left'>
                {/* Dialog Component/Editing feature */}
                <div className='flex space-x-4'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedUser(user)}
                        variant='default'
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    {selectedUser && (
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleUpdateUser}
                          className='grid gap-4 py-4'
                        >
                          <Label htmlFor='name'>Name</Label>
                          <Input
                            id='name'
                            value={selectedUser.name}
                            className='col-span-3'
                            onChange={(e) => handleInputChange(e, 'name')}
                          />
                          <Label htmlFor='age'>Age</Label>
                          <Input
                            id='age'
                            value={selectedUser.age}
                            className='col-span-3'
                            onChange={(e) => handleInputChange(e, 'age')}
                          />
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            id='email'
                            value={selectedUser.email}
                            className='col-span-3'
                            onChange={(e) => handleInputChange(e, 'email')}
                          />
                          <Label htmlFor='gender'>Gender</Label>
                          <Input
                            id='gender'
                            value={selectedUser.gender}
                            className='col-span-3'
                            onChange={(e) => handleInputChange(e, 'gender')}
                          />
                          <DialogFooter>
                            <Button type='submit'>Save changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    )}
                  </Dialog>
                  {/* Your delete button */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;

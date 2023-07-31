import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from './ui/Button';
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

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error: any) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              #
            </TableHead>
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </TableHead>
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Age
            </TableHead>
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </TableHead>
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Gender
            </TableHead>
            <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-white divide-y divide-gray-200'>
          {users.map((user, index) => (
            <TableRow key={user._id} className='text-gray-700'>
              <TableCell className='py-3 px-6 text-left whitespace-nowrap'>
                {index + 1}
              </TableCell>
              <TableCell className='py-3 px-6 text-left'>{user.name}</TableCell>
              <TableCell className='py-3 px-6 text-left'>{user.age}</TableCell>
              <TableCell className='py-3 px-6 text-left'>
                {user.email}
              </TableCell>
              <TableCell className='py-3 px-6 text-left'>
                {user.gender}
              </TableCell>
              <TableCell className='py-3 px-6 text-left'>
                <div className='flex space-x-4'>
                  <Link to={`/edit-user/${user._id}`}>
                    <Button
                      variant='default'
                      className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300'>
                    Delete
                  </Button>
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

import { Button } from '@/components/ui/Button';
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface EditUserProps {
  name: string;
  age: number;
  email: string;
  gender: string;
}

const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<EditUserProps | null>(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(response.data);
    } catch (error: any) {
      toast.error('Something went wrong.');
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const handleUpdateUser = async () => {
    // Implement the logic to update the user data using a PUT or PATCH request
    // You can use axios.put() or axios.patch() here
    try {
      // Replace the following line with the actual API call to update the user data
      await axios.patch(`http://localhost:3000/users/${id}`, user);
      toast.success('User updated successfully!');
      navigate('/')
    } catch (error: any) {
      toast.error('Failed to update user. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-white flex justify-center py-12 px-4'>
      <div className='max-w-md w-full space-y-8'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Edit Profile</Button>
          </DialogTrigger>
          {user && (
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={user.name}
                    className='col-span-3'
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='age' className='text-right'>
                    Age
                  </Label>
                  <Input
                    id='age'
                    type='number'
                    value={user.age}
                    className='col-span-3'
                    onChange={(e) =>
                      setUser({ ...user, age: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-right'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    value={user.email}
                    className='col-span-3'
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='gender' className='text-right'>
                    Gender
                  </Label>
                  {/* Replace the following select with your custom select component */}
                  <select
                    id='gender'
                    value={user.gender}
                    className='col-span-3'
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Transgender'>Transgender</option>
                    <option value='Non-binary'>Non-binary</option>
                    <option value='Prefer not to respond'>
                      Prefer not to respond
                    </option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpdateUser}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default EditUser;

import formSchema, { genderIdentity } from '@/utils/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/Form';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      gender: 'Male',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:3000/users', values);
      console.log(response.data);
      toast.success('User created successfully!');
      form.reset();
      navigate('/');
    } catch (error: any) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-white flex justify-center py-12 px-4'>
      <div className='max-w-md w-full space-y-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='flex ml-1'>Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder='Name' disabled={isLoading} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Age */}
            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='flex ml-1'>Age</FormLabel> */}
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Age'
                      disabled={isLoading}
                      {...field}
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        field.onChange(parsedValue);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='flex ml-1'>Email</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder='Email'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='flex ml-1'>Gender</FormLabel> */}
                  <FormControl>
                    <Controller
                      render={({ field }) => (
                        <Select>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Gender' {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {genderIdentity.map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                      control={form.control}
                      name='gender'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant='default'
              type='submit'
              className='flex flex-col items-center w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium text-white bg-green hover:bg-dark-green'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;

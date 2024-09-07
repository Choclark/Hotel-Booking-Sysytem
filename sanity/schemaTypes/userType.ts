

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string', // Use string if you want to store ages with leading zeros; otherwise, use 'number'
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'number',
    }),
    defineField({
      name: 'Email',
      title: 'email',
      type: 'string',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
    }),
  ],
});

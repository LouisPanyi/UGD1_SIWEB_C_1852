'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
 
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });
 
  const FormSchemaCustomer = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image_url: z.string()
  })
   
  const CreateReservation = FormSchema.omit({ id: true, date: true });
 
export async function createReservation(formData: FormData) {
    const { customerId, amount, status } = CreateReservation.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0];
 
      try {
      await sql`
        INSERT INTO reservation (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Reservation.',
      };
    }
 
    revalidatePath('/dashboard/reservation');
    redirect('/dashboard/reservations');
}
 
const UpdateReservation = FormSchema.omit({ id: true, date: true });
 
export async function updateReservation(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateReservation.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE reservations
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Reservation.' };
  }
 
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}
 
export async function deleteReservation(id: string) {
  throw new Error('Failed to Delete Reservation');
    // Unreachable code block
    try {
      await sql`DELETE FROM reservations WHERE id = ${id}`;
      revalidatePath('/dashboard/reservations');
      return { message: 'Deleted Reservation' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Reservation' };
    }
}
 
  const CreateCustomer = FormSchemaCustomer.omit({ id: true });
 
  export async function createCustomer(formData: FormData) {
   
    const img = formData.get('image');
    console.log(img);
   
    let filename = '';
    if (img instanceof File) {
      filename = '/customers/' + img.name;
      console.log(filename);
    }
   
    const { name, email, image_url } = CreateCustomer.parse({
      name: formData.get('name'),
      email: formData.get('email') ,
      image_url: filename,
    });
   
    try {
      await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create customers.',
      };
    }
   
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
  }
   
    const UpdateCustomer = FormSchemaCustomer.omit({ id: true, });
    export async function updateCustomer(id: string, formData: FormData) {
      const img = formData.get('image')
      console.log(img);
      let filename = '';
      if(img instanceof File) {
        filename = '/customers/' + img.name;
        console.log(filename);
      }
      const { name, email ,image_url } = UpdateCustomer.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        image_url: filename,
      });
   
      try {
        await sql`
            UPDATE customers
            SET name = ${name}, email = ${email}, image_url = ${image_url}
            WHERE id = ${id}
          `;
      } catch (error) {
        return { message: 'Database Error: Failed to Update customers.' };
      }
      revalidatePath('/dashboard/customers');
      redirect('/dashboard/customers');
    }
    export async function deleteCustomer(id: string) {
      // throw new Error('Failed to Delete Customers');
      // Unreachable code block
      try {
        await sql`DELETE FROM customers WHERE id = ${id}`;
        revalidatePath('/dashboard/customers');
        return { message: 'Deleted customers' };
      } catch (error) {
        return { message: 'Database Error: Failed to Delete customers' };
      }
    }
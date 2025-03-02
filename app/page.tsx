import { redirect } from 'next/navigation';

// Redirect to the jobs manager page
export default function Page() {
  redirect('/dashboard');
}

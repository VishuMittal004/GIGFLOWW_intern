import RegisterPageClient from '@/components/auth/RegisterPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - GigFloww',
  description: 'Create your GigFloww account to streamline HR operations.',
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}

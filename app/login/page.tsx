import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import { kanit } from '@/app/ui/fonts';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-amber-950 p-3 md:h-36 justify-between">
                    <div className="w-32 text-white md:w-36">
                        <div className={`${kanit.className} flex flex-row items-center leading-none text-white`}>
                            <p className="text-[40px]">Atma Barbershop</p>
                        </div>
                    </div>
                    <div className="">
                        <Image
                            src="/logo_hero.png"
                            alt="Atma Barbershop Logo"
                            width={70}
                            height={0} />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
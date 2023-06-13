import { ReactNode } from "react"

import levvaCoinsLogo from "../../assets/Page header.svg"
import { AuthBackground, AuthContent, AuthWrapper } from './style';

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <AuthBackground>
        <AuthWrapper>
            <header>
                <img src={levvaCoinsLogo} alt="levva Coins"/>
            </header>

        <AuthContent>
            <div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            {children}
        </AuthContent>
        </AuthWrapper>
        </AuthBackground>
    );
}
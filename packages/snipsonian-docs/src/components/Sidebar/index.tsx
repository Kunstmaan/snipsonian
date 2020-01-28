import React from 'react';
import { Link } from 'gatsby';
import { INavigationItem } from '../../models/documentation';

interface IPublicProps {
    navigation: INavigationItem[];
    currentPathname: string;
}

function Sidebar({ navigation, currentPathname }: IPublicProps) {
    return (
        <nav>
            {navigation.map((item) => (
                <NavItem key={item.to} to={item.to} name={item.title} />
            ))}
        </nav>
    );

    function NavItem({ to, name }: { to: string; name: string }) {
        const isActive = currentPathname && currentPathname.startsWith(`/snipsonian-${name}/`);
        return (
            <div className="mb-1">
                <Link className={isActive ? 'text-primary' : ''} to={to} >{name}</Link>
            </div>
        );
    }
}

export default Sidebar;


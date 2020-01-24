import React from 'react';
import { Link } from 'gatsby';
import './sidebar.scss';
import { INavigationItem } from '../../models/documentation';

const CLASS_NAME = 'Sidebar';

interface IPublicProps {
    navigation: INavigationItem[];
}

function Sidebar({ navigation }: IPublicProps) {
    return (
        <aside className={CLASS_NAME}>
            <nav>
                {navigation.map((item) => (
                    <NavItem key={item.to} to={item.to} name={item.title} />
                ))}
            </nav>
        </aside>
    );
}

function NavItem({ to, name }: { to: string; name: string }) {
    const { pathname } = window.location;
    const isActive = pathname && pathname.startsWith(`/snipsonian-${name}/`);
    return (
        <div className={`${CLASS_NAME}__nav-item ${isActive && 'active'}`}>
            <Link to={to} >{name}</Link>
        </div>
    );
}

export default Sidebar;


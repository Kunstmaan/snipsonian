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
                {/* {Object.keys(docs).map((folderName) => {
                    const doc = docs[folderName];
                    const level = 1;
                    return (
                        <Folder key={folderName} title={folderName}>
                            <Children level={level} items={doc.children} />
                        </Folder>
                    );
                })} */}
            </nav>
        </aside>
    );
}

function NavItem({ to, name }: { to: string; name: string }) {
    return (
        <div className={`${CLASS_NAME}__nav-item`}>
            <Link to={to} >{name}</Link>
        </div>
    );
}

// function renderFolder({ item, level }: { item: IDocumentationItem; level: number }) {
//     const { name, slug, type, children } = item;

//     if (type === 'file') {
//         return (
//             <ItemLink key={slug} to={slug} name={name} />
//         );
//     }
//     if (type === 'folder') {
//         const childLevel = level + 1;
//         return (
//             <Folder key={slug} title={name}>
//                 <Children level={childLevel} items={children} />
//             </Folder>

//         );
//     }
//     return null;
// }

// function Folder({ children, title }: { children: React.ReactNode; title: string }) {
//     return (
//         <div className={`${CLASS_NAME}__folder`}>
//             <h4>{title}</h4>
//             {children}
//         </div>
//     );
// }

export default Sidebar;


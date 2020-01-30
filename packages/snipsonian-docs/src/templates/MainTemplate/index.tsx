import React from 'react';
import { Link } from 'gatsby';
import '../../assets/css/global.css';
import Sidebar from '../../components/Sidebar';
import { INavigationItem, IPackageVersionDocumentation } from '../../models/documentation';
import Documentation from '../../components/Documentation';
import TableOfContents from '../../components/TableOfContents';
import { capitalize } from '../../utils/format';
import VersionNavigation from '../../components/VersionNavigation';

interface IPublicProps {
    pageContext: {
        version: string;
        navigation: INavigationItem[];
        packageVersionDocumentation: IPackageVersionDocumentation;
        versionNavigation: INavigationItem[];
        home?: {
            title: string;
            text: string;
        };
    };
    location: {
        pathname: string;
    };
}

function MainTemplate({
    pageContext: { packageVersionDocumentation, navigation, home, versionNavigation, version },
    location,
}: IPublicProps) {
    console.log({ navigation, packageVersionDocumentation, versionNavigation, location, version });

    return (
        <div className="flex flex-auto flex-col">
            <header className="border-b border-dotted border-primaryDark">
                <Link to="/">
                    <h1 className="m-auto py-2 px-4 text-primaryDark">snipsonian</h1>
                </Link>
            </header>
            <main className="flex flex-auto">
                <aside
                    className="h-screen-min-header overflow-y-scroll flex-grow-0 flex-shrink-0 w-64 p-4 shadow-right"
                >
                    <Sidebar currentPathname={location.pathname} navigation={navigation} />
                </aside>
                <section className="h-screen-min-header overflow-y-scroll flex-auto py-4 pr-8 pl-16">
                    {home && (
                        <>
                            <h1>{home.title}</h1>
                            <p>{home.text}</p>
                        </>
                    )}
                    {packageVersionDocumentation && (
                        <>
                            <div className="mb-12">
                                <div className="flex items-center my-4">
                                    <h2 className="text-primary m-0">
                                        {capitalize(packageVersionDocumentation.title)}
                                    </h2>
                                    <VersionNavigation
                                        versionNavigation={versionNavigation}
                                        defaultValue={packageVersionDocumentation.slug}
                                    />
                                </div>
                                <p>{packageVersionDocumentation.description}</p>
                            </div>
                            <TableOfContents documentation={packageVersionDocumentation.documentation} />
                            <Documentation
                                version={version}
                                documentation={packageVersionDocumentation.documentation}
                            />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MainTemplate;

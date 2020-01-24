import React from 'react';
import { Link } from 'gatsby';
import '../../assets/scss/global.scss';
import './main-template.scss';
import Sidebar from '../../components/Sidebar';
import { INavigationItem, IPackageVersionDocumentation } from '../../models/documentation';
import Documentation from '../../components/Documentation';
import TableOfContents from '../../components/TableOfContents';
import { capitalize } from '../../utils/format';
import VersionNavigation from '../../components/VersionNavigation';

const CLASS_NAME = 'MainTemplate';

interface IPublicProps {
    pageContext: {
        navigation: INavigationItem[];
        packageVersionDocumentation: IPackageVersionDocumentation;
        versionNavigation: INavigationItem[];
        home?: {
            title: string;
            text: string;
        };
    };
}

function MainTemplate({
    pageContext: { packageVersionDocumentation, navigation, home, versionNavigation },
}: IPublicProps) {
    console.log({ navigation, packageVersionDocumentation, versionNavigation });

    return (
        <div className={CLASS_NAME}>
            <header>
                <Link to="/"><h1>snipsonian</h1></Link>
            </header>
            <main>
                <Sidebar navigation={navigation} />
                <section>
                    {home && (
                        <>
                            <h1>{home.title}</h1>
                            <p>{home.text}</p>
                        </>
                    )}
                    {packageVersionDocumentation && (
                        <>
                            <div className={`${CLASS_NAME}__package-info`}>
                                <div className={`${CLASS_NAME}__package-title`}>
                                    <h2>{capitalize(packageVersionDocumentation.title)}</h2>
                                    <VersionNavigation
                                        versionNavigation={versionNavigation}
                                        defaultValue={packageVersionDocumentation.slug}
                                    />
                                </div>
                                <p>{packageVersionDocumentation.description}</p>
                            </div>
                            <TableOfContents documentation={packageVersionDocumentation.documentation} />
                            <hr />
                            <Documentation documentation={packageVersionDocumentation.documentation} />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MainTemplate;

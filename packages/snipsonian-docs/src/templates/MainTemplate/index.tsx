import React from 'react';
import { Link, navigate } from 'gatsby';
import '../../assets/scss/global.scss';
import './main-template.scss';
import Sidebar from '../../components/Sidebar';
import { INavigationItem, IPackageDocumentation } from '../../models/documentation';
import Documentation from '../../components/Documentation';
import TableOfContents from '../../components/TableOfContents';
import { capitalize } from '../../utils/format';
import VersionNavigation from '../../components/VersionNavigation';

const CLASS_NAME = 'MainTemplate';

interface IPublicProps {
    pageContext: {
        navigation: INavigationItem[];
        packageDocumentation: IPackageDocumentation;
        versionNavigation: INavigationItem[];
        home?: {
            title: string;
            text: string;
        };
    };
}

function MainTemplate({ pageContext: { packageDocumentation, navigation, home, versionNavigation } }: IPublicProps) {
    console.log({ navigation, packageDocumentation, versionNavigation });

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
                    {packageDocumentation && (
                        <>
                            <div className={`${CLASS_NAME}__package-info`}>
                                <div className={`${CLASS_NAME}__package-title`}>
                                    <h2>{capitalize(packageDocumentation.title)}</h2>
                                    <VersionNavigation
                                        versionNavigation={versionNavigation}
                                        defaultValue={packageDocumentation.slug}
                                    />
                                </div>
                                <p>{packageDocumentation.description}</p>
                            </div>
                            <TableOfContents documentation={packageDocumentation.documentation} />
                            <hr />
                            <Documentation documentation={packageDocumentation.documentation} />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MainTemplate;

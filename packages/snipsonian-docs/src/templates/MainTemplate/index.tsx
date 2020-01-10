import React from 'react';
import { Link } from 'gatsby';
import '../../assets/scss/global.scss';
import './main-template.scss';
import Sidebar from '../../components/Sidebar';
import { INavigationItem, IDocumentationItem } from '../../models/documentation';
import Documentation from '../../components/Documentation';
import TableOfContents from '../../components/TableOfContents';

const CLASS_NAME = 'MainTemplate';

interface IPublicProps {
    pageContext: {
        navigation: INavigationItem[];
        documentation: IDocumentationItem;
        home?: {
            title: string;
            text: string;
        };
    };
}

function MainTemplate({ pageContext: { documentation, navigation, home } }: IPublicProps) {
    console.log({ navigation, documentation });

    return (
        <div className={CLASS_NAME}>
            <header>
                <Link to="/"><h1>Snipsonian</h1></Link>
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
                    {documentation && (
                        <>
                            <TableOfContents documentation={documentation} />
                            <hr />
                            <Documentation documentation={documentation} />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MainTemplate;

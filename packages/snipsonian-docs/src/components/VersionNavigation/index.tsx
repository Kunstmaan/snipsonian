import React, { ChangeEvent } from 'react';
import { navigate } from 'gatsby';
import { INavigationItem } from '../../models/documentation';

interface IPublicProps {
    defaultValue: string;
    versionNavigation: INavigationItem[];
}

export default function VersionNavigation({ versionNavigation, defaultValue }: IPublicProps) {
    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        navigate(e.target.value);
    }

    return (
        <select
            defaultValue={defaultValue}
            onChange={onChange}
        >
            {versionNavigation.map((item) => (
                <option
                    key={item.to}
                    value={item.to}
                >
                    {item.title}
                </option>
            ))}
        </select>
    );
}

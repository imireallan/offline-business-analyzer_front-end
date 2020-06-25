
import React from 'react';
import Header from './style'

function HeaderComponent() {
    return (
        <Header className="center">
            <Header.Wrapper className="container center">
                <Header.Logo>Offline Business Analyzer</Header.Logo>
            </Header.Wrapper>
        </Header>
    )
}

export default HeaderComponent;
import React from 'react';
import Login from "./Login";
import Register from "./Register";
import ContentWrapper from "../../common/ContentWrapper";

class Main extends ContentWrapper {
    render() {
        return <ContentWrapper>
            <Login/>
            <Register/>
        </ContentWrapper>
    }
}

export default Main;

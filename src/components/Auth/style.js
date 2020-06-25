import styled from 'styled-components';
import media from '../../components/globalStyles';

const Auth = styled.div`
	background: var(--color-orange);
	height: 100vh;
	margin-top: -3em;
	padding-top: 5em;
	${media('min-width').small`
        margin-top: -6em;
    `};
`;

Auth.Title = styled.h2`
	text-align: center;
	font-size: 1em;
`;

Auth.Wrapper = styled.div`
	background: var(--color-grey-lt);
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(241, 241, 235, 0.7);
	padding: 1.5em 1em;
	margin-top: 2em;
	${media('min-width').small`
        width:70%;
        max-width: 600px;
        padding:3em 2em;
    `};
`;

Auth.Form = styled.form`/* padding: 2em; */`;

export default Auth;
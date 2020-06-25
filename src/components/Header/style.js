import styled from 'styled-components';
import media from '../../components/globalStyles';

const Header = styled.header`
	color: var(--color-white);
	background-color: var(--color-orange);
	padding: var(--header-padding);
`;

Header.Wrapper = styled.div`
	justify-content: space-between;
	${media('max-width').small`
        flex-direction: column;
		align-items: center;
`};
${media('min-width').small`
        font-size: 3rem;
`};
`;
Header.Logo = styled.a`
	color: inherit;
	font-size:1.5rem;
	font-weight:bold;
	${media('max-width').small`margin-bottom: 1em;`};
	
`;

export default Header;
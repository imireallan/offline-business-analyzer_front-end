import styled, { css } from 'styled-components';

const sizes = {
	small: 600,
	medium: 600,
	large: 992,
	extraLarge: 1200
};

/*
 code snipped borroed from medium article
 https://medium.com/@samuelresua/easy-media-queries-in-styled-components-690b78f50053
*/

const media = (width) =>
	Object.keys(sizes).reduce((acc, label) => {
		acc[label] = (...args) => css`@media (${width}: ${sizes[label]}px) {${css(...args)};}`;
		return acc;
	}, {});

export const Button = styled.button`
	font-size: var(--input-font-size);
	padding: 1em 2em;
	color: ${(props) => (!props.large ? '#333' : 'var(--color-white)')};
	background: ${(props) => (props.large || props.business? 'var(--color-orange)' : 'transparent')};
	border: 0;
	outline: 0;
	text-transform: uppercase;
	font-weight: bold;
	border-radius: 3px;
	box-shadow: 0 0 4px 0 rgba(255, 153, 0, 0.7);
	transition: background 300ms linear;
	margin: ${(props) => (props.large ? '0' : '.5em 0')};
	max-width: ${(props) => (props.large ? '40em' : 'unset')};
	width: ${(props) => (props.large ? '100%' : 'unset')};
	&:hover,
	&:focus {
		color: ${(props) => (props.large || props.business? '#333' : 'var(--color-white)')};
		background: ${(props) => (props.large || props.business? 'transparent' : 'var(--color-orange)')};
		border: ${(props) => (props.large || props.business? '2px solid var(--color-orange)' : 'none')};
	}
`;

export const Input = styled.input`
	font-size: var(--input-font-size);
	border-radius: 5px;
	padding: 1em 2em;
	margin-bottom: .6em;
	background: transparent;
	max-width: 40em;
	width: 100%;
	line-height: 15px;
	outline: 0;
	border: 2px solid rgba(255, 153, 0, 0.7);
	&:focus {
		box-shadow: 0 1px 6px rgba(255, 153, 0, 0.7);
	}
`;

Input.Wrapper = styled.div`
	padding: .5em;
	width: 100%;
	${media('min-width').small`
		padding:1em;
    `};
`;

export default media;
import React, { Component } from 'react';

class CustomFileInput extends Component {
	constructor(props) {
		super(props);
		this.fileUpload = React.createRef();
		this.showFileUpload = this.showFileUpload.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	state = {
		file: undefined,
		imagePreviewUrl: undefined
	};

	showFileUpload() {
		if (this.fileUpload) {
			this.fileUpload.current.click();
		}
	}

	handleFileChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		if (file) {
			reader.onloadend = () => {
				this.setState({
					file,
					imagePreviewUrl: reader.result
				});
			};
			reader.readAsDataURL(file);
			this.props.setFieldValue(this.props.field.name, file);
		}
	}

	render() {
		const { errorMessage } = this.props;
		const { name } = this.props.field;

		return (
			<div>
				<input
					id={name}
					name={name}
					type="file"
					onChange={this.handleFileChange}
					ref={this.fileUpload}
				/>

				{errorMessage ? <span>{errorMessage}</span> : null}
			</div>
		);
	}
}

export default CustomFileInput;

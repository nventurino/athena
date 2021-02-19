import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

import { uploadS3 } from '../api/HttpClient';

export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        console.log('file to upload', files)
        //Saving files to state for further use and closing Modal.
        uploadS3(files[0]);
        this.setState({
            files: files,
            open: false
        });

    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['video/mp4']}
                    showPreviews={false}
                    maxFileSize={50000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}

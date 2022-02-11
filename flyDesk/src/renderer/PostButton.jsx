import { DOMAIN, HOST, PORT } from '../config'
import React, { useState, useRef, useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {threadsContext} from './ThreadListPage';
let templateStr;

const PostForm = () => {
    return (
        <Form id="postForm">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Please input thread title" />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label className="mt-3">Content</Form.Label>
                <p class="text-muted" style={{ 'fontSize': '10px' }}>(max size: 2MB)</p>
                <Editor
                    initialValue={templateStr}
                    onInit={(evt, editor) => editorRef.current = editor}
                    id={"tincyEditor"}
                    apiKey="ptr6mblaq31o1ghf2979iusmzxd367ds7xtdoukeb5r3wbuf"
                    init={{
                        language: 'en',
                        menubar: false,
                        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                        images_upload_handler: (blobInfo, success, failure) => {
                            let base64 = "data:image/png;base64," + blobInfo.base64();
                            //uploaded image -> <img src="success params" />
                            success(base64);
                        }
                    }} />

            </Form.Group>
        </Form>
    )
};
let editorRef;
const PostButton = (props) => {
    editorRef = useRef(null);

    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const post = async (body) => {
        const reqUrl = `${HOST}:${PORT}/api/threads`;
        const { loadThreads } = useContext(threadsContext);
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            if (res.ok) {
                closeModal();
                loadThreads();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handlePost = async () => {
        let content;  // = form.content.value;
        if (editorRef.current) {
            content = editorRef.current.getContent();
        } else {
            content = "";
        }
        const { username, token } = JSON.parse(await localStorage.getItem(DOMAIN));
        const form = document.forms.postForm;
        const title = form.title.value;
        const body = { username, token, title, content };
        post(body);
    }

    return (
        <div>
            <Button variant="outline-success" size='sm' onClick={() => showModal()}>New thread</Button>
            <div className='d-inline'>
                <button
                    className='btn btn-default'
                    disabled={location.pathname !== '/threads'}
                    onClick={() => showModal()} >
                    <span className='icon icon-plus' />
                </button>
            </div>
            <Modal show={show} width={50 + '%'} onHide={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>New thread</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostForm editorRef={editorRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                    <Button variant="primary" onClick={() => handlePost()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostButton;
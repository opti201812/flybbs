import { DOMAIN, HOST, PORT } from '../config'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react'
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { threadsContext } from './ThreadListPage';

let editorRef;

const ModifyForm = (props) => {
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const { tid } = useContext(threadsContext);
    const reqUrl = `${HOST}:${PORT}/api/threads/${tid}`;

    const loadThread = async () => {
        try {
            const res = await fetch(reqUrl, { method: 'GET' });
            const result = await res.json();
            if (res.ok) {
                setTitle(result.data.thread.title);
                setContent(result.data.thread.content);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        loadThread();
    }, []);

    return (
        <Form id="modifyForm">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Please input title" defaultValue={title} />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label className="mt-3">Content</Form.Label>
                <p className="text-muted" style={{ 'fontSize': '10px' }}>(max size: 2MB)</p>
                <Editor
                    initialValue={content.toString()}
//                    onInit={(evt, editor) => editorRef.current = editor}
                    onInit={(evt, editor) => editorRef.current = editor}
                    id={"tincyEditorModify"}
                    tinymceScriptSrc={`file://${__dirname}/public/tinymce/tinymce.min.js`}
                    apiKey="ptr6mblaq31o1ghf2979iusmzxd367ds7xtdoukeb5r3wbuf"
                    init={{
                        language: 'en',
                        menubar: false,
                        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern help emoticons autosave autoresize',
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
    );
};

const ModifyButton = (props) => {
    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);
    const location = useLocation();
    const { tid, threadModified, setThreadModified } = useContext(threadsContext);

    editorRef = useRef(null);

    const modify = async (body) => {
        const reqUrl = `${HOST}:${PORT}/api/threads/${tid}`;
        try {
            const res = await fetch(reqUrl, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const result = await res.json();
            if (res.ok) {
                setThreadModified(threadModified + 1);
                closeModal();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleModify = async () => {
        const { username, token } = JSON.parse(await localStorage.getItem(DOMAIN));
        const form = document.forms.modifyForm;
        const title = form.title.value;
        const content = editorRef.current ? editorRef.current.getContent() : "";
        const body = {
            username, token, title, content,
        };
        modify(body);
    }

    return (
        <div className='d-inline'>
            <button className="btn btn-default"
                disabled={location.pathname === '/threads'}
                onClick={() => showModal()} >
                <span className="icon icon-doc-text" />
            </button>
            <Modal show={show} onHide={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify thread</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModifyForm tid={tid} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                    <Button varitan="primary" onClick={() => handleModify()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModifyButton;

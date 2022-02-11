import { DOMAIN, HOST, PORT } from '../config'
import React, {useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';

const ReplyForm = (props) => {
    const { tid, loadThread } = props;
    const reqUrl = `${HOST}:${PORT}/api/comments/${tid}`;
    const editorRef = useRef(null);
    const reply = async (body) => {
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const result = await res.json();
            if (res.ok) {
                loadThread();
                // document.forms.replyForm.content.value = '';
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    const handleReply = async (e) => {
        e.preventDefault();
        const {username, token} = JSON.parse(localStorage.getItem(DOMAIN));
        const form = document.forms.replyForm;
        const content = editorRef.current ? editorRef.current.getContent() : "";
        const body = { username, token, content};
        reply(body);
    }

    return (
        <Form id="replyForm" className="p-3">
            <Form.Group controlId="content">
                <Form.Label>Reply</Form.Label>
                <p class="text-muted" style={{'fontSize':'10px'}}>(max size: 2MB)</p>
                <Editor
                    initialValue={""}
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
                            success(base64);}
                        }} />

            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => handleReply(e)}>Submit</Button>
        </Form>
    )
}

export default ReplyForm;